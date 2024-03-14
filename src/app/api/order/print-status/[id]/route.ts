import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { updateOrderSchema } from "@/models/validation-schema";

export async function PATCH (req: NextRequest, { params }: { params: { id: string } }) {
  const validation = updateOrderSchema.safeParse(await req.json());

  if (!validation.success) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  const { id } = params;

  const user = await prisma.order.update({
    where: { id },
    data: { print_status: validation.data.print_status }
  });

  return NextResponse.json(user, { status: 200 });
}
