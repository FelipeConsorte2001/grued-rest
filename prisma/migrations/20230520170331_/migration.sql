/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "type_products" AS ENUM ('Computing', 'Automotive', 'Furniture');

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_id_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Products";

-- DropEnum
DROP TYPE "Type_products";

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" "type_products" NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_id_key" ON "category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id_fkey" FOREIGN KEY ("id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
