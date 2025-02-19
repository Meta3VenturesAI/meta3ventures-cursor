import { init as initApm } from '@elastic/apm-rum';

// Initialize APM
export const apm = initApm({
  serviceName: 'meta3ventures-website',
  serverUrl: import.meta.env.PUBLIC_APM_SERVER_URL,
  environment: import.meta.env.MODE
});

// Performance monitoring
export function trackPageLoad() {
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    apm.trackMetric('page_load_time', pageLoadTime);
  }
}

// Error tracking
export function trackError(error: Error, context?: Record<string, any>) {
  apm.captureError(error, {
    custom: context
  });
}

// Custom metrics
export function trackMetric(name: string, value: number, tags?: Record<string, string>) {
  apm.trackMetric(name, value, tags);
}