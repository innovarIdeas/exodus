import { NextRequest, NextResponse } from "next/server";
import { bulkBookVariantSchema } from "@/models/validation-schema";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const validation = bulkBookVariantSchema.safeParse(await req.json());
  const session = await getServerSession(options);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.issues }, { status: 400 });
  }

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await Promise.all(
      validation.data.map(async (rowData, index) => {
        try {
          const { book_id, variant_name, paper_type, number_of_pages, no_of_books, lamination, book_size, number_of_words, hard_cover, BW_print, both_print, color_print, cream_paper, glossy_paper, news_print, binding, white_paper, portrait, quantity_of_BW, quantity_of_Color, inside_layout, inside_layout_type, proof_reading, cover_design, cover_design_type, editing, ISBN, online_sale, embossing, foiling, delivery_name, delivery_phone, pick_up, shipping_address, shipping_instruction, shipping_state, project_type, ready_to_print, published, work_in_progress, word_count, current_book_format, art_illustration, art_illustration_type } = rowData;
          const book = await prisma.book.findUnique({ where: { id: book_id } });

          if (!book) {
            return NextResponse.json({ error: "book not found" }, { status: 401 });
          }

          await prisma.book_variant.create({
            data: {
              variant_name: variant_name,
              book_id: book.id,
              created_by: session.user.id,
              paper_type: paper_type ?? "",
              number_of_pages: number_of_pages ?? "",
              no_of_books: no_of_books ?? "",
              lamination: lamination ?? "",
              book_size,
              number_of_words, hard_cover, BW_print, both_print, color_print, cream_paper, glossy_paper, news_print, binding, white_paper, portrait, quantity_of_BW, quantity_of_Color, inside_layout, inside_layout_type, proof_reading, cover_design, cover_design_type, editing, ISBN, online_sale, embossing, foiling, delivery_name, delivery_phone, pick_up, shipping_address, shipping_instruction, shipping_state, project_type, ready_to_print, published, work_in_progress, word_count, current_book_format, art_illustration, art_illustration_type
            }
          });
        } catch (error) {
          console.error(`Error creating book at index ${index}:`, error);
          throw error;
        }
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error occurred during bulk book creation:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

