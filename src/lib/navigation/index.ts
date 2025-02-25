import type { Route } from './types';
import { META3_ROUTES, GENOVATE_ROUTES } from './routes';
import { navigationConfig } from './config';

export function getRoutes(brand: 'meta3' | 'genovate'): Route[] {
  return brand === 'meta3' ? META3_ROUTES : GENOVATE_ROUTES;
}

export function getRoute(path: string, brand: 'meta3' | 'genovate'): Route | undefined {
  const routes = getRoutes(brand);
  return routes.find(route => route.path === path);
}

export function requiresAuth(path: string, brand: 'meta3' | 'genovate'): boolean {
  const route = getRoute(path, brand);
  return route?.meta?.requiresAuth ?? false;
}

export function getBrandConfig(brand: 'meta3' | 'genovate') {
  return {
    routes: getRoutes(brand),
    baseUrl: navigationConfig.baseUrl,
    defaultRoute: navigationConfig.defaultRoute
  };
}