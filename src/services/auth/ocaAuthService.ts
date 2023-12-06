import { get_EXTERNAL_OCA_BASE_URL } from "../../config/app"
import axios, { AxiosResponse } from "axios"

/**
 * Required data for the ocaLogin method
 */
type OcaLoginIn = {
  userId: string
  password: string
}

/**
 * Returned data from the ocaLogin method
 */
type OcaLoginOut = string

/**
 * Required data for making a request to the oca external auth service
 */
type AxiosOcaAuthRequest = {
  user_id: string
  password: string
}

/**
 * Returned data from making a request from the oca external auth service
 */
type AxiosOcaAuthResponse = {
  status: {
    code: number
    description: string
  }
  result: {
    access_token: string
    expires_in: number
  }
}

/**
 * Obtain token from oca auth service
 * 
 * @param param MakeParam
 * @throws Error
 */
export async function ocaLogin(param: OcaLoginIn): Promise<OcaLoginOut> {
  const ocaUrl = get_EXTERNAL_OCA_BASE_URL() + "/auth"

  const response = await axios.post<AxiosOcaAuthRequest, AxiosResponse<AxiosOcaAuthResponse>>(ocaUrl, {
    user_id: param.userId,
    password: param.password
  })

  return response.data.result.access_token
}