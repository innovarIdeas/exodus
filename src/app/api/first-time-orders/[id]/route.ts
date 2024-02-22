import { CostOfCoverComponentPerBook, CostOfPerfectingBindingPerOrder, CostOfSpotLamnation, TotalCostOfBooks } from "@/lib/calculation-function";
import { IPageSize, IPaperType } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import { ROLE_CLIENT, ROLE_STAFF } from "@/lib/rbac";
import { CLAIM_TYPE } from "@/models/constant";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function GET () {
  try {
    const staff = await prisma.user.findMany({
      where: { claims: { some: { role: { name: ROLE_STAFF } } } },
      select: { id: true, name: true, email: true, claims: { select: { role: true } }, created_at: true },
    });

    return NextResponse.json(staff);
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST (req: NextRequest, { params }: { params: { id: string } }) {
  try{
    const { id } = params;
    const role = await prisma.role.findUnique({ where: { name: ROLE_CLIENT } });
    const tempBook = await prisma.temp_Book.findUnique({ where: { id } });

    if(!tempBook) {
      return NextResponse.json({ error: "Temp_Book not found" }, { status: 404 });
    }

    let user;

    user = await prisma.user.findUnique({ where: { email: tempBook.email } });

    if(!user) {
      user = await prisma.user.create({
        data:
          {
            name: tempBook?.name,
            email: tempBook?.email,
            password: await bcrypt.hash(tempBook.email, 10),
            claims: { create: { role_id: role?.id, type: CLAIM_TYPE.ROLE } },
          }
      });
    }

    const book =  await prisma.book.create({
      data: {
        title: tempBook.name,
        created_by: user.id
      }
    });

    const paperType: IPaperType = tempBook.cream_paper ? "CREAM_PAPER_LARGE" :
      tempBook.white_paper ? "WHITE_PAPER_LARGE" : tempBook.news_print ? "NEWS_PRINT" : "ART_PAPER_135";

    const bookVariant = await prisma.book_variant.create({
      data: {
        book: { connect: { id: book.id } },
        variant_name: tempBook.email,
        created_by_user: { connect: { id: user.id } },
        tempbook_id: tempBook.id,
        paper_type: paperType,
        number_of_words: tempBook.number_of_words,
        status: tempBook.status,
        hard_cover: tempBook.hard_cover,
        BW_print: tempBook.BW_print,
        both_print: tempBook.color_print,
        color_print: tempBook.color_print,
        cream_paper: tempBook.cream_paper,
        glossy_paper: tempBook.glossy_paper,
        news_print: tempBook.news_print,
        binding: tempBook.binding,
        white_paper: tempBook.white_paper,
        no_of_books: tempBook.no_of_books ? tempBook.no_of_books : 1,
        portrait: tempBook.portrait,
        quantity_of_Color: tempBook.quantity_of_color,
        quantity_of_BW: tempBook.quantity_of_BW,
        book_size: tempBook.book_size,
        number_of_pages: tempBook.number_of_pages,
        inside_layout: tempBook.inside_layout,
        proof_reading: tempBook.proof_reading,
        cover_design: tempBook.cover_design,
        cover_design_type: tempBook.cover_design_type,
        editing: tempBook.editing,
        ISBN: tempBook.ISBN,
        online_sale: tempBook.online_sale,
        embossing: tempBook.embossing,
        foiling: tempBook.foiling,
        lamination: tempBook.lamination ? tempBook.lamination : "yes",
        delivery_name: tempBook.delivery_name,
        delivery_phone: tempBook.delivery_phone,
        pick_up: tempBook.pick_up,
        shipping_address: tempBook.shipping_address,
        shipping_state: tempBook.shipping_state,
        shipping_instruction: tempBook.shipping_instruction,
        project_type: tempBook.project_type,
        ready_to_print: tempBook.ready_to_print,
        published: tempBook.published,
        work_in_progress: tempBook.work_in_progress,
        word_count: tempBook.word_count,
        current_book_format: tempBook.current_book_format,
        inside_layout_type: tempBook.inside_layout_type,
        art_illustration: tempBook.art_illustration,
        art_illustration_type: tempBook.art_illustration_type,

      }
    });

    const order = await prisma.order.create({
      data: {
        book: { connect: { id: bookVariant.book_id } },
        created_by_user: { connect: { id: user.id } },
        client: { connect: { id: bookVariant.created_by } },
        book_variant: { connect: { id: bookVariant.id } },
        delivery_address: bookVariant.shipping_address,
        status: bookVariant.status,
        cover_cost: await CostOfCoverComponentPerBook(bookVariant.book_size),
        perfect_binding_cost: await CostOfPerfectingBindingPerOrder(
          bookVariant.book_size,
          bookVariant.number_of_pages,
          bookVariant.no_of_books),
        cover_total: await CostOfCoverComponentPerBook(bookVariant.book_size),
        lamination_cost: await CostOfSpotLamnation(bookVariant.no_of_books),
        total: await TotalCostOfBooks(
          bookVariant.no_of_books,
          bookVariant.book_size as IPageSize,
          bookVariant.number_of_pages,
          paperType,
          bookVariant.quantity_of_Color
        )
      }
    });

    return NextResponse.json({  user,  book,  bookVariant, order  }, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
