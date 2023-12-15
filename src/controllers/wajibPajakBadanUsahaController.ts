import { Request, Response } from 'express';

import * as wajibPajakBadanUsahaService from '../services/wajibPajakBadanUsahaService';

export const wpbuList = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const wpbuList = await wajibPajakBadanUsahaService.getWPBUList(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: wpbuList.map((data: any) => ({
        kode_wpbadan: data.kodeWPBadan,
        nama_badan: data.namaBadan,
        email: data.email,
        npwp: data.npwp,
        nama_npwp: data.namaNpwp,
        kota_npwp: data.kotaNpwp,
        bank_transfer: data.bankTransfer,
        no_rekening: data.noRekening,
        nama_rekening: data.namaRekening,
        nama_narahubung: data.namaNaraHubung,
        kontak_narahubung: data.kontakNaraHubung,
        ada_skb_pph23: data.adaSkbPPh23,
        masa_berlaku_bebas_pph23: data.masaBerlakuBebasPPh23,
        file_foto_identitas_badan: data.fileFotoIdentitasBadan,
        file_foto_bukti_rekening: data.fileFotoBuktiRekening,
        file_foto_npwp: data.fileFotoNpwp,
        file_surat_bebas_pph23: data.fileSuratBebasPPh23,
        status_pkp: data.statusPkp,
      })),
    });
  } catch (error) {
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: null,
    });
  }
};
