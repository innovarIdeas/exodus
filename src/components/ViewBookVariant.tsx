import React from "react";

interface IBookVariantProps {
  variant_name: string;
  book_name: string;
  description: string;
  number_of_words: number;
  hard_cover: boolean;
  BW_print: boolean;
  both_print: boolean;
  color_print: boolean;
  cream_paper: boolean;
  glossy_paper: boolean;
  news_print: boolean;
  binding_type: string;
  white_paper: boolean;
  no_of_books: number;
  portrait: boolean;
  quantity_of_Color: number;
  quantity_of_BW: number;
  book_size: string;
  number_of_pages: number;
  inside_layout: boolean;
  proof_reading: boolean;
  cover_design: boolean;
  cover_design_type: string;
  editing: boolean;
  ISBN: boolean;
  online_sales: boolean;
  embossing: boolean;
  lamination: string;
  foiling: boolean;
  project_type: string;
  readyToPrint: boolean;
  published: boolean;
  workInProgress: boolean;
  inside_layout_type: string;
  art_illustration: boolean;
  art_illustration_type: string;
}

const BookVariant = ({ variant_name, book_name, description, number_of_words, no_of_books, quantity_of_Color, quantity_of_BW, hard_cover, BW_print, both_print, color_print, cream_paper, glossy_paper, news_print, binding_type, white_paper, portrait, proof_reading, book_size, number_of_pages, inside_layout, cover_design, cover_design_type, editing, ISBN, online_sales, embossing, lamination,  foiling, project_type, readyToPrint, published, workInProgress, inside_layout_type, art_illustration, art_illustration_type }: IBookVariantProps) => {
  return (
    <div className="flex flex-col items-center w-full">

      <div className="my-3 bg-slate-300 w-full px-3 py-3 rounded-lg">
        <h2>BOOK NAME: {book_name} </h2>
        <span>
                DESCRIPTION: {description}
        </span>

        <h3> BOOK VARIANT NAME: {variant_name} </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">

        <span> NUMBER OF WORDS: {number_of_words} </span>
        <span> NUMBER OF BOOKS: {no_of_books} </span>
        <span> QUANTITY OF COLOR: {quantity_of_Color} </span>
        <span> QUANTITY OF BW: {quantity_of_BW} </span>
        <span> HARD COVER: {hard_cover} </span>
        <span> BW PRINT: {BW_print} </span>
        <span> BOTH PRINT: {both_print} </span>
        <span> COLOR PRINT: {color_print} </span>
        <span> CREAM PAPER: {cream_paper} </span>
        <span> GLOSSY PAPER: {glossy_paper} </span>
        <span> NEWS PRINT: {news_print} </span>
        <span> BINDING TYPE: {binding_type} </span>
        <span> WHITE PAPER: {white_paper} </span>
        <span> PORTRAIT: {portrait} </span>
        <span> PROJECT TYPE: {project_type} </span>
        <span> PROOF READING: {proof_reading ? "TRUE" : "FALSE"} </span>
        <span> BOOK SIZE: {book_size} </span>
        <span> NUMBER OF PAGES: {number_of_pages} </span>
        <span> INSIDE LAYOUT: {inside_layout ? "TRUE" : "FALSE"} </span>
        <span> INSIDE LAYOUT TYPE: {inside_layout_type} </span>
        <span> COVER DESIGN: {cover_design ? "TRUE" : "FALSE"} </span>
        <span> COVER DESIGN TYPE: {cover_design_type} </span>
        <span> EDITING: {editing ? "TRUE" : "FALSE"} </span>
        <span> ISBN: {ISBN ? "TRUE" : "FALSE"} </span>
        <span> ONLINE SALES: {online_sales} </span>
        <span> EMBOSSING: {embossing ? "TRUE" : "FALSE"} </span>
        <span> LAMINATION: {lamination} </span>
        <span> FOILING: {foiling ? "TRUE" : "FALSE"} </span>
        <span> PROJECT TYPE: {project_type} </span>
        <span> READY TO PRINT: {readyToPrint ? "TRUE" : "FALSE"} </span>
        <span> PUBLISHED: {published} </span>
        <span> WORK IN PROGRESS: {workInProgress} </span>
        <span> INSIDE LAYOUT TYPE: {inside_layout_type} </span>
        <span> ART ILLUSTRATION: {art_illustration} </span>
        <span> ART ILLUSTRATION TYPE: {art_illustration_type} </span>

      </div>

    </div>
  );
};

export default BookVariant;

