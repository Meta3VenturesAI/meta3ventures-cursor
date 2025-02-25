import type { NavItem, FooterNav, Route } from './types';

// Individual route declarations
const META3_HOME: Route = { path: '/', name: 'Home', component: 'Home' };
const META3_ABOUT: Route = { path: '/about', name: 'About', component: 'About' };
const META3_PORTFOLIO: Route = { path: '/portfolio', name: 'Portfolio', component: 'Portfolio' };
const META3_STUDIO: Route = { path: '/studio', name: 'Studio', component: 'Studio' };
const META3_RESOURCES: Route = { path: '/resources', name: 'Resources', component: 'Resources' };
const META3_BLOG: Route = { path: '/blog', name: 'Blog', component: 'Blog' };
const META3_CONTACT: Route = { path: '/contact', name: 'Contact', component: 'Contact' };

const GENOVATE_HOME: Route = { path: '/', name: 'Home', component: 'Home' };
const GENOVATE_ABOUT: Route = { path: '/about', name: 'About', component: 'About' };
const GENOVATE_SERVICES: Route = { path: '/services', name: 'Services', component: 'Services' };
const GENOVATE_STUDIO: Route = { path: '/studio', name: 'Studio', component: 'Studio' };
const GENOVATE_RESOURCES: Route = { path: '/resources', name: 'Resources', component: 'Resources' };
const GENOVATE_BLOG: Route = { path: '/blog', name: 'Blog', component: 'Blog' };
const GENOVATE_CONTACT: Route = { path: '/contact', name: 'Contact', component: 'Contact' };

export const BRAND_SWITCH = {
  meta3: {
    href: GENOVATE_HOME.path,
    text: "Switch to GenovateAI",
    icon: "🔄"
  },
  genovate: {
    href: META3_HOME.path,
    text: "Switch to Meta3Ventures",
    icon: "🔄"
  }
} as const;

export const META3_NAV: NavItem[] = [
  { text: "About", href: META3_ABOUT.path },
  { text: "Portfolio", href: META3_PORTFOLIO.path },
  { text: "Studio", href: META3_STUDIO.path },
  { text: "Resources", href: META3_RESOURCES.path },
  { text: "Blog", href: META3_BLOG.path }
];

export const GENOVATE_NAV: NavItem[] = [
  { text: "Services", href: GENOVATE_SERVICES.path },
  { text: "Studio", href: GENOVATE_STUDIO.path },
  { text: "Resources", href: GENOVATE_RESOURCES.path },
  { text: "Blog", href: GENOVATE_BLOG.path },
  { text: "About", href: GENOVATE_ABOUT.path }
];

export const META3_FOOTER_NAV: FooterNav = {
  company: [
    { text: "About", href: META3_ABOUT.path },
    { text: "Portfolio", href: META3_PORTFOLIO.path },
    { text: "Studio", href: META3_STUDIO.path },
    { text: "Blog", href: META3_BLOG.path },
    { text: "Contact", href: META3_CONTACT.path }
  ],
  resources: [
    { text: "Resource Library", href: META3_RESOURCES.path },
    { text: "Blog", href: META3_BLOG.path }
  ],
  legal: [
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms of Service", href: "/terms" }
  ]
};

export const GENOVATE_FOOTER_NAV: FooterNav = {
  company: [
    { text: "About", href: GENOVATE_ABOUT.path },
    { text: "Services", href: GENOVATE_SERVICES.path },
    { text: "Studio", href: GENOVATE_STUDIO.path },
    { text: "Blog", href: GENOVATE_BLOG.path },
    { text: "Contact", href: GENOVATE_CONTACT.path }
  ],
  resources: [
    { text: "Resource Library", href: GENOVATE_RESOURCES.path },
    { text: "Blog", href: GENOVATE_BLOG.path }
  ],
  legal: [
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms of Service", href: "/terms" }
  ]
};

export const navigationConfig = {
  baseUrl: '/app',
  defaultRoute: '/dashboard',
  brands: {
    genovate: {
      homeUrl: GENOVATE_HOME.path,
      name: 'Genovate',
      logo: '/images/genovate-logo.svg'
    },
    meta3: {
      homeUrl: META3_HOME.path,
      name: 'Meta3 Ventures',
      logo: '/images/meta3-logo.svg'
    }
  },
  meta3Navigation: [
    { text: "About", href: META3_ABOUT.path },
    { text: "Portfolio", href: META3_PORTFOLIO.path },
    { text: "Studio", href: META3_STUDIO.path },
    { text: "Resources", href: META3_RESOURCES.path },
    { text: "Blog", href: META3_BLOG.path }
  ],
  genovateNavigation: [
    { text: "Services", href: GENOVATE_SERVICES.path },
    { text: "Studio", href: GENOVATE_STUDIO.path },
    { text: "Resources", href: GENOVATE_RESOURCES.path },
    { text: "Blog", href: GENOVATE_BLOG.path },
    { text: "About", href: GENOVATE_ABOUT.path }
  ],
  meta3Footer: {
    mainLinks: [
      { text: "About", href: META3_ABOUT.path },
      { text: "Portfolio", href: META3_PORTFOLIO.path },
      { text: "Studio", href: META3_STUDIO.path },
      { text: "Blog", href: META3_BLOG.path },
      { text: "Contact", href: META3_CONTACT.path }
    ],
    secondaryLinks: [
      { text: "Resource Library", href: META3_RESOURCES.path },
      { text: "Blog", href: META3_BLOG.path }
    ]
  },
  genovateFooter: {
    mainLinks: [
      { text: "About", href: GENOVATE_ABOUT.path },
      { text: "Services", href: GENOVATE_SERVICES.path },
      { text: "Studio", href: GENOVATE_STUDIO.path },
      { text: "Blog", href: GENOVATE_BLOG.path },
      { text: "Contact", href: GENOVATE_CONTACT.path }
    ],
    secondaryLinks: [
      { text: "Resource Library", href: GENOVATE_RESOURCES.path },
      { text: "Blog", href: GENOVATE_BLOG.path }
    ]
  }
};

// Export route collections
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