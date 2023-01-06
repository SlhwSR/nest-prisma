-- CreateTable
CREATE TABLE `videocategory` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `video` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `poster` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `videoCategoryId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `videocategory` ADD CONSTRAINT `videocategory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `video` ADD CONSTRAINT `video_videoCategoryId_fkey` FOREIGN KEY (`videoCategoryId`) REFERENCES `videocategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
