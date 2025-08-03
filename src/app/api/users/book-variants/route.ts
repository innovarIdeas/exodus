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
      // TypeScript: validation is SafeParseError here
      const { issues } = (validation as import("zod").SafeParseError<unknown>).error;

      return NextResponse.json(
        { error: issues },
        { status: 400 }
      );
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Remove book_id from spread and use nested connect for book
    const { book_id, ...rest } = validation.data;

    const book = await prisma.book_variant.create({
      data: {
        variant_name: generateVariantName(),
        ...rest,
        no_of_books: validation.data.no_of_books,
        number_of_pages: validation.data.number_of_pages,
        book_size: validation.data.book_size,
        lamination: validation.data.lamination,
        created_by_user: { connect: { id: session.user.id } },
        paper_type: validation.data.paper_type ?? "WHITE_PAPER_LARGE",
        book: { connect: { id: book_id } }
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
