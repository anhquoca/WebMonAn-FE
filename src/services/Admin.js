import axios from 'axios';

class AdminService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
    });

    this.api.interceptors.request.use((config) => {
      if (this.isAuthenticated()) {
        const token = localStorage.getItem('token');
        config.headers.Authorization = `bearer ${token.replace(/"/g, '')}`;
      }
      return config;
    });
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  login(credentials) {
    return this.api.post('/login', credentials);
  }
}

export const adminService = new AdminService('https://localhost:7243/admin/Admin');
