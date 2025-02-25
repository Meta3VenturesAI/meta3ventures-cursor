import { rateLimit } from './middleware/rateLimit';
import { errorHandler } from './errors';
import { checkPermission } from './auth/roles';

export const createAPIHandler = (handler: Function) => {
  return async (context: any) => {
    try {
      // Rate limiting
      const isAllowed = await rateLimit(
        context.request.headers.get('x-forwarded-for') || 'unknown',
        context.request.url,
        { max: 100, window: 60 }
      );

      if (!isAllowed) {
        throw new AppError('Too many requests', 'RATE_LIMIT_EXCEEDED', 429);
      }

      // Permission check
      const session = await context.locals.auth.validate();
      if (!checkPermission(session.role, 'read', context.params.resource)) {
        throw new AppError('Unauthorized', 'UNAUTHORIZED', 403);
      }

      return await handler(context);
    } catch (error) {
      return new Response(
        JSON.stringify(errorHandler.handle(error)),
        { 
          status: error.status || 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  };
}; 