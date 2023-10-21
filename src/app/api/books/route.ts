import { NextRequest, NextResponse } from "next/server";
import { bookSchema } from "@/models/validation-schema";
import prisma from "@/lib/prisma";

export async function GET () {
  try {
    const books = await prisma.book.findMany();

    return NextResponse.json(books);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST (req: NextRequest) {
  try {
    const validation = bookSchema.safeParse(await req.json());

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues }, { status: 400 });
    }

    const book = await prisma.book.create({ data: { ...validation.data } });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

