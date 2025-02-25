import type { APIRoute } from 'astro';
import { cmsService } from '../../../lib/cms';

export const get: APIRoute = async ({ request }) => {
  try {
    const contents = await cmsService.getContents();
    return new Response(JSON.stringify(contents), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export const post: APIRoute = async ({ request }) => {
  try {
    const content = await request.json();
    const newContent = await cmsService.createContent(content);
    return new Response(JSON.stringify(newContent), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}; 