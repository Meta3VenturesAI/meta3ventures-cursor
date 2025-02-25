export interface NavItem {
  text: string;
  href: string;
}

export interface FooterNav {
  company: NavItem[];
  resources: NavItem[];
  legal: NavItem[];
}

export interface BrandSwitch {
  href: string;
  text: string;
  icon: string;
}

export interface Route {
  path: string;
  name: string;
  component: string;
  meta?: {
    requiresAuth?: boolean;
    roles?: string[];
  };
}

export type Brand = 'meta3' | 'genovate';

export interface NavigationLink {
  text: string;
  href: string;
}