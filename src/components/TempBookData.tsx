import { ContextStore } from "@/context/ContextStore";
import  { useContext } from "react";

const TempBookData = () => {
  const storedReadyToPrintString = localStorage.getItem("Exodus_ReadyToPrint");
  const storedReadyToPrint = storedReadyToPrintString !== null ? JSON.parse(storedReadyToPrintString) : null;
  const storedWorkInProgressString = localStorage.getItem("Exodus_WorkInProgress");
  const storedWorkInProgress = storedWorkInProgressString !== null ? JSON.parse(storedWorkInProgressString) : null;
  const storedEmailString = localStorage.getItem("Exodus_Book_Email");
  const storedEmail = storedEmailString !== null ? JSON.parse(storedEmailString) : null;
  const storedNameString = localStorage.getItem("Exodus_Author_Name");
  const storedName = storedNameString !== null ? JSON.parse(storedNameString) : null;
  const storedTitleString = localStorage.getItem("Exodus_Book_Title");
  const storedTitle = storedTitleString !== null ? JSON.parse(storedTitleString) : null;
  const storedPhoneString = localStorage.getItem("Exodus_Book_Phone");
  const storedPhone = storedPhoneString !== null ? JSON.parse(storedPhoneString) : null;  const contextValues = useContext(ContextStore);

  if (!contextValues) {
    return null;
  }

  const { whitePaper, creamPaper, glossyPaper, numberOfWords, hardCover, bwPrint, bothPrint, colorPrint, newsPrint, binding, noOfBooks, potrait, bookSize, noOfPages, isbn, embossing, foiling, lamination, deliveryName, deliveryPhone, pickUp, shippingAddress, shippingInstruction, shippingState, projectType, wordCount } = contextValues;  const paperType = newsPrint ? "News Print" : creamPaper ? "Cream Paper" : glossyPaper ? "Glossy Paper" : "White Paper";

  return {
    email: storedEmail,
    status: "active",
    book_name: storedTitle,
    title: storedTitle,
    name: storedName,
    phone_number: storedPhone,
    paper_type: paperType,
    number_of_words: numberOfWords,
    hard_cover: hardCover,
    BW_print: bwPrint,
    both_print: bothPrint,
    color_print: colorPrint,
    cream_paper: creamPaper,
    glossy_paper: glossyPaper,
    news_print: newsPrint,
    binding: binding,
    white_paper: whitePaper,
    no_of_books: noOfBooks,
    portrait: potrait,
    book_size: bookSize,
    number_of_pages: noOfPages,
    ISBN: isbn,
    embossing: embossing,
    foiling: foiling,
    lamination: lamination,
    delivery_name: deliveryName,
    delivery_phone: deliveryPhone,
    pick_up: pickUp,
    shipping_address: shippingAddress,
    shipping_state: shippingState,
    shipping_instruction: shippingInstruction,
    project_type: projectType,
    ready_to_print: storedReadyToPrint,
    work_in_progress: storedWorkInProgress,
    word_count: wordCount,

  };
};

export default TempBookData;
