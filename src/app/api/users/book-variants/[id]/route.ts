import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
