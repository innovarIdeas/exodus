import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface IBookVariantProps {
  paper_type: string;
  hard_cover?: boolean;
  color_print?: boolean;
  binding?: string;
  no_of_books: number;
  number_of_pages: number;
  embossing?: boolean;
  lamination?: string;
  foiling?: boolean;
  inside_layout_type?: string;
}

export function calculateOrderCost (bookVariant: IBookVariantProps) {
  const {
    paper_type,
    hard_cover,
    color_print,
    binding,
    no_of_books,
    number_of_pages,
    embossing,
    lamination,
    foiling,
    inside_layout_type,
  } = bookVariant;

  let total = 0;
  let coverTotal = 50 * no_of_books;
  let innerTotal = 0;
  let deliveryFee = 0;
  let perfect_binding_cost = 0;
  let lamination_cost = 0;
  let service_cost = 0;
  let embossing_cost = 0;
  let foil_cost = 0;
  const wrapping_cost = 0;
  const trim_cost = 0;

  if (hard_cover) {
    coverTotal += no_of_books * 200;
  }

  if (color_print) {
    innerTotal += no_of_books * number_of_pages * 25;
  } else {
    innerTotal += no_of_books * number_of_pages * 10;
  }

  deliveryFee += no_of_books * 50;

  if (paper_type) {
    innerTotal += no_of_books * number_of_pages * 10;
  }

  if (paper_type === "cream") {
    innerTotal += no_of_books * number_of_pages * 10;
  } else {
    innerTotal += no_of_books * number_of_pages * 15;
  }

  if (inside_layout_type === "portrait") {
    innerTotal += no_of_books * number_of_pages * 10;
  } else {
    innerTotal += no_of_books * number_of_pages * 15;
  }

  if (lamination === "glossy") {
    lamination_cost += no_of_books * 50;
  } else if (lamination === "matte") {
    lamination_cost += no_of_books * 100;
  } else {
    lamination_cost += no_of_books * 150;
  }

  if (binding === "paper") {
    perfect_binding_cost += no_of_books * number_of_pages * 10;
  } else if (binding === "staple") {
    perfect_binding_cost += no_of_books * number_of_pages * 15;
  } else if (binding === "Hard Back") {
    perfect_binding_cost += no_of_books * number_of_pages * 20;
  }

  if (embossing) {
    embossing_cost += no_of_books * 100;
  }

  if (foiling) {
    foil_cost += no_of_books * 100;
  }

  service_cost += no_of_books * 100;

  total = coverTotal + innerTotal + deliveryFee;

  return {
    total,
    coverTotal,
    innerTotal,
    deliveryFee,
    perfect_binding_cost,
    lamination_cost,
    wrapping_cost,
    trim_cost,
    embossing_cost,
    foil_cost,
    service_cost,
  };
}
