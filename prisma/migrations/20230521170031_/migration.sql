/*
  Warnings:

  - Added the required column `idCategoria` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_id_fkey";

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "fee" TEXT NOT NULL DEFAULT '0';

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "idCategoria" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "categoria" FOREIGN KEY ("idCategoria") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
