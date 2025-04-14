import axios from 'axios';

// Set default baseURL
axios.defaults.baseURL = 'http://localhost:8000';

// Important for cookies/session to work cross-domain
axios.defaults.withCredentials = true;

// Add a request interceptor to add the XSRF token to headers
axios.interceptors.request.use(function (config) {
  // Get the XSRF token from the cookie if it exists
  const xsrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
  
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
  }
  
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axios; 