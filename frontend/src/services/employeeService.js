import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'An error occurred';
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred');
    }
  }
);

const employeeService = {
  // Get all employees with pagination and search
  getEmployees: async (page = 1, searchTerm = '') => {
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', 10);
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await api.get(`/employees?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    try {
      const response = await api.get(`/employees/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    try {
      const response = await api.post('/employees', employeeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await api.put(`/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete employee
  deleteEmployee: async (id) => {
    try {
      const response = await api.delete(`/employees/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get employee statistics
  getStats: async () => {
    try {
      const response = await api.get('/employees/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search employees
  searchEmployees: async (searchTerm) => {
    try {
      const response = await api.post('/employees/search', { searchTerm });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get employees by department
  getEmployeesByDepartment: async (department) => {
    try {
      const response = await api.get(`/employees?department=${department}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default employeeService;


