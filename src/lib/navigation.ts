// Navigation types
export interface NavItem {
  text: string;
  href: string;
}

export interface FooterNav {
  company: NavItem[];
  resources: NavItem[];
  legal: NavItem[];
}

// Route constants
const META3_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PORTFOLIO: '/portfolio', 
  STUDIO: '/studio',
  RESOURCES: '/resources',
  BLOG: '/blog',
  CONTACT: '/contact',
  APPLY: '/apply'
} as const;

const GENOVATE_ROUTES = {
  HOME: '/genovate',
  ABOUT: '/genovate/about',
  SERVICES: '/genovate/services',
  STUDIO: '/genovate/studio',
  RESOURCES: '/genovate/resources',
  BLOG: '/genovate/blog',
  CONTACT: '/genovate/contact',
  DEMO: '/schedule-demo'
} as const;

const ROUTES = {
  META3: META3_ROUTES,
  GENOVATE: GENOVATE_ROUTES
} as const;

// Brand switch configuration
const BRAND_SWITCH = {
  meta3: {
    href: '/genovate',
    text: "Switch to GenovateAI",
    icon: "🔄"
  },
  genovate: {
    href: '/',
    text: "Switch to Meta3Ventures",
    icon: "🔄"
  }
} as const;

// Navigation CTA configuration
const NAV_CTA = {
  meta3: {
    text: "Apply for Partnership",
    href: META3_ROUTES.APPLY
  },
  genovate: {
    text: "Schedule a Demo",
    href: GENOVATE_ROUTES.DEMO
  }
} as const;

// Navigation items
const META3_NAV = [
  { text: "About", href: META3_ROUTES.ABOUT },
  { text: "Portfolio", href: META3_ROUTES.PORTFOLIO },
  { text: "Studio", href: META3_ROUTES.STUDIO },
  { text: "Resources", href: META3_ROUTES.RESOURCES },
  { text: "Blog", href: META3_ROUTES.BLOG }
] as const;

// Updated GenovateAI navigation with About first
const GENOVATE_NAV = [
  { text: "About", href: GENOVATE_ROUTES.ABOUT },
  { text: "Services", href: GENOVATE_ROUTES.SERVICES },
  { text: "Studio", href: GENOVATE_ROUTES.STUDIO },
  { text: "Resources", href: GENOVATE_ROUTES.RESOURCES },
  { text: "Blog", href: GENOVATE_ROUTES.BLOG }
] as const;

// Footer navigation
const META3_FOOTER_NAV: FooterNav = {
  company: [
    { text: "About", href: META3_ROUTES.ABOUT },
    { text: "Portfolio", href: META3_ROUTES.PORTFOLIO },
    { text: "Studio", href: META3_ROUTES.STUDIO },
    { text: "Blog", href: META3_ROUTES.BLOG },
    { text: "Contact", href: META3_ROUTES.CONTACT }
  ],
  resources: [
    { text: "Resource Library", href: META3_ROUTES.RESOURCES },
    { text: "Blog", href: META3_ROUTES.BLOG }
  ],
  legal: [
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms of Service", href: "/terms" }
  ]
};

const GENOVATE_FOOTER_NAV: FooterNav = {
  company: [
    { text: "About", href: GENOVATE_ROUTES.ABOUT },
    { text: "Services", href: GENOVATE_ROUTES.SERVICES },
    { text: "Studio", href: GENOVATE_ROUTES.STUDIO },
    { text: "Blog", href: GENOVATE_ROUTES.BLOG },
    { text: "Contact", href: GENOVATE_ROUTES.CONTACT }
  ],
  resources: [
    { text: "Resource Library", href: GENOVATE_ROUTES.RESOURCES },
    { text: "Blog", href: GENOVATE_ROUTES.BLOG }
  ],
  legal: [
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms of Service", href: "/terms" }
  ]
};

export function getBreadcrumbs(pathname: string, brand: 'meta3' | 'genovate'): { text: string; href: string; }[] {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = [];
  
  // Add home
  breadcrumbs.push({
    text: brand === 'meta3' ? 'Meta3Ventures' : 'GenovateAI',
    href: brand === 'meta3' ? '/' : '/genovate'
  });

  // Build path
  let currentPath = '';
  paths.forEach(path => {
    currentPath += `/${path}`;
    breadcrumbs.push({
      text: formatBreadcrumb(path),
      href: currentPath
    });
  });

  return breadcrumbs;
}

function formatBreadcrumb(path: string): string {
  return path
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export {
  META3_ROUTES,
  GENOVATE_ROUTES,
  ROUTES,
  BRAND_SWITCH,
  NAV_CTA,
  META3_NAV,
  GENOVATE_NAV,
  META3_FOOTER_NAV,
  GENOVATE_FOOTER_NAV
};