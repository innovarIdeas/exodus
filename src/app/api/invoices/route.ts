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
      const { error } = validation as import("zod").SafeParseError<typeof invoiceSchema>;

      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    const { email, title, name, status, no_of_books, number_of_pages, lamination, ...rest } = validation.data;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Missing required field: email" }, { status: 400 });
    }

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Missing required field: title" }, { status: 400 });
    }

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Missing required field: name" }, { status: 400 });
    }

    if (!status || typeof status !== "string") {
      return NextResponse.json({ error: "Missing required field: status" }, { status: 400 });
    }

    if (typeof no_of_books !== "number") {
      return NextResponse.json({ error: "Missing required field: no_of_books" }, { status: 400 });
    }

    if (typeof number_of_pages !== "number") {
      return NextResponse.json({ error: "Missing required field: number_of_pages" }, { status: 400 });
    }

    if (!lamination || typeof lamination !== "string") {
      return NextResponse.json({ error: "Missing required field: lamination" }, { status: 400 });
    }

    const invoice = await prisma.invoice.create({
      data: {
        ...rest,
        email,
        title,
        name,
        status,
        no_of_books,
        number_of_pages,
        lamination,
        invoice_no: await generateInvoiceNumber(),
      }
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

