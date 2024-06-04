/*
  Warnings:

  - Added the required column `TeamA` to the `user_books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TeamB` to the `user_books` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `admin_books_TeamA_key` ON `admin_books`;

-- DropIndex
DROP INDEX `admin_books_TeamB_key` ON `admin_books`;

-- AlterTable
ALTER TABLE `admin_books` ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `winner` VARCHAR(191) NULL,
    MODIFY `TeamB` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_books` ADD COLUMN `TeamA` VARCHAR(191) NOT NULL,
    ADD COLUMN `TeamB` VARCHAR(191) NOT NULL;
