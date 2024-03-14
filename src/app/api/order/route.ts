import {  CostOfCoverComponentPerBook, CostOfPerfectingBindingPerOrder, CostOfSpotLamnation, TotalCostOfBooks } from "@/lib/calculation-function";
import { IPageSize, IPaperType } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { orderSchema } from "@/models/validation-schema";
import prisma from "@/lib/prisma";

export async function GET () {
  try {
    const orders = await prisma.order.findMany({
      include: {
        client: true,
        book_variant: { include: { book: { include: { client: true } } } },
        book: true,
        created_by_user: true
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

    const order = await prisma.order.create({
      data: {
        book: { connect: { id: book_variant.book_id } },
        created_by_user: { connect: { id: session.user.id } },
        client: { connect: { id: book_variant.created_by } },
        book_variant: { connect: { id: book_variant.id } },
        delivery_address: book_variant.shipping_address,
        status: book_variant.status,
        cover_cost: await CostOfCoverComponentPerBook(book_variant.book_size),
        perfect_binding_cost: await CostOfPerfectingBindingPerOrder(book_variant.book_size, book_variant.number_of_pages, book_variant.no_of_books),
        cover_total: await CostOfCoverComponentPerBook(book_variant.book_size),
        lamination_cost: await CostOfSpotLamnation(book_variant.no_of_books),
        total: await TotalCostOfBooks(
          book_variant.no_of_books,
          book_variant.book_size as IPageSize,
          book_variant.number_of_pages,
          book_variant.paper_type as IPaperType,
          book_variant.quantity_of_Color ?? 2
        )
      }
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
