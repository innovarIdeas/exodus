import { NextRequest, NextResponse } from "next/server";
import { bookSchema } from "@/models/validation-schema";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function POST (req: NextRequest) {
  const session = await getServerSession(options);

  try {
    const validation = bookSchema.safeParse(await req.json());

    if (!validation.success) {
      const { issues } = (validation as import("zod").SafeParseError<unknown>).error;

      return NextResponse.json(
        { error: issues },
        { status: 400 }
      );
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const book = await prisma.book.create({
      data: {
        created_by_user: { connect: { id: session.user.id } },
        ...(() => {
          const { client_id, title, ...rest } = validation.data;

          return {
            title,
            ...rest,
            ...(client_id ? { client: { connect: { id: client_id } } } : {}),
          };
        })(),
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
