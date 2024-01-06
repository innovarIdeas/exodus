import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { tempBookSchema } from "@/models/validation-schema";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const tempBook = await prisma.temp_Book.findUnique({ where: { id } });

    if (!tempBook) {
      return NextResponse.json({ message: "Temp_Book not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Temp_Book fetched successfully",
      data: tempBook,
    });
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST (req: NextRequest) {
  try {
    const validation = tempBookSchema.safeParse(await req.json());

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues }, { status: 400 });
    }

    const tempBook = await prisma.temp_Book.create({ data: { ...validation.data, book_name: validation.data.title } });

    return NextResponse.json(tempBook, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

