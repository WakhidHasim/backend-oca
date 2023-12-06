import axios, { AxiosResponse } from "axios"

import { get_EXTERNAL_OCA_BASE_URL } from "../../config/app"
import {
  ocaLogin
} from "../auth/ocaAuthService"

/**
 * Required data to perform an upload request to the OCA cloud
 */
type AxiosOcaUploadRequest = {
  /**
   * file path where the document should be stored in the cloud
   */
  path: string
  name: string
  mime: string
  /**
   * the encoded file as Base64 string
   */
  data: string
}

/**
 * Returned data from making an upload to the OCA cloud
 */
type AxiosOcaUploadResponse = {
  status: {
    code: number
    description: string
  }
  result: string
}

type UploadWpopDocumentIn = {
  file: {
    name: string
    /**
     * uploaded file as buffer data
     */
    content: Buffer
  }
}

export async function uploadWpopDocument(param: UploadWpopDocumentIn) {
  // TODO: check if authenticated user has a 'oca token' from the database

  // make authentication from 'oca service' if the user is not already authenticated
  // TODO: replace this with the actual credentials
  const token = await ocaLogin({
    userId: "190302159",
    password: "demo"
  })

  const base64File = param.file.content.toString("base64")
  // this customFileName must be stored into database along with its path
  const customFileName = Date.now().toString() + ".pdf"

  // do upload into 'oca service'
  // TODO: replace this with the actual value
  const ocaUploadUrl = get_EXTERNAL_OCA_BASE_URL() + "/owncloud/upload"
  await axios.post<AxiosOcaUploadRequest, AxiosResponse<AxiosOcaUploadResponse>>(ocaUploadUrl, {
    path: "registrasi_wajib_pajak",
    // this name can be the custom generated file name or the original filename
    // you can change it as needed
    name: customFileName,
    mime: "application/pdf",
    data: base64File
  }, {
    headers: {
      Authorization: `bearer ${token}`
    }
  })
}