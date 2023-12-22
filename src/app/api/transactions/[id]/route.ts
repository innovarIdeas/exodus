import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { updateTransactionSchema } from "@/models/validation-schema";

export async function PATCH (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const validation = updateTransactionSchema.safeParse(await req.json());

  if (!validation.success) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  const updatedTransaction = await prisma.transactions.update({
    where: { id },
    data: validation.data,
  });

  return NextResponse.json(updatedTransaction);
}

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const user = await prisma.transactions.findUnique({ where: { id: id } });

    if (!user) return NextResponse.json({ message: "Invoice not found" }, { status: 404 });

    return NextResponse.json({
      message: "Transaction fetch successfully",
      data: user
    });
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
