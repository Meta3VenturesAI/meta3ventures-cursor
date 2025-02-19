```typescript
// Define route constants
export const META3_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PORTFOLIO: '/portfolio', 
  STUDIO: '/studio',
  RESOURCES: '/resources',
  BLOG: '/blog',
  CONTACT: '/contact',
  APPLY: '/apply'
} as const;

export const GENOVATE_ROUTES = {
  HOME: '/genovate',
  ABOUT: '/genovate/about',
  SERVICES: '/genovate/services',
  STUDIO: '/genovate/studio',
  RESOURCES: '/genovate/resources',
  BLOG: '/genovate/blog',
  CONTACT: '/genovate/contact',
  DEMO: '/schedule-demo'
} as const;

export const ROUTES = {
  META3: META3_ROUTES,
  GENOVATE: GENOVATE_ROUTES
} as const;
```