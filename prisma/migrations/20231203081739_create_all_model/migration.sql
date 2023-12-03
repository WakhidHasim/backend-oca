-- CreateTable
CREATE TABLE "negara" (
    "kode_negara" VARCHAR(5) NOT NULL,
    "nama_negara" VARCHAR(100) NOT NULL,

    CONSTRAINT "negara_pkey" PRIMARY KEY ("kode_negara")
);

-- CreateTable
CREATE TABLE "jenis_pajak" (
    "kode_jenis_pajak" SERIAL NOT NULL,
    "nama_pajak" VARCHAR(50) NOT NULL,
    "deskripsi" TEXT,
    "tata_cara_hitung" VARCHAR(200),

    CONSTRAINT "jenis_pajak_pkey" PRIMARY KEY ("kode_jenis_pajak")
);

-- CreateTable
CREATE TABLE "bank_transfer" (
    "kode_bank" INTEGER NOT NULL,
    "nama_bank" VARCHAR(50) NOT NULL,

    CONSTRAINT "bank_transfer_pkey" PRIMARY KEY ("kode_bank")
);

-- CreateTable
CREATE TABLE "pegawai" (
    "nip" VARCHAR(50) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "nik" VARCHAR(50) NOT NULL,
    "nama_ktp" VARCHAR(100) NOT NULL,
    "npwp" VARCHAR(30) NOT NULL,
    "nama_npwp" VARCHAR(100) NOT NULL,
    "jenkel" VARCHAR(20) NOT NULL,
    "status_nikah" VARCHAR(30) NOT NULL,
    "jumlah_tanggungan" INTEGER NOT NULL,
    "tgl_masuk" DATE NOT NULL,
    "tgl_berakhir" DATE,
    "bank_transfer" VARCHAR(50) NOT NULL,
    "no_rekening" VARCHAR(30) NOT NULL,
    "nama_rekening" VARCHAR(100) NOT NULL,
    "status_pegawai" VARCHAR(30) NOT NULL,
    "satker" VARCHAR(50),

    CONSTRAINT "pegawai_pkey" PRIMARY KEY ("nip")
);

-- CreateTable
CREATE TABLE "tarif_progresif" (
    "id" SERIAL NOT NULL,
    "lapisan" INTEGER NOT NULL,
    "batas_bawah" DOUBLE PRECISION,
    "batas_atas" DOUBLE PRECISION,
    "tarif_uuhpp" DOUBLE PRECISION NOT NULL,
    "tarif_disesuaikan" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tarif_progresif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarif_progresif_pegawai_tetap" (
    "nip" VARCHAR(50) NOT NULL,
    "lapisan" INTEGER NOT NULL,
    "tahun_pajak" DATE NOT NULL,
    "nominal_pkp" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tarif_progresif_pegawai_tetap_pkey" PRIMARY KEY ("nip","lapisan")
);

-- CreateTable
CREATE TABLE "objek_pajak" (
    "kode_objek" VARCHAR(20) NOT NULL,
    "kode_jenis_pajak_id" INTEGER NOT NULL,
    "objek_pajak" VARCHAR(100) NOT NULL,
    "tarif_npwp" DOUBLE PRECISION NOT NULL,
    "tarif_non_npwp" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "objek_pajak_pkey" PRIMARY KEY ("kode_objek")
);

-- CreateTable
CREATE TABLE "satuan_kerja" (
    "idl" VARCHAR(100) NOT NULL,
    "nama_satker" VARCHAR(50) NOT NULL,
    "akronim" VARCHAR(10) NOT NULL,
    "kel_satker_sdm" VARCHAR(100) NOT NULL,

    CONSTRAINT "satuan_kerja_pkey" PRIMARY KEY ("idl")
);

-- CreateTable
CREATE TABLE "agent" (
    "nip" VARCHAR(50) NOT NULL,
    "idl" VARCHAR(100) NOT NULL,
    "status" VARCHAR(10) NOT NULL
);

-- CreateTable
CREATE TABLE "pengelola" (
    "nip" VARCHAR(50) NOT NULL,
    "level" VARCHAR(20) NOT NULL,
    "status" VARCHAR(10) NOT NULL
);

