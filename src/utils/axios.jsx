import axios from 'axios';

// Create a new Axios instance with custom configuration
const axiosInstance = axios.create({
  baseURL: 'https://localhost:7281/api/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json', // Set the content type
  },
});

export default axiosInstance;
