/*
  Warnings:

  - You are about to drop the column `readyToPrint` on the `book_variants` table. All the data in the column will be lost.
  - You are about to drop the column `spot_lamination` on the `book_variants` table. All the data in the column will be lost.
  - You are about to drop the column `workInProgress` on the `book_variants` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `glossy_lamination` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `hard_binding` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `paper_binding` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `spot_lamination` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `staple_binding` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `book_name` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `glossy_lamination` on the `temp_books` table. All the data in the column will be lost.
  - You are about to drop the column `hard_binding` on the `temp_books` table. All the data in the column will be lost.
  - You are about to drop the column `paper_binding` on the `temp_books` table. All the data in the column will be lost.
  - You are about to drop the column `spot_lamination` on the `temp_books` table. All the data in the column will be lost.
  - You are about to drop the column `staple_binding` on the `temp_books` table. All the data in the column will be lost.
  - Added the required column `created_by` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lamination` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Made the column `no_of_books` on table `invoices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number_of_pages` on table `invoices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `book_variant_id` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `lamination` to the `temp_books` table without a default value. This is not possible if the table is not empty.
  - Made the column `paper_type` on table `temp_books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `no_of_books` on table `temp_books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number_of_pages` on table `temp_books` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_book_variant_id_fkey";

-- AlterTable
ALTER TABLE "book_variants" DROP COLUMN "readyToPrint",
DROP COLUMN "spot_lamination",
DROP COLUMN "workInProgress",
ADD COLUMN     "ready_to_print" BOOLEAN DEFAULT false,
ADD COLUMN     "work_in_progress" BOOLEAN DEFAULT false,
ALTER COLUMN "number_of_words" DROP NOT NULL,
ALTER COLUMN "hard_cover" DROP NOT NULL,
ALTER COLUMN "color_print" DROP NOT NULL,
ALTER COLUMN "number_of_pages" DROP NOT NULL,
ALTER COLUMN "inside_layout" DROP NOT NULL,
ALTER COLUMN "embossing" DROP NOT NULL,
ALTER COLUMN "foiling" DROP NOT NULL,
ALTER COLUMN "delivery_phone" SET DATA TYPE TEXT,
ALTER COLUMN "inside_layout_type" DROP NOT NULL,
ALTER COLUMN "binding" DROP NOT NULL;

-- AlterTable
ALTER TABLE "books" DROP COLUMN "createdBy",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "glossy_lamination",
DROP COLUMN "hard_binding",
DROP COLUMN "paper_binding",
DROP COLUMN "spot_lamination",
DROP COLUMN "staple_binding",
ADD COLUMN     "binding" TEXT,
ADD COLUMN     "lamination" TEXT NOT NULL,
ALTER COLUMN "no_of_books" SET NOT NULL,
ALTER COLUMN "number_of_pages" SET NOT NULL,
ALTER COLUMN "delivery_phone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "book_name",
ALTER COLUMN "book_variant_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "temp_books" DROP COLUMN "glossy_lamination",
DROP COLUMN "hard_binding",
DROP COLUMN "paper_binding",
DROP COLUMN "spot_lamination",
DROP COLUMN "staple_binding",
ADD COLUMN     "binding" TEXT,
ADD COLUMN     "bindong" TEXT,
ADD COLUMN     "lamination" TEXT NOT NULL,
ALTER COLUMN "paper_type" SET NOT NULL,
ALTER COLUMN "no_of_books" SET NOT NULL,
ALTER COLUMN "number_of_pages" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_book_variant_id_fkey" FOREIGN KEY ("book_variant_id") REFERENCES "book_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
