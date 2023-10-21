import { NextRequest, NextResponse } from "next/server";
import { generateInvoiceNumber } from "@/lib/uuid-helper";
import { invoiceSchema } from "@/models/validation-schema";
import prisma from "@/lib/prisma";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const invoice = await prisma.invoice.findUnique({ where: { id } });

    if (!invoice) {
      return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Invoice fetched successfully",
      data: invoice,
    });
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST (req: NextRequest) {
  try {
    const validation = invoiceSchema.safeParse(await req.json());

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues }, { status: 400 });
    }

    const invoice = await prisma.invoice.create({ data: { ...validation.data, invoice_no: await generateInvoiceNumber() } });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

