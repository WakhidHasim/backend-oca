require('dotenv').config();
import axios, { AxiosResponse } from 'axios';
import jwt from 'jsonwebtoken';

import { prisma } from '../../config/database';

import { get_EXTERNAL_OCA_BASE_URL } from '../../config/app';

type agentLoginIn = {
  user_id: string;
  password: string;
};

export type AxiosAgentAuthRequest = {
  user_id: string;
  password: string;
};

type AxiosAgentAuthResponse = {
  status: {
    code: number;
    description: string;
  };
  result: {
    access_token: string;
    expires_in: number;
  };
};

export const handleAgentLogin = async (param: agentLoginIn) => {
  const ocaUrl = get_EXTERNAL_OCA_BASE_URL() + '/auth';
  try {
    const authServiceResponse = await axios.post<
      AxiosAgentAuthRequest,
      AxiosResponse<AxiosAgentAuthResponse>
    >(ocaUrl, {
      user_id: param.user_id,
      password: param.password,
    });

    const accessToken = authServiceResponse.data.result.access_token;

    const agent = await prisma.agent.findUnique({
      where: { nip: param.user_id },
    });

    if (!agent) {
      throw new Error('Agent tidak terdaftar!');
    }
    if (agent.status !== 'aktif') {
      throw new Error('Agent tidak aktif!');
    }

    const pegawai = await prisma.pegawai.findUnique({
      where: { nip: param.user_id },
    });

    if (!pegawai) {
      throw new Error('Pegawai tidak ditemukan');
    }

    const namaPegawai = pegawai.nama;

    const satuanKerja = await prisma.satuanKerja.findUnique({
      where: { idl: agent.idl },
    });

    if (!satuanKerja) {
      throw new Error('Satuan Kerja tidak ditemukan');
    }

    const namaSatker = satuanKerja.namaSatker;

    const secretKey = process.env.JWT_SECRET_KEY ?? '';

    const expiresIn = 6000;

    const jwtToken = jwt.sign(
      {
        nip: agent.nip,
        nama_pegawai: namaPegawai,
        idl: agent.idl,
        nama_satker: namaSatker,
      },
      secretKey,
      {
        expiresIn: expiresIn,
      }
    );

    return {
      status: {
        code: 200,
        description: 'OK',
      },
      result: {
        access_token: jwtToken,
        expires_in: expiresIn,
      },
    };
  } catch (error: any) {
    console.error('Authentication failed:', error.message);
    if (error.response) {
      console.error(
        'Error response from external service:',
        error.response.data
      );

      if (error.response.data.result === 'User id atau password salah !!!') {
        throw new Error('User id atau password salah !!!');
      }
    }
    throw new Error('Authentication failed');
  }
};
