import { NextRequest, NextResponse } from "next/server";
import { bulkBookSchema } from "@/models/validation-schema";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const validation = bulkBookSchema.safeParse(await req.json());
  const session = await getServerSession(options);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.issues }, { status: 400 });
  }

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await Promise.all(
      validation.data.map(async (rowData, index) => {
        try {
          const { title, author, description, client_id } = rowData as { [key: string]: string };

          await prisma.book.create({
            data: {
              title,
              author,
              description,
              client_id,
              created_by: session.user.id
            }
          });
        } catch (error) {
          console.error(`Error creating book at index ${index}:`, error);
          throw error;
        }
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error occurred during bulk book creation:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

