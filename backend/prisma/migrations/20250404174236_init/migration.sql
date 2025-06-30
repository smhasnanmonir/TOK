/*
  Warnings:

  - Added the required column `description` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key_ingredient` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_type` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skin_concern` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skin_type` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductDetails" ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "how_to_use" TEXT[],
ADD COLUMN     "key_ingredient" TEXT NOT NULL,
ADD COLUMN     "product_type" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER,
ADD COLUMN     "skin_concern" TEXT NOT NULL,
ADD COLUMN     "skin_type" TEXT NOT NULL;
