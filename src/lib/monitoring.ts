import { init as initApm, ApmBase } from '@elastic/apm-rum';
import { onCLS, onFID, onLCP } from 'web-vitals';

export const apm: ApmBase = initApm({
  serviceName: 'meta3ventures-website',
  serverUrl: import.meta.env.PUBLIC_APM_SERVER_URL,
  environment: import.meta.env.MODE,
  logLevel: import.meta.env.MODE === 'development' ? 'debug' : 'error'
});

// Performance monitoring with web-vitals
export function trackPageLoad() {
  if (!window.performance) return;
  
  // Basic page load metrics
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  const ttfb = perfData.responseStart - perfData.navigationStart;
  const domInteractive = perfData.domInteractive - perfData.navigationStart;
  
  const metrics = {
    page_load_time: pageLoadTime,
    time_to_first_byte: ttfb,
    dom_interactive: domInteractive
  };

  // Send basic metrics
  Object.entries(metrics).forEach(([name, value]) => {
    apm.setCustomContext({ [name]: value });
  });

  // Web Vitals metrics
  onCLS((metric) => {
    apm.setCustomContext({ cumulative_layout_shift: metric.value });
  });

  onFID((metric) => {
    apm.setCustomContext({ first_input_delay: metric.value });
  });

  onLCP((metric) => {
    apm.setCustomContext({ largest_contentful_paint: metric.value });
  });

  // Resource timing data
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const resourceMetrics = resources.reduce((acc, resource) => ({
    totalSize: acc.totalSize + (resource.encodedBodySize || 0),
    totalDuration: acc.totalDuration + resource.duration,
    count: acc.count + 1
  }), { totalSize: 0, totalDuration: 0, count: 0 });

  apm.setCustomContext({
    resource_count: resourceMetrics.count,
    total_resource_size: resourceMetrics.totalSize,
    average_resource_load_time: resourceMetrics.count ? resourceMetrics.totalDuration / resourceMetrics.count : 0
  });
}

// Error tracking with enhanced context
export function trackError(error: Error, context?: Record<string, unknown>) {
  const enhancedContext = {
    url: window.location.href,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    ...context
  };
  
  apm.captureError(error);
  apm.setCustomContext(enhancedContext);
}

// Custom metrics with validation
export function trackMetric(
  name: string, 
  value: number, 
  tags?: Record<string, string>
) {
  if (typeof value !== 'number' || isNaN(value)) {
    console.warn(`Invalid metric value for ${name}`);
    return;
  }
  
  apm.setCustomContext({
    [name]: value,
    ...tags,
    timestamp: new Date().toISOString()
  });
}