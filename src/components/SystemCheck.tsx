---
const status = {
  supabase: !!import.meta.env.SUPABASE_URL,
  production: import.meta.env.PROD,
  baseUrl: import.meta.env.SITE
};
---

<div class="system-check">
  <h3>System Status</h3>
  <ul>
    <li>Supabase Connected: {status.supabase ? '✅' : '❌'}</li>
    <li>Environment: {status.production ? 'Production' : 'Development'}</li>
    <li>Base URL: {status.baseUrl}</li>
  </ul>
</div> 