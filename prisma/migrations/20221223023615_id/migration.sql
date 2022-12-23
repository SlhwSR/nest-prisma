/*
  Warnings:

  - The primary key for the `article` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `article` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `article` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
