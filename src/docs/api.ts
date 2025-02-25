import { createSwaggerSpec } from '@astro-swagger/core';

export const apiSpec = createSwaggerSpec({
  openapi: '3.0.0',
  info: {
    title: 'Meta3 Ventures API',
    version: '1.0.0',
    description: 'API documentation for Meta3 Ventures'
  },
  servers: [
    {
      url: 'https://meta3ventures.netlify.app/api/v1',
      description: 'Production server'
    }
  ],
  paths: {
    '/contents': {
      get: {
        summary: 'Get all contents',
        responses: {
          '200': {
            description: 'List of contents',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Content'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Content: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          content: { type: 'string' },
          status: { type: 'string', enum: ['draft', 'published'] }
        }
      }
    }
  }
}); 