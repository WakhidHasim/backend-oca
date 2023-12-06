import axios, { AxiosResponse } from 'axios';
import { extname } from 'path';

import { get_EXTERNAL_OCA_BASE_URL } from '../../config/app';
import { ocaLogin } from '../auth/ocaAuthService';

/**
 * Required data to perform an upload request to the OCA cloud
 */
type AxiosOcaUploadRequest = {
  /**
   * file path where the document should be stored in the cloud
   */
  path: string;
  name: string;
  mime: string;
  /**
   * the encoded file as Base64 string
   */
  data: string;
};

/**
 * Returned data from making an upload to the OCA cloud
 */
type AxiosOcaUploadResponse = {
  status: {
    code: number;
    description: string;
  };
  result: string;
};

type UploadWpopDocumentIn = {
  file: {
    name: string;
    /**
     * uploaded file as buffer data
     */
    content: Buffer;
  };
};

export async function uploadWpopDocument(
  param: UploadWpopDocumentIn,
  path: string
) {
  const token = await ocaLogin({
    userId: '190302159',
    password: 'demo',
  });

  const base64File = param.file.content.toString('base64');
  const fileExtension = extname(param.file.name).toLowerCase();
  const customFileName = Date.now().toString() + fileExtension;

  const ocaUploadUrl = get_EXTERNAL_OCA_BASE_URL() + '/owncloud/upload';
  await axios.post<
    AxiosOcaUploadRequest,
    AxiosResponse<AxiosOcaUploadResponse>
  >(
    ocaUploadUrl,
    {
      path: path,
      name: customFileName,
      mime: `image/${fileExtension.slice(1)}`,
      data: base64File,
    },
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );
}
