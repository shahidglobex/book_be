-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,

    UNIQUE INDEX `roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `admins_user_name_key`(`user_name`),
    UNIQUE INDEX `admins_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NULL,
    `token_expires` VARCHAR(191) NULL,
    `rfrsh_token` VARCHAR(191) NULL,
    `rfrsh_token_expires` VARCHAR(191) NULL,
    `ip` VARCHAR(191) NULL,
    `user_agent` VARCHAR(191) NULL,
    `user_id` INTEGER NULL,

    UNIQUE INDEX `session_token_key`(`token`),
    UNIQUE INDEX `session_rfrsh_token_key`(`rfrsh_token`),
    UNIQUE INDEX `session_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TeamA` VARCHAR(191) NOT NULL,
    `TeamB` VARCHAR(150) NOT NULL,
    `Book` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `admin_books_TeamA_key`(`TeamA`),
    UNIQUE INDEX `admin_books_TeamB_key`(`TeamB`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `Book` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_books` ADD CONSTRAINT `user_books_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
