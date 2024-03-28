import { NextRequest, NextResponse } from "next/server";
import { bookVariantSchema } from "@/models/validation-schema";
import { generateVariantName } from "@/lib/uuid-helper";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function POST (req: NextRequest) {
  const session = await getServerSession(options);

  try {
    const validation = bookVariantSchema.safeParse(await req.json());

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues },
        { status: 400 }
      );
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const book = await prisma.book_variant.create({
      data: {
        variant_name: generateVariantName(),
        ...validation.data,
        created_by: session.user.id,
        paper_type: validation.data.paper_type ?? "WHITE_PAPER_LARGE"
      }
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
