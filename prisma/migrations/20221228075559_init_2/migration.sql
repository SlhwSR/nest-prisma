/*
  Warnings:

  - You are about to drop the column `categoryId` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `article` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `article_categoryId_fkey`;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `categoryId`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
