import { Request, Response } from 'express';

import * as dashboardService from '../services/dashboardService';

export const countPph21Entry = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;

    const countPPh21Entry = await dashboardService.countPph21Entry(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: countPPh21Entry,
    });
  } catch (error: any) {
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: 'Internal Server Error',
    });
  }
};

export const countPph21Verifikasi = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;

    const countPph21Verifikasi = await dashboardService.countPph21Verifikasi(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: countPph21Verifikasi,
    });
  } catch (error: any) {
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: 'Internal Server Error',
    });
  }
};

export const countPph21Setor = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;

    const countPph21Setor = await dashboardService.countPph21Setor(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: countPph21Setor,
    });
  } catch (error: any) {
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: 'Internal Server Error',
    });
  }
};

export const countPph23Entry = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;

    const countPPh23Entry = await dashboardService.countPph23Entry(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: countPPh23Entry,
    });
  } catch (error: any) {
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: 'Internal Server Error',
    });
  }
};

export const countPph23Verifikasi = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;

    const countPph23Verifikasi = await dashboardService.countPph23Verifikasi(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: countPph23Verifikasi,
    });
  } catch (error: any) {
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: 'Internal Server Error',
    });
  }
};

export const countPph23Setor = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;

    const countPph23Setor = await dashboardService.countPph23Setor(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: countPph23Setor,
    });
  } catch (error: any) {
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: 'Internal Server Error',
    });
  }
};

export const countPph4Entry = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;

    const countPph4Entry = await dashboardService.countPph4Entry(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: countPph4Entry,
    });
  } catch (error: any) {
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: 'Internal Server Error',
    });
  }
};

export const countPph4Verifikasi = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;

    const countPph4Verifikasi = await dashboardService.countPph4Verifikasi(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: countPph4Verifikasi,
    });
  } catch (error: any) {
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: 'Internal Server Error',
    });
  }
};

export const countPph4Setor = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;

    const countPph4Setor = await dashboardService.countPph4Setor(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: countPph4Setor,
    });
  } catch (error: any) {
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: 'Internal Server Error',
    });
  }
};
