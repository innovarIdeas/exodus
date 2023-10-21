import { NextRequest, NextResponse } from "next/server";
import { invoiceSchema } from "@/models/validation-schema";
import prisma from "@/lib/prisma";

export async function PATCH (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const validation = invoiceSchema.safeParse(await req.json());

  if (!validation.success) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  const updatedInvoice = await prisma.invoice.update({
    where: { id },
    data: validation.data,
  });

  return NextResponse.json(updatedInvoice);
}

export async function DELETE (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const deletedInvoice = await prisma.invoice.update({
    where: { id },
    data: { deleted_at: new Date() },
  });

  return NextResponse.json(deletedInvoice);
}

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const user = await prisma.invoice.findUnique({ where: { id: id } });

    if (!user) return NextResponse.json({ message: "Invoice not found" }, { status: 404 });

    return NextResponse.json({
      message: "Invoice fetch successfully",
      data: user
    });
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
