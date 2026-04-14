import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => Promise.reject(error))

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authService = {
  login: (email, password) => api.post('/auth/login/', { email, password }),
  register: (data) => api.post('/auth/register/', data),
  logout: () => { localStorage.removeItem('authToken') },
}

export const workshopService = {
  getWorkshops: (params) => api.get('/workshops/', { params }),
  getWorkshop: (id) => api.get(`/workshops/${id}/`),
  createWorkshop: (data) => api.post('/workshops/', data),
  updateWorkshop: (id, data) => api.put(`/workshops/${id}/`, data),
  getWorkshopTypes: () => api.get('/workshop-types/'),
}

export const statisticsService = {
  getStatistics: (params) => api.get('/statistics/', { params }),
  exportCSV: (params) => api.get('/statistics/export/', { params, responseType: 'blob' }),
}

export const profileService = {
  getProfile: () => api.get('/profile/'),
  updateProfile: (data) => api.put('/profile/', data),
}

export default api
