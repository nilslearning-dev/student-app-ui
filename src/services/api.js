import axios from 'axios';

// Dynamically construct the API base URL based on current host
const getBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // Uses the current browser IP/domain automatically
  const host = window.location.hostname;
  return `http://${host}:8081/api`;
};

const API = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;