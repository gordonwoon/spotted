import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  // Add any other common configurations here
  // e.g., headers: { "Content-Type": "application/json" },
});

// Add any Axios interceptors here if needed
// e.g., apiClient.interceptors.response.use(...);

export default apiClient;
