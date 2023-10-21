import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateInvoiceNumber () {
  const latestInvoice = await prisma.invoice.findFirst({ where: { deleted_at: null }, orderBy: [{ invoice_no: "desc" }] });
  const lastInvoiceNumber = latestInvoice?.invoice_no || "INV-00000";
  const lastNumber = parseInt(lastInvoiceNumber.split("-")[1], 10);
  const newNumber = (lastNumber + 1).toString().padStart(5, "0");

  return `INV-${newNumber}`;
}
