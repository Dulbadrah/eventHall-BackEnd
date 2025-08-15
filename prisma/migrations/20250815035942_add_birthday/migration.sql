/*
  Warnings:

  - You are about to drop the column `adminId` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `eventTypes` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Venue` table. All the data in the column will be lost.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Venue" DROP CONSTRAINT "Venue_adminId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Venue" DROP COLUMN "adminId",
DROP COLUMN "eventTypes",
DROP COLUMN "images",
DROP COLUMN "tags",
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "public"."VenueAdmin" (
    "venueId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "VenueAdmin_pkey" PRIMARY KEY ("venueId","adminId")
);

-- CreateTable
CREATE TABLE "public"."VenueImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "venueId" INTEGER NOT NULL,

    CONSTRAINT "VenueImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VenueTag" (
    "venueId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "VenueTag_pkey" PRIMARY KEY ("venueId","tagId")
);

-- AddForeignKey
ALTER TABLE "public"."VenueAdmin" ADD CONSTRAINT "VenueAdmin_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "public"."Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VenueAdmin" ADD CONSTRAINT "VenueAdmin_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VenueImage" ADD CONSTRAINT "VenueImage_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "public"."Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VenueTag" ADD CONSTRAINT "VenueTag_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "public"."Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VenueTag" ADD CONSTRAINT "VenueTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
