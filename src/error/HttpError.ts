export default class HttpError extends Error {
  private _statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message)

    this._statusCode = statusCode
  }

  public get statusCode(): number {
    return this._statusCode;
  }
}