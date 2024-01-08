/*
  Warnings:

  - You are about to drop the column `discount_id` on the `orders` table. All the data in the column will be lost.
  - Added the required column `book_id` to the `discounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_discount_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_book_id_fkey";

-- AlterTable
ALTER TABLE "coupons" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "discounts" ADD COLUMN     "book_id" TEXT NOT NULL,
ALTER COLUMN "expires_at" DROP NOT NULL,
ALTER COLUMN "expires_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "discount_id";

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "book_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE SET NULL ON UPDATE CASCADE;
