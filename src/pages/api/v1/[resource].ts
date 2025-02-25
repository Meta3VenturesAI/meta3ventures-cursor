import { createAPIHandler } from '../../../lib/middleware';

export const get = createAPIHandler(async ({ params, request }) => {
  const { resource } = params;
  const data = await cmsService.getContents();
  
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}); 