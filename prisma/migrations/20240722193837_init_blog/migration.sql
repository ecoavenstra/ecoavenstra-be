-- CreateTable
CREATE TABLE "blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "user" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);
