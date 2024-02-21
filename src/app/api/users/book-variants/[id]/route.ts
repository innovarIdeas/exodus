import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const bookVariant = await prisma.book_variant.findMany({ where: { created_by: id } });

    if (!bookVariant) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(bookVariant);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}