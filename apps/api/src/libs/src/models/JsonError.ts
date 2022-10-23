export class JsonError extends Error {
  message: string;
  detail?: string;
  constructor(message: string, detail?: string) {
    super();
    this.message = message;
    this.detail = detail;
  }
}