-- CreateTable
CREATE TABLE "otorisasi_setor_pajak" (
    "kode_periode" VARCHAR(20) NOT NULL,
    "status_pengesahan" VARCHAR(50) NOT NULL,
    "catatan" TEXT NOT NULL,

    CONSTRAINT "otorisasi_setor_pajak_pkey" PRIMARY KEY ("kode_periode")
);

-- CreateTable
CREATE TABLE "pengajuan_anggaran" (
    "id_kegiatan_anggaran" VARCHAR(20) NOT NULL,
    "tahun" DATE NOT NULL,
    "kegiatan" VARCHAR(100) NOT NULL,
    "no_pengajuan" VARCHAR(30) NOT NULL,
    "idl" VARCHAR(100) NOT NULL,
    "jumlah_pengajuan" DOUBLE PRECISION NOT NULL,
    "metode_pengajuan" VARCHAR(20) NOT NULL,
    "status_pengajuan" VARCHAR(50) NOT NULL,
    "tanggal_pengajuan" DATE NOT NULL,

    CONSTRAINT "pengajuan_anggaran_pkey" PRIMARY KEY ("id_kegiatan_anggaran")
);

-- CreateTable
CREATE TABLE "wajib_pajak_orang_pribadi" (
    "kode_wpop" VARCHAR(50) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "password" VARCHAR(255),
    "kewarganegaraan" VARCHAR(5) NOT NULL,
    "nama_negara" VARCHAR(100) NOT NULL,
    "id_orang_pribadi" VARCHAR(30) NOT NULL,
    "nama_ktp" VARCHAR(100) NOT NULL,
    "npwp" VARCHAR(30),
    "nama_npwp" VARCHAR(100),
    "kota_npwp" VARCHAR(50),
    "bank_transfer" VARCHAR(50),
    "no_rekening" VARCHAR(30),
    "nama_rekening" VARCHAR(100),
    "nip" VARCHAR(50) NOT NULL,
    "status_pegawai" VARCHAR(30) NOT NULL,
    "file_foto_npwp" VARCHAR(255),
    "file_foto_id_orang_pribadi" VARCHAR(255) NOT NULL,
    "file_foto_bukti_rekening" VARCHAR(255),
    "is_approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "wajib_pajak_orang_pribadi_pkey" PRIMARY KEY ("kode_wpop")
);

-- CreateTable
CREATE TABLE "wajib_pajak_badan_usaha" (
    "kode_wpbadan" VARCHAR(50) NOT NULL,
    "nama_badan" VARCHAR(100) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "npwp" VARCHAR(30),
    "nama_npwp" VARCHAR(100),
    "kota_npwp" VARCHAR(50),
    "bank_transfer" VARCHAR(50),
    "no_rekening" VARCHAR(30),
    "nama_rekening" VARCHAR(100),
    "nama_narahubung" VARCHAR(100) NOT NULL,
    "kontak_narahubung" VARCHAR(15) NOT NULL,
    "ada_skb_pph23" BOOLEAN NOT NULL,
    "masa_berlaku_bebas_pph23" DATE NOT NULL,
    "file_foto_identitas_badan" VARCHAR(255) NOT NULL,
    "file_foto_bukti_rekening" VARCHAR(255) NOT NULL,
    "file_foto_npwp" VARCHAR(255),
    "file_surat_bebas_pph23" VARCHAR(255),
    "status_pkp" VARCHAR(3) NOT NULL,

    CONSTRAINT "wajib_pajak_badan_usaha_pkey" PRIMARY KEY ("kode_wpbadan")
);

-- CreateTable
CREATE TABLE "jenis_penghasilan" (
    "kode_jenis_penghasilan" INTEGER NOT NULL,
    "kode_akun" INTEGER NOT NULL,
    "jenis_pajak_terkait" INTEGER NOT NULL,
    "jenis_penghasilan" VARCHAR(100) NOT NULL,

    CONSTRAINT "jenis_penghasilan_pkey" PRIMARY KEY ("kode_jenis_penghasilan")
);

-- CreateTable
CREATE TABLE "kegiatan_penghasilan_op" (
    "kode_kegiatan_op" VARCHAR(50) NOT NULL,
    "tanggal_penghasilan" DATE NOT NULL,
    "kode_jenis_penghasilan" INTEGER NOT NULL,
    "uraian_kegiatan" VARCHAR(200) NOT NULL,
    "id_kegiatan_anggaran" VARCHAR(20) NOT NULL,
    "kode_jenis_pajak" INTEGER NOT NULL,
    "tanggal_potong_pph" DATE NOT NULL,
    "tanggal_setor_pph" DATE NOT NULL,
    "tanggal_bayar_pph" DATE NOT NULL,
    "minta_billing_sendiri" VARCHAR(3) NOT NULL,
    "id_billing" VARCHAR(30) NOT NULL,
    "ntpn" VARCHAR(30) NOT NULL,
    "pic_pencairan_penghasilan" VARCHAR(10) NOT NULL,
    "kode_periode_otorisasi" VARCHAR(20) NOT NULL,

    CONSTRAINT "kegiatan_penghasilan_op_pkey" PRIMARY KEY ("kode_kegiatan_op")
);

-- CreateTable
CREATE TABLE "item_kegiatan_penghasilan_op" (
    "kode_kegiatan_op" VARCHAR(50) NOT NULL,
    "kode_wpop" VARCHAR(50) NOT NULL,
    "status_pegawai" VARCHAR(30) NOT NULL,
    "npwp" VARCHAR(30),
    "bank_transfer" VARCHAR(50),
    "no_rekening" VARCHAR(30),
    "nama_rekening" VARCHAR(100),
    "penghasilan_bruto" DOUBLE PRECISION NOT NULL,
    "kode_objek" VARCHAR(20) NOT NULL,
    "tarif_berlaku" DOUBLE PRECISION NOT NULL,
    "metode_potong" VARCHAR(50) NOT NULL,
    "file_bukti_potong" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "item_kegiatan_penghasilan_op_pkey" PRIMARY KEY ("kode_kegiatan_op","kode_wpop")
);

-- CreateTable
CREATE TABLE "kegiatan_penghasilan_badan" (
    "kode_kegiatan_badan" VARCHAR(50) NOT NULL,
    "tanggal_transaksi" DATE NOT NULL,
    "uraian_kegiatan" VARCHAR(200) NOT NULL,
    "id_kegiatan_anggaran" VARCHAR(20) NOT NULL,
    "kode_jenis_penghasilan" INTEGER NOT NULL,
    "kode_jenis_pajak" INTEGER NOT NULL,
    "kode_wp_badan" VARCHAR(50) NOT NULL,
    "penghasilan_bruto" DOUBLE PRECISION NOT NULL,
    "kode_objek" VARCHAR(20) NOT NULL,
    "tarif_pajak" DOUBLE PRECISION NOT NULL,
    "tanggal_potong_pph" DATE NOT NULL,
    "tanggal_setor_pph" DATE NOT NULL,
    "tanggal_bayar_pph" DATE NOT NULL,
    "no_rekening" VARCHAR(30) NOT NULL,
    "nama_rekening" VARCHAR(100) NOT NULL,
    "narahubung" VARCHAR(100) NOT NULL,
    "file_bukti_potong" VARCHAR(255) NOT NULL,
    "kode_periode_otorisasi" VARCHAR(20) NOT NULL,

    CONSTRAINT "kegiatan_penghasilan_badan_pkey" PRIMARY KEY ("kode_kegiatan_badan")
);

