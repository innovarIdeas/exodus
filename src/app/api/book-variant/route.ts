import { NextRequest, NextResponse } from "next/server";
import { bookVariantSchema } from "@/models/validation-schema";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function GET () {
  const session = await getServerSession(options);

  try {
    const books = await prisma.book_variant.findMany({ where: { deleted_at: null }, include: { book: { include: { client: true } } } });

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
      return NextResponse.json({ error: validation.error.issues }, { status: 400 });
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const book = await prisma.book_variant.create({ data: { ...validation.data, created_by: session.user.id } });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

