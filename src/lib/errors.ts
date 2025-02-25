export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public status: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = {
  handle(error: any) {
    if (error instanceof AppError) {
      return {
        message: error.message,
        code: error.code,
        status: error.status
      };
    }
    
    // Log unexpected errors
    console.error('Unexpected error:', error);
    return {
      message: 'An unexpected error occurred',
      code: 'INTERNAL_ERROR',
      status: 500
    };
  }
}; 