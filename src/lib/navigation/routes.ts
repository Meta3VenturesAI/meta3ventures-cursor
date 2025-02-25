import type { Route } from './types';

// Meta3 Routes
export const META3_HOME: Route = {
  path: '/',
  name: 'Home',
  component: 'Home'
};

export const META3_ABOUT: Route = {
  path: '/about',
  name: 'About',
  component: 'About'
};

export const META3_PORTFOLIO: Route = {
  path: '/portfolio',
  name: 'Portfolio',
  component: 'Portfolio'
};

export const META3_STUDIO: Route = {
  path: '/studio',
  name: 'Studio',
  component: 'Studio'
};

export const META3_RESOURCES: Route = {
  path: '/resources',
  name: 'Resources',
  component: 'Resources'
};

export const META3_BLOG: Route = {
  path: '/blog',
  name: 'Blog',
  component: 'Blog'
};

export const META3_CONTACT: Route = {
  path: '/contact',
  name: 'Contact',
  component: 'Contact'
};

// Genovate Routes
export const GENOVATE_HOME: Route = {
  path: '/',
  name: 'Home',
  component: 'Home'
};

export const GENOVATE_ABOUT: Route = {
  path: '/about',
  name: 'About',
  component: 'About'
};

export const GENOVATE_SERVICES: Route = {
  path: '/services',
  name: 'Services',
  component: 'Services'
};

export const GENOVATE_STUDIO: Route = {
  path: '/studio',
  name: 'Studio',
  component: 'Studio'
};

export const GENOVATE_RESOURCES: Route = {
  path: '/resources',
  name: 'Resources',
  component: 'Resources'
};

export const GENOVATE_BLOG: Route = {
  path: '/blog',
  name: 'Blog',
  component: 'Blog'
};

export const GENOVATE_CONTACT: Route = {
  path: '/contact',
  name: 'Contact',
  component: 'Contact'
};

// Route collections
export const META3_ROUTES = [
  META3_HOME,
  META3_ABOUT,
  META3_PORTFOLIO,
  META3_STUDIO,
  META3_RESOURCES,
  META3_BLOG,
  META3_CONTACT
];

export const GENOVATE_ROUTES = [
  GENOVATE_HOME,
  GENOVATE_ABOUT,
  GENOVATE_SERVICES,
  GENOVATE_STUDIO,
  GENOVATE_RESOURCES,
  GENOVATE_BLOG,
  GENOVATE_CONTACT
];

export const ROUTES = {
  META3: META3_ROUTES,
  GENOVATE: GENOVATE_ROUTES
} as const;