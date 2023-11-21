import { NextRequest, NextResponse } from "next/server";
import { UpdateUserSchema } from "@/models/validation-schema";
import prisma from "@/lib/prisma";

export async function PATCH (req: NextRequest, { params }: { params: { id: string } }) {
  const validation = UpdateUserSchema.safeParse(await req.json());

  if (!validation.success) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  const { id } = params;
  const updateData: { [key: string]: string | boolean } = {};

  for (const [field, value] of Object.entries(validation.data)) {
    updateData[field] = value;
  }

  const user = await prisma.user.update({
    where: { id },
    data: {
      name: validation.data?.name,
      email: validation.data?.email,
    }
  });

  return NextResponse.json(user, { status: 200 });
}

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: id }, include: {
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

