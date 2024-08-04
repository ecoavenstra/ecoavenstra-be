-- AlterTable
ALTER TABLE "article" ADD COLUMN     "coverImage" TEXT;

-- AlterTable
ALTER TABLE "job" ALTER COLUMN "contactNumber" SET DATA TYPE BIGINT;
