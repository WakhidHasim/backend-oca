/**
 * get the EXTERNAL_OCA_BASE_URL from environment
 * 
 * @returns stirng 
 * @throws Error
 */
export function get_EXTERNAL_OCA_BASE_URL(): string {
  const EXTERNAL_OCA_BASE_URL = process.env.EXTERNAL_OCA_BASE_URL
  if (!EXTERNAL_OCA_BASE_URL) throw new Error("EXTERNAL_OCA_BASE_URL is missing")

  return EXTERNAL_OCA_BASE_URL
}
