-- DropForeignKey
ALTER TABLE "wajib_pajak_orang_pribadi" DROP CONSTRAINT "wajib_pajak_orang_pribadi_nip_fkey";

-- AlterTable
ALTER TABLE "wajib_pajak_orang_pribadi" ALTER COLUMN "nip" DROP NOT NULL;
