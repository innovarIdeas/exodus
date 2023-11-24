-- AlterTable
ALTER TABLE "books" ADD COLUMN     "author" TEXT,
ADD COLUMN     "client_id" TEXT;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
