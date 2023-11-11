/*
  Warnings:

  - You are about to drop the column `glossy_lamination` on the `book_variants` table. All the data in the column will be lost.
  - You are about to drop the column `hard_binding` on the `book_variants` table. All the data in the column will be lost.
  - You are about to drop the column `paper_binding` on the `book_variants` table. All the data in the column will be lost.
  - You are about to drop the column `staple_binding` on the `book_variants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "book_variants" DROP COLUMN "glossy_lamination",
DROP COLUMN "hard_binding",
DROP COLUMN "paper_binding",
DROP COLUMN "staple_binding",
ADD COLUMN     "binding" TEXT,
ADD COLUMN     "lamination" TEXT;
