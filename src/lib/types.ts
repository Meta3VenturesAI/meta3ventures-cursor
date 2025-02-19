// Common types used across the application
export interface BaseProps {
  title: string;
  description?: string;
}

export interface HeroProps extends BaseProps {
  background?: string;
  pattern?: 'dots' | 'grid' | 'waves';
  align?: 'center' | 'left';
}

export interface ButtonProps {
  text: string;
  href: string;
  type?: 'primary' | 'secondary';
  icon?: boolean;
  onClick?: string;
}

export interface FormProps {
  title?: string;
  subtitle?: string;
  type?: 'contact' | 'demo' | 'partnership';
}

export interface StatusProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  actions?: {
    primary?: ButtonProps;
    secondary?: ButtonProps;
  };
}

export interface NavigationItem {
  text: string;
  href: string;
  external?: boolean;
}

export interface Brand {
  name: string;
  logo: string;
  description: string;
  social: {
    linkedin: string;
    twitter: string;
    medium: string;
  };
}