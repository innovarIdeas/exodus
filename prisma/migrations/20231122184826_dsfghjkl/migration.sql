/*
  Warnings:

  - Made the column `paper_type` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number_of_words` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hard_cover` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color_print` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `no_of_books` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number_of_pages` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `inside_layout` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `embossing` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `foiling` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `binding` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lamination` on table `book_variants` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "book_variants" ALTER COLUMN "paper_type" SET NOT NULL,
ALTER COLUMN "number_of_words" SET NOT NULL,
ALTER COLUMN "hard_cover" SET NOT NULL,
ALTER COLUMN "color_print" SET NOT NULL,
ALTER COLUMN "no_of_books" SET NOT NULL,
ALTER COLUMN "number_of_pages" SET NOT NULL,
ALTER COLUMN "inside_layout" SET NOT NULL,
ALTER COLUMN "embossing" SET NOT NULL,
ALTER COLUMN "foiling" SET NOT NULL,
ALTER COLUMN "binding" SET NOT NULL,
ALTER COLUMN "lamination" SET NOT NULL;
