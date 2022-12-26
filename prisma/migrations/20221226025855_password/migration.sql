/*
  Warnings:

  - You are about to drop the column `pasword` on the `user` table. All the data in the column will be lost.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `pasword`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
