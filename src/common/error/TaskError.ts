export class TaskError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly metadata?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'TaskError';
  }

  static validation(message: string, metadata?: Record<string, unknown>) {
    return new TaskError(message, 400, metadata);
  }

  static notFound(message: string, metadata?: Record<string, unknown>) {
    return new TaskError(message, 404, metadata);
  }

  static unauthorized(message: string, metadata?: Record<string, unknown>) {
    return new TaskError(message, 401, metadata);
  }

  static forbidden(message: string, metadata?: Record<string, unknown>) {
    return new TaskError(message, 403, metadata);
  }

  static internal(message: string, metadata?: Record<string, unknown>) {
    return new TaskError(message, 500, metadata);
  }
} 