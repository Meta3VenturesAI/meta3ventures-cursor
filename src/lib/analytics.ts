export const analytics = {
  pageView(url: string) {
    // Implement your analytics service here
    console.log(`Page view: ${url}`);
  },

  event(name: string, properties?: Record<string, any>) {
    // Implement your analytics service here
    console.log(`Event: ${name}`, properties);
  },

  error(error: Error) {
    // Implement your error tracking here
    console.error('Error:', error);
  }
}; 