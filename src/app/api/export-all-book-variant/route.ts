import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function GET () {
  const session = await getServerSession(options);

  try {
    const bookVariants = await prisma.book_variant.findMany({ where: { deleted_at: null } });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(bookVariants);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

