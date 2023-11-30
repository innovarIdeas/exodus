/*
  Warnings:

  - You are about to drop the column `book_name` on the `orders` table. All the data in the column will be lost.
  - Made the column `book_id` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `book_variant_id` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_book_variant_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "book_name",
ALTER COLUMN "book_id" SET NOT NULL,
ALTER COLUMN "book_variant_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_book_variant_id_fkey" FOREIGN KEY ("book_variant_id") REFERENCES "book_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
