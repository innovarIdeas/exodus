import { NextRequest, NextResponse } from "next/server";
import { calculateOrderCost } from "@/lib/utils";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { orderSchema } from "@/models/validation-schema";
import prisma from "@/lib/prisma";

export async function GET () {
  try {
    const orders = await prisma.order.findMany({
      include: {
        client: true,
        book_variant: { include: { book: { include: { client: true } } } }
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST (req: NextRequest) {
  const session = await getServerSession(options);

  try {
    const validation = orderSchema.safeParse(await req.json());

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues }, { status: 400 });
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const book_variant = await prisma.book_variant.findUnique({ where: { id: validation.data.book_variant_id }, include: { book: true, order: true, created_by_user: true } });

    if (!book_variant) {
      return NextResponse.json({ error: "Book variant not found" }, { status: 404 });
    }

    const data = calculateOrderCost(book_variant);

    if (data == null) {
      return NextResponse.json({ error: "Error calculating order cost" }, { status: 500 });
    }

    const order = await prisma.order.create({ data: { ...data, ...validation.data, created_by: session?.user.id ?? "" } });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
