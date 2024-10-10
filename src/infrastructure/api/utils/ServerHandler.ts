export class ServerHandler {
  static sendResponse(res: any, statusCode: number, data: any) {
    res.status(statusCode).json(data);
  }

  static handleError(res: any, error: any) {
    res.status(500).json({ message: error.message });
  }
}

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}