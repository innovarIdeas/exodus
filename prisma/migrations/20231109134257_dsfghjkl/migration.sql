-- AlterTable
ALTER TABLE "book_variants" ALTER COLUMN "tempbook_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "book_variants" ADD CONSTRAINT "book_variants_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
