import type { Route, Brand } from './navigation/types';

const routes: Record<Brand, Route[]> = {
  meta3: [
    { path: '/', name: 'Home', component: 'Home' },
    { path: '/about', name: 'About', component: 'About' },
    { path: '/portfolio', name: 'Portfolio', component: 'Portfolio' },
    { path: '/studio', name: 'Studio', component: 'Studio' },
    { path: '/resources', name: 'Resources', component: 'Resources' },
    { path: '/blog', name: 'Blog', component: 'Blog' },
    { path: '/contact', name: 'Contact', component: 'Contact' }
  ],
  genovate: [
    { path: '/', name: 'Home', component: 'Home' },
    { path: '/about', name: 'About', component: 'About' },
    { path: '/services', name: 'Services', component: 'Services' },
    { path: '/studio', name: 'Studio', component: 'Studio' },
    { path: '/resources', name: 'Resources', component: 'Resources' },
    { path: '/blog', name: 'Blog', component: 'Blog' },
    { path: '/contact', name: 'Contact', component: 'Contact' }
  ]
};

export function getRouteByPath(path: string, brand: Brand): Route | undefined {
  return routes[brand].find(route => route.path === path);
}

export function getBrandRoutes(brand: Brand): Route[] {
  return routes[brand];
}

export function isProtectedRoute(route: Route): boolean {
  return route.meta?.requiresAuth ?? false;
}

export function getRoleRequirements(route: Route): string[] {
  return route.meta?.roles || [];
}

export { routes };