import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function GET () {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = session.user;

  try {
    const order = await prisma.order.findMany({
      where: { book: { client_id: id } }, include: {
        client: true,
        book_variant: { include: { book: true } }
      }
    });

    if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

