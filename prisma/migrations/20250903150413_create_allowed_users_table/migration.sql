-- CreateEnum
CREATE TYPE "public"."GlobalRole" AS ENUM ('ADMIN', 'STUDENT');

-- CreateTable
CREATE TABLE "public"."allowed_users" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "global_role" "public"."GlobalRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "allowed_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "allowed_users_email_key" ON "public"."allowed_users"("email");
