```typescript
import type { NavItem, FooterNav } from './types';
import { META3_ROUTES, GENOVATE_ROUTES } from './routes';

export const BRAND_SWITCH = {
  meta3: {
    href: GENOVATE_ROUTES.HOME,
    text: "Switch to GenovateAI",
    icon: "🔄"
  },
  genovate: {
    href: META3_ROUTES.HOME,
    text: "Switch to Meta3Ventures",
    icon: "🔄"
  }
} as const;

export const META3_NAV: NavItem[] = [
  { text: "About", href: META3_ROUTES.ABOUT },
  { text: "Portfolio", href: META3_ROUTES.PORTFOLIO },
  { text: "Studio", href: META3_ROUTES.STUDIO },
  { text: "Resources", href: META3_ROUTES.RESOURCES },
  { text: "Blog", href: META3_ROUTES.BLOG }
];

export const GENOVATE_NAV: NavItem[] = [
  { text: "Services", href: GENOVATE_ROUTES.SERVICES },
  { text: "Studio", href: GENOVATE_ROUTES.STUDIO },
  { text: "Resources", href: GENOVATE_ROUTES.RESOURCES },
  { text: "Blog", href: GENOVATE_ROUTES.BLOG },
  { text: "About", href: GENOVATE_ROUTES.ABOUT }
];

export const META3_FOOTER_NAV: FooterNav = {
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

export const GENOVATE_FOOTER_NAV: FooterNav = {
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
```