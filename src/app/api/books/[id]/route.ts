import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { updateBookSchema } from "@/models/validation-schema";

export async function PATCH (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const validation = updateBookSchema.safeParse(await req.json());

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.issues }, { status: 400 });
  }

  const updatedBook = await prisma.book.update({
    where: { id },
    data: validation.data,
  });

  return NextResponse.json(updatedBook);
}

export async function DELETE (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const deletedBook = await prisma.book.update({
    where: { id },
    data: { deleted_at: new Date() },
  });

  return NextResponse.json(deletedBook);
}

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const book = await prisma.book.findUnique({ where: { id: id }, include: { created_by_user: true, client: true }  });

    if (!book) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(book);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

