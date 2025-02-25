export const trackPageView = (url: string) => {
  // Add your analytics service here
  console.log('Page view:', url);
};

export const trackEvent = (name: string, properties?: Record<string, any>) => {
  // Add your analytics service here
  console.log('Event:', name, properties);
}; 