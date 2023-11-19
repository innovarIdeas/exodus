import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const book_variant = await prisma.book_variant.findUnique({ where: { id: id }, include: { book: true } });

    if (!book_variant) return NextResponse.json({ message: "Book Variant not found" }, { status: 404 });

    return NextResponse.json(book_variant);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
