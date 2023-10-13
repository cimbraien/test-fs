export class BaseException {
  public code: string;
  public message: string;
  public httpCode?: number;
  public data?: Record<string, any>;

  constructor(code: string, message: string, httpCode?: number, data?: Record<string, any>) {
    this.code = code;
    this.message = message;
    this.httpCode = httpCode;
    this.data = data;
  }
}
