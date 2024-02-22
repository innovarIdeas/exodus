import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const book = await prisma.transactions.findMany({ where: { user_id: id } });

    if (!book) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(book);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
