/*
  Warnings:

  - You are about to drop the column `addedAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,2)` to `Double`.

*/
-- DropIndex
DROP INDEX `Product_name_key` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `addedAt`,
    DROP COLUMN `isActive`,
    MODIFY `price` DOUBLE NOT NULL;
