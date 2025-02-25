# Deployment Guide

## Prerequisites
- Node.js 18 or higher
- npm 7 or higher
- Supabase account and project
- Netlify account

## Environment Variables
Required environment variables:
```env
PUBLIC_SUPABASE_URL=your-supabase-url
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
PUBLIC_APM_SERVER_URL=your-apm-server-url
```

## Deployment Steps
1. **Build and Test Locally**
   ```bash
   npm install
   npm run typecheck
   npm run test
   npm run build
   ```

2. **Pre-deployment Checklist**
   - [ ] All tests passing
   - [ ] TypeScript types checking
   - [ ] Environment variables configured
   - [ ] Database migrations applied
   - [ ] Security headers verified
   - [ ] Performance metrics enabled

3. **Deployment Process**
   - Deployments are automated via Netlify
   - Merges to `main` branch trigger production deployments
   - Preview deployments are created for pull requests

4. **Post-deployment Verification**
   - Verify APM metrics are recording
   - Check all API endpoints are responding
   - Validate authentication flows
   - Review performance metrics
   - Test critical user paths

## Monitoring
- Application performance is monitored via Elastic APM
- Error tracking is enabled
- Custom metrics track key business KPIs

## Rollback Procedure
1. Access Netlify dashboard
2. Select the site
3. Go to "Deploys" tab
4. Click "Published Deploy"
5. Select previous working deploy
6. Click "Publish deploy"
