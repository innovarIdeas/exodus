import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const book = await prisma.book.findMany({ where: { created_by: id } });

    if (!book) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(book);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}