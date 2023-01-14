/*
  Warnings:

  - You are about to drop the column `likeList` on the `comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `likeList`;

-- CreateTable
CREATE TABLE `likeList` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `commentId` INTEGER UNSIGNED NOT NULL,
    `userId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `likeList` ADD CONSTRAINT `likeList_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