-- CreateTable
CREATE TABLE "detail_file_pendukung" (
    "id" SERIAL NOT NULL,
    "kode_kegiatan_badan" VARCHAR(50) NOT NULL,
    "jenis_dokumen" VARCHAR(50) NOT NULL,
    "no_dokumen" VARCHAR(30) NOT NULL,
    "file_bukti_pendukung" VARCHAR(255) NOT NULL,

    CONSTRAINT "detail_file_pendukung_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventarisasi_pajak" (
    "id_inventarisasi_pajak" SERIAL NOT NULL,
    "kode_kegiatan_badan" VARCHAR(50) NOT NULL,
    "uraian_kegiatan" VARCHAR(200) NOT NULL,
    "id_kegiatan_anggaran" VARCHAR(20) NOT NULL,
    "penghasilan_bruto" DOUBLE PRECISION NOT NULL,
    "kode_objek" VARCHAR(20) NOT NULL,
    "nominal_pajak" DOUBLE PRECISION NOT NULL,
    "file_bukti" VARCHAR(255) NOT NULL,
    "npwp_pemotong" VARCHAR(30),
    "nama_pemotong" VARCHAR(100),

    CONSTRAINT "inventarisasi_pajak_pkey" PRIMARY KEY ("id_inventarisasi_pajak")
);

-- CreateTable
CREATE TABLE "log_kegiatan_penghasilan_op" (
    "kode_kegiatan_op" VARCHAR(50) NOT NULL,
    "tanggal_bayar_op" DATE NOT NULL,
    "uraian_kegiatan" VARCHAR(200) NOT NULL,
    "id_kegiatan_anggaran" VARCHAR(20) NOT NULL,
    "kode_jenis_pajak" INTEGER NOT NULL,
    "tanggal_potong_pph" DATE NOT NULL,
    "tanggal_setor_pph" DATE NOT NULL,
    "tanggal_bayar_pph" DATE NOT NULL,
    "minta_billing_sendiri" VARCHAR(3) NOT NULL,
    "id_billing" VARCHAR(30) NOT NULL,
    "nip_log" VARCHAR(50) NOT NULL
);

-- CreateTable
CREATE TABLE "log_item_kegiatan_penghasilan_op" (
    "kode_kegiatan_op" VARCHAR(50) NOT NULL,
    "kode_wpop" VARCHAR(50) NOT NULL,
    "status_pegawai" VARCHAR(30) NOT NULL,
    "npwp" VARCHAR(30),
    "bank_transfer" VARCHAR(50),
    "no_rekening" VARCHAR(30),
    "nama_rekening" VARCHAR(100),
    "penghasilan_bruto" DOUBLE PRECISION NOT NULL,
    "kode_objek" VARCHAR(20) NOT NULL,
    "tarif_berlaku" DOUBLE PRECISION NOT NULL,
    "metode_potong" VARCHAR(50) NOT NULL,
    "file_bukti_potong" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "nip_log" VARCHAR(50) NOT NULL,

    CONSTRAINT "log_item_kegiatan_penghasilan_op_pkey" PRIMARY KEY ("kode_kegiatan_op","kode_wpop")
);

-- CreateIndex
CREATE UNIQUE INDEX "negara_nama_negara_key" ON "negara"("nama_negara");

-- CreateIndex
CREATE UNIQUE INDEX "bank_transfer_nama_bank_key" ON "bank_transfer"("nama_bank");

-- CreateIndex
CREATE UNIQUE INDEX "pegawai_nip_key" ON "pegawai"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "pegawai_email_key" ON "pegawai"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pegawai_nik_key" ON "pegawai"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "pegawai_npwp_key" ON "pegawai"("npwp");

-- CreateIndex
CREATE UNIQUE INDEX "tarif_progresif_lapisan_key" ON "tarif_progresif"("lapisan");

-- CreateIndex
CREATE UNIQUE INDEX "tarif_progresif_pegawai_tetap_nip_key" ON "tarif_progresif_pegawai_tetap"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "tarif_progresif_pegawai_tetap_lapisan_key" ON "tarif_progresif_pegawai_tetap"("lapisan");

-- CreateIndex
CREATE UNIQUE INDEX "agent_nip_key" ON "agent"("nip");

-- CreateIndex
CREATE INDEX "agent_nip_idl_idx" ON "agent"("nip", "idl");

-- CreateIndex
CREATE UNIQUE INDEX "pengelola_nip_key" ON "pengelola"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "wajib_pajak_orang_pribadi_email_key" ON "wajib_pajak_orang_pribadi"("email");

-- CreateIndex
CREATE UNIQUE INDEX "wajib_pajak_orang_pribadi_nip_key" ON "wajib_pajak_orang_pribadi"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "wajib_pajak_badan_usaha_email_key" ON "wajib_pajak_badan_usaha"("email");

-- CreateIndex
CREATE UNIQUE INDEX "log_kegiatan_penghasilan_op_nip_log_key" ON "log_kegiatan_penghasilan_op"("nip_log");

-- CreateIndex
CREATE UNIQUE INDEX "log_item_kegiatan_penghasilan_op_nip_log_key" ON "log_item_kegiatan_penghasilan_op"("nip_log");

-- AddForeignKey
ALTER TABLE "tarif_progresif_pegawai_tetap" ADD CONSTRAINT "tarif_progresif_pegawai_tetap_nip_fkey" FOREIGN KEY ("nip") REFERENCES "pegawai"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarif_progresif_pegawai_tetap" ADD CONSTRAINT "tarif_progresif_pegawai_tetap_lapisan_fkey" FOREIGN KEY ("lapisan") REFERENCES "tarif_progresif"("lapisan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "objek_pajak" ADD CONSTRAINT "objek_pajak_kode_jenis_pajak_id_fkey" FOREIGN KEY ("kode_jenis_pajak_id") REFERENCES "jenis_pajak"("kode_jenis_pajak") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent" ADD CONSTRAINT "agent_nip_fkey" FOREIGN KEY ("nip") REFERENCES "pegawai"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent" ADD CONSTRAINT "agent_idl_fkey" FOREIGN KEY ("idl") REFERENCES "satuan_kerja"("idl") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengelola" ADD CONSTRAINT "pengelola_nip_fkey" FOREIGN KEY ("nip") REFERENCES "pegawai"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengajuan_anggaran" ADD CONSTRAINT "pengajuan_anggaran_idl_fkey" FOREIGN KEY ("idl") REFERENCES "satuan_kerja"("idl") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wajib_pajak_orang_pribadi" ADD CONSTRAINT "wajib_pajak_orang_pribadi_nama_negara_fkey" FOREIGN KEY ("nama_negara") REFERENCES "negara"("nama_negara") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wajib_pajak_orang_pribadi" ADD CONSTRAINT "wajib_pajak_orang_pribadi_nip_fkey" FOREIGN KEY ("nip") REFERENCES "pegawai"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_penghasilan_op" ADD CONSTRAINT "kegiatan_penghasilan_op_kode_jenis_penghasilan_fkey" FOREIGN KEY ("kode_jenis_penghasilan") REFERENCES "jenis_penghasilan"("kode_jenis_penghasilan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_penghasilan_op" ADD CONSTRAINT "kegiatan_penghasilan_op_id_kegiatan_anggaran_fkey" FOREIGN KEY ("id_kegiatan_anggaran") REFERENCES "pengajuan_anggaran"("id_kegiatan_anggaran") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_penghasilan_op" ADD CONSTRAINT "kegiatan_penghasilan_op_kode_jenis_pajak_fkey" FOREIGN KEY ("kode_jenis_pajak") REFERENCES "jenis_pajak"("kode_jenis_pajak") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_penghasilan_op" ADD CONSTRAINT "kegiatan_penghasilan_op_kode_periode_otorisasi_fkey" FOREIGN KEY ("kode_periode_otorisasi") REFERENCES "otorisasi_setor_pajak"("kode_periode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_kegiatan_penghasilan_op" ADD CONSTRAINT "item_kegiatan_penghasilan_op_kode_kegiatan_op_fkey" FOREIGN KEY ("kode_kegiatan_op") REFERENCES "kegiatan_penghasilan_op"("kode_kegiatan_op") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_kegiatan_penghasilan_op" ADD CONSTRAINT "item_kegiatan_penghasilan_op_kode_wpop_fkey" FOREIGN KEY ("kode_wpop") REFERENCES "wajib_pajak_orang_pribadi"("kode_wpop") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_kegiatan_penghasilan_op" ADD CONSTRAINT "item_kegiatan_penghasilan_op_kode_objek_fkey" FOREIGN KEY ("kode_objek") REFERENCES "objek_pajak"("kode_objek") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_penghasilan_badan" ADD CONSTRAINT "kegiatan_penghasilan_badan_id_kegiatan_anggaran_fkey" FOREIGN KEY ("id_kegiatan_anggaran") REFERENCES "pengajuan_anggaran"("id_kegiatan_anggaran") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_penghasilan_badan" ADD CONSTRAINT "kegiatan_penghasilan_badan_kode_jenis_penghasilan_fkey" FOREIGN KEY ("kode_jenis_penghasilan") REFERENCES "jenis_penghasilan"("kode_jenis_penghasilan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_penghasilan_badan" ADD CONSTRAINT "kegiatan_penghasilan_badan_kode_jenis_pajak_fkey" FOREIGN KEY ("kode_jenis_pajak") REFERENCES "jenis_pajak"("kode_jenis_pajak") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_penghasilan_badan" ADD CONSTRAINT "kegiatan_penghasilan_badan_kode_wp_badan_fkey" FOREIGN KEY ("kode_wp_badan") REFERENCES "wajib_pajak_badan_usaha"("kode_wpbadan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_penghasilan_badan" ADD CONSTRAINT "kegiatan_penghasilan_badan_kode_objek_fkey" FOREIGN KEY ("kode_objek") REFERENCES "objek_pajak"("kode_objek") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_penghasilan_badan" ADD CONSTRAINT "kegiatan_penghasilan_badan_kode_periode_otorisasi_fkey" FOREIGN KEY ("kode_periode_otorisasi") REFERENCES "otorisasi_setor_pajak"("kode_periode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_file_pendukung" ADD CONSTRAINT "detail_file_pendukung_kode_kegiatan_badan_fkey" FOREIGN KEY ("kode_kegiatan_badan") REFERENCES "kegiatan_penghasilan_badan"("kode_kegiatan_badan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventarisasi_pajak" ADD CONSTRAINT "inventarisasi_pajak_kode_kegiatan_badan_fkey" FOREIGN KEY ("kode_kegiatan_badan") REFERENCES "kegiatan_penghasilan_badan"("kode_kegiatan_badan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventarisasi_pajak" ADD CONSTRAINT "inventarisasi_pajak_id_kegiatan_anggaran_fkey" FOREIGN KEY ("id_kegiatan_anggaran") REFERENCES "pengajuan_anggaran"("id_kegiatan_anggaran") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventarisasi_pajak" ADD CONSTRAINT "inventarisasi_pajak_kode_objek_fkey" FOREIGN KEY ("kode_objek") REFERENCES "objek_pajak"("kode_objek") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_kegiatan_penghasilan_op" ADD CONSTRAINT "log_kegiatan_penghasilan_op_kode_kegiatan_op_fkey" FOREIGN KEY ("kode_kegiatan_op") REFERENCES "kegiatan_penghasilan_op"("kode_kegiatan_op") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_kegiatan_penghasilan_op" ADD CONSTRAINT "log_kegiatan_penghasilan_op_id_kegiatan_anggaran_fkey" FOREIGN KEY ("id_kegiatan_anggaran") REFERENCES "pengajuan_anggaran"("id_kegiatan_anggaran") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_kegiatan_penghasilan_op" ADD CONSTRAINT "log_kegiatan_penghasilan_op_kode_jenis_pajak_fkey" FOREIGN KEY ("kode_jenis_pajak") REFERENCES "jenis_pajak"("kode_jenis_pajak") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_kegiatan_penghasilan_op" ADD CONSTRAINT "log_kegiatan_penghasilan_op_nip_log_fkey" FOREIGN KEY ("nip_log") REFERENCES "pegawai"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_item_kegiatan_penghasilan_op" ADD CONSTRAINT "log_item_kegiatan_penghasilan_op_kode_kegiatan_op_fkey" FOREIGN KEY ("kode_kegiatan_op") REFERENCES "kegiatan_penghasilan_op"("kode_kegiatan_op") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_item_kegiatan_penghasilan_op" ADD CONSTRAINT "log_item_kegiatan_penghasilan_op_kode_wpop_fkey" FOREIGN KEY ("kode_wpop") REFERENCES "wajib_pajak_orang_pribadi"("kode_wpop") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_item_kegiatan_penghasilan_op" ADD CONSTRAINT "log_item_kegiatan_penghasilan_op_kode_objek_fkey" FOREIGN KEY ("kode_objek") REFERENCES "objek_pajak"("kode_objek") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_item_kegiatan_penghasilan_op" ADD CONSTRAINT "log_item_kegiatan_penghasilan_op_nip_log_fkey" FOREIGN KEY ("nip_log") REFERENCES "pegawai"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;
