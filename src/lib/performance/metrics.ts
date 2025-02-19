export class PerformanceMetrics {
  private static instance: PerformanceMetrics;
  private metrics: Map<string, any[]> = new Map();

  static getInstance(): PerformanceMetrics {
    if (!this.instance) {
      this.instance = new PerformanceMetrics();
    }
    return this.instance;
  }

  trackPageLoad() {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const metrics = {
        dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
        tcpConnection: timing.connectEnd - timing.connectStart,
        serverResponse: timing.responseEnd - timing.requestStart,
        domProcessing: timing.domComplete - timing.domLoading,
        totalPageLoad: timing.loadEventEnd - timing.navigationStart
      };

      this.addMetric('pageLoad', metrics);
    }
  }

  trackResourceLoad() {
    if (window.performance && window.performance.getEntriesByType) {
      const resources = window.performance.getEntriesByType('resource');
      resources.forEach(resource => {
        this.addMetric('resourceLoad', {
          name: resource.name,
          duration: resource.duration,
          size: resource.transferSize
        });
      });
    }
  }

  private addMetric(type: string, data: any) {
    if (!this.metrics.has(type)) {
      this.metrics.set(type, []);
    }
    this.metrics.get(type)?.push({
      timestamp: Date.now(),
      ...data
    });
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }
} 