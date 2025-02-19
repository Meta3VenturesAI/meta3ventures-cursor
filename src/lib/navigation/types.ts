```typescript
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
```