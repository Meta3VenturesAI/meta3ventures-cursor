/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly PUBLIC_APM_SERVER_URL: string;
  readonly PUBLIC_SITE_URL: string;
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly MODE: 'development' | 'production' | 'test';
  
  // Private environment variables
  readonly SUPABASE_SERVICE_KEY: string;
  readonly APM_SECRET_TOKEN: string;
  readonly SMTP_HOST: string;
  readonly SMTP_PORT: string;
  readonly SMTP_USER: string;
  readonly SMTP_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}