/*
  Warnings:

  - Made the column `book_size` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number_of_pages` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity_of_color` on table `temp_books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `book_size` on table `temp_books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number_of_pages` on table `temp_books` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "book_variants" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "book_size" SET NOT NULL,
ALTER COLUMN "number_of_pages" SET NOT NULL;

-- AlterTable
ALTER TABLE "books" ADD COLUMN     "publisher" TEXT,
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "print_status" TEXT,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "temp_books" ALTER COLUMN "quantity_of_color" SET NOT NULL,
ALTER COLUMN "book_size" SET NOT NULL,
ALTER COLUMN "number_of_pages" SET NOT NULL;
