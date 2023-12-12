import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const year = new Date().getFullYear();

export async function generateInvoiceNumber () {
  const latestInvoice = await prisma.invoice.findFirst({ where: { deleted_at: null }, orderBy: [{ invoice_no: "desc" }] });
  const lastInvoiceNumber = latestInvoice?.invoice_no || "INV-00000";
  const lastNumber = parseInt(lastInvoiceNumber.split("-")[1], 10);
  const newNumber = (lastNumber + 1).toString().padStart(5, "0");

  return `INV-${newNumber}`;
}

export function generateVariantName (): string {
  const prefix: string = "VRNT_";

  const randomNumbers: string = Math.floor(Math.random() * 10000000000).toString()
    .padStart(10, "0");
  const code: string = `${prefix}${randomNumbers}`;

  return code;
}

export function generateCouponCode (): string {
  const prefix: string = "CPN_";

  const randomNumbers: string = Math.floor(Math.random() * 10000000000).toString()
    .padStart(5, "0");
  const code: string = `${prefix}${randomNumbers}${year}`;

  return code;
}
