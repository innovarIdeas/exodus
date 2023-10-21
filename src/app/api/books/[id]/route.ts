import { NextRequest, NextResponse } from "next/server";
import { bookSchema } from "@/models/validation-schema";
import prisma from "@/lib/prisma";

export async function PATCH (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const validation = bookSchema.safeParse(await req.json());

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

