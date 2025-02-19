import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware(async ({ locals, request }, next) => {
  return await next();
});