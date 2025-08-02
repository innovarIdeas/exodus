import { NextRequest, NextResponse } from "next/server";
import { SafeParseError } from "zod";
import { bookVariantSchema } from "@/models/validation-schema";
import { generateVariantName } from "@/lib/uuid-helper";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function GET () {
  const session = await getServerSession(options);

  try {
    const books = await prisma.book_variant.findMany({
      where: { deleted_at: null },
      include: { book: { include: { client: true } } }
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(books);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST (req: NextRequest) {
  const session = await getServerSession(options);

  try {
    const validation = bookVariantSchema.safeParse(await req.json());

    if (!validation.success) {
      const { error } = validation as SafeParseError<typeof bookVariantSchema>;

      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { book_id, no_of_books, book_size, number_of_pages, lamination, ...rest } = validation.data;

    // Runtime checks for all required fields
    if (!book_id || typeof book_id !== "string") {
      return NextResponse.json({ error: "Missing required field: book_id" }, { status: 400 });
    }

    if (typeof no_of_books !== "number") {
      return NextResponse.json({ error: "Missing required field: no_of_books" }, { status: 400 });
    }

    if (!book_size || typeof book_size !== "string") {
      return NextResponse.json({ error: "Missing required field: book_size" }, { status: 400 });
    }

    if (typeof number_of_pages !== "number") {
      return NextResponse.json({ error: "Missing required field: number_of_pages" }, { status: 400 });
    }

    if (!lamination || typeof lamination !== "string") {
      return NextResponse.json({ error: "Missing required field: lamination" }, { status: 400 });
    }

    const book = await prisma.book_variant.create({
      data: {
        variant_name: generateVariantName(),
        ...rest,
        no_of_books,
        book_size,
        number_of_pages,
        lamination,
        paper_type: validation.data.paper_type ?? "WHITE_PAPER_LARGE",
        ...(book_id && { book: { connect: { id: book_id } } }),
        created_by_user: { connect: { id: session.user.id } },
      }
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

