import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function GET () {
  const session = await getServerSession(options);

  try {
    const books = await prisma.book.findMany({ where: { deleted_at: null }, select: { id: true, title: true, created_by: true, author: true, client_id: true, description: true, created_at: true, status: true } });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(books);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

