export const handleError = (error: Error) => {
  console.error('Application error:', error);
  // Add your error reporting service here
  return {
    message: 'An error occurred',
    status: 500
  };
}; 