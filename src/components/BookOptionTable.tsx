import { IBookData } from "@/models/models";
import React from "react";

interface BookOptionProps {
  bookData?: IBookData | null;
}

const BookOptionTable: React.FC<BookOptionProps> = ({ bookData }) => {
  const readyToPrint = localStorage.getItem("Exodus_ReadyToPrint");

  if(readyToPrint === "true") {
    return(
      <table className=" w-full h-full  ">
        <thead>
          <tr className="bg-main text-white  ">
            <th className="text-left pl-2">Order Type</th>
            <th className="text-right pr-2">{bookData?.project_type} printing</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[#e6e6f8]" >
            <td className="pl-2">Number of Copies</td>
            <td className="text-right pr-2">{bookData?.no_of_books} </td>
          </tr>
          <tr className="bg-[#f0f0f9]">
            <td className="pl-2">Paper Type</td>
            <td className="text-right pr-2">{bookData?.paper_type}</td>
          </tr>
          <tr className="bg-[#e6e6f8]">
            <td className="pl-2">Binding</td>
            <td className="text-right pr-2">{bookData?.binding}</td>
          </tr><tr className="bg-[#f0f0f9]">
            <td className="pl-2">Print Type</td>
            <td className="text-right pr-2">{bookData?.BW_print ? "Black & White" : bookData?.color_print ? "Colored Print" : "Both Print" }</td >
          </tr>

          <tr className="bg-[#e6e6f8]" >
            <td className="pl-2">Number of Pages</td>
            <td className="text-right pr-2">{bookData?.number_of_pages} </td>
          </tr>
          <tr className="bg-[#f0f0f9]">
            <td className="pl-2">Book Size</td>
            <td className="text-right pr-2">{bookData?.book_size} </td>
          </tr>
          <tr className="bg-[#e6e6f8]">
            <td className="pl-2">Layout Style</td>
            <td className="text-right pr-2">{bookData?.portrait ? "Portrait" : "Landscape"}</td>
          </tr>
          <tr className="bg-[#f0f0f9]">
            <td className="pl-2">ISBN</td>
            <td className="text-right pr-2">{bookData?.ISBN ? "Yes" : "No"}</td>
          </tr>
          <tr className="bg-[#e6e6f8]">
            <td className="pl-2">Lamination</td>
            <td className="text-right pr-2">{bookData?.lamination}</td>
          </tr>
          <tr className="bg-[#f0f0f9]">
            <td className="pl-2">Embossing</td>
            <td className="text-right pr-2"> {bookData?.embossing ? "Yes" : "No"} </td>
          </tr>
          <tr className="bg-[#e6e6f8]">
            <td className="pl-2">Foiling</td>
            <td className="text-right pr-2">{bookData?.foiling ? "Yes" : "No"}</td>
          </tr>
          <tr className="bg-[#f0f0f9]">
            <td className="pl-2">Spot Lamination</td>
            <td className="text-right pr-2"> No </td>
          </tr>
        </tbody>
      </table>
    );}else {
    return(
      <table className=" w-full h-full  ">
        <thead>
          <tr className="bg-blue text-white  ">
            <th className="text-left pl-2">Order Type</th>
            <th className="text-right pr-2">{bookData?.project_type} printing</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[#e6e6f8]" >
            <td className="pl-2">Number of Words</td>
            <td className="text-right pr-2">{bookData?.word_count} </td>
          </tr>
          <tr className="bg-[#f0f0f9]">
            <td className="pl-2">Current Book Format</td>
            <td className="text-right pr-2">{bookData?.current_book_format}</td>
          </tr>
          <tr className="bg-[#f0f0f9]">
            <td className="pl-2">Book Size</td>
            <td className="text-right pr-2">{bookData?.book_size} </td>
          </tr>
          <tr className="bg-[#e6e6f8]">
            <td className="pl-2">Layout Style</td>
            <td className="text-right pr-2">{bookData?.portrait ? "Portrait" : "Landscape"}</td>
          </tr>
          <tr className="bg-[#f0f0f9]">
            <td className="pl-2">ISBN</td>
            <td className="text-right pr-2">{bookData?.ISBN ? "Yes" : "No"}</td>
          </tr>

          <tr className="bg-[#f0f0f9]">
            <td className="pl-2">Inside Layout</td>
            <td className="text-right pr-2"> {bookData?.inside_layout ? "Yes" : "No"} </td>
          </tr>
          <tr className="bg-[#f0f0f9]">
            <td className="pl-2">Inside Layout Type</td>
            <td className="text-right pr-2">{bookData?.inside_layout_type} </td>
          </tr>

          <tr className="bg-[#e6e6f8]">
            <td className="pl-2">Cover Design</td>
            <td className="text-right pr-2"> {bookData?.cover_design ? "Yes" : "No" } </td>
          </tr>
          <tr className="bg-[#f0f0f9]">
            <td className="pl-2">Cover Design Type</td>
            <td className="text-right pr-2">{bookData?.cover_design_type} </td>
          </tr>
          <tr className="bg-[#f0f0f9]">
            <td className="pl-2">Editing</td>
            <td className="text-right pr-2"> {bookData?.editing ? "Yes" : "No" } </td>
          </tr>

          <tr className="bg-[#e6e6f8]">
            <td className="pl-2">Proof Reading</td>
            <td className="text-right pr-2"> {bookData?.proof_reading ? "Yes" : "No" } </td>
          </tr>

        </tbody>
      </table>);
  }
};

export default BookOptionTable;
