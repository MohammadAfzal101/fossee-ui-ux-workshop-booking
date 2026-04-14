# 🔌 API INTEGRATION GUIDE

## Overview

The frontend communicates with the Django backend via REST API. All HTTP requests are managed through `src/services/api.js` using Axios.

## Base Configuration

### API URL
```javascript
// Configured in environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api'

// Example endpoints:
// GET  http://127.0.0.1:8000/api/workshops/
// POST http://127.0.0.1:8000/api/auth/login/
// PUT  http://127.0.0.1:8000/api/profile/
```

### Axios Instance
```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
```

## Authentication

### Token Management

#### Setting Token (After Login)
```javascript
// Login succeeds
const response = await authService.login(email, password)
const token = response.data.token

// Store token
localStorage.setItem('authToken', token)
```

#### Using Token (All Requests)
```javascript
// Automatic injection via interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => Promise.reject(error))
```

#### Removing Token (After Logout)
```javascript
localStorage.removeItem('authToken')
localStorage.removeItem('userName')
localStorage.removeItem('userRole')
```

## API Services

### Authentication Service

#### Login
```javascript
import { authService } from '../services/api'

const response = await authService.login(email, password)
// Response: { token: '...', user: { name, role, ... } }
```

**Endpoint:** `POST /auth/login/`  
**Body:** `{ email, password }`  
**Success (200):** Returns token and user data  
**Error (401):** Invalid credentials  

#### Register
```javascript
const data = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secure123',
  phone: '9876543210',
  state: 'Maharashtra',
  role: 'coordinator' // or 'instructor'
}

const response = await authService.register(data)
// Response: { message: 'Registration successful' }
```

**Endpoint:** `POST /auth/register/`  
**Body:** Register form data  
**Success (201):** User created, check email  
**Error (400):** Validation errors  

#### Logout
```javascript
authService.logout()
// Clears token from storage
```

### Workshop Service

#### Get All Workshops
```javascript
const params = {
  page: 1,
  status: 'accepted', // optional: accepted, pending, all
  sort: '-date'       // optional: date, status
}

const response = await workshopService.getWorkshops(params)
// Response: { count, next, previous, results: [...] }
```

**Endpoint:** `GET /workshops/?page=1&status=accepted&sort=-date`  
**Query Params:**
- `page`: Pagination page (default: 1)
- `status`: Filter by status
- `sort`: Sort field (prefix "-" for descending)

#### Get Single Workshop
```javascript
const response = await workshopService.getWorkshop(workshopId)
// Response: { id, title, date, coordinator, ... }
```

**Endpoint:** `GET /workshops/{id}/`  
**Params:** Workshop ID  

#### Create Workshop (Coordinator)
```javascript
const data = {
  title: 'Python Basics',
  type: 'Programming',
  date: '2026-05-15',
  time: '10:00',
  description: 'Learn Python fundamentals',
  prerequisites: 'None'
}

const response = await workshopService.createWorkshop(data)
// Response: { id, ...data, status: 'pending' }
```

**Endpoint:** `POST /workshops/`  
**Body:** Workshop data  
**Success (201):** Workshop created  
**Error (400):** Validation error  

#### Update Workshop
```javascript
const response = await workshopService.updateWorkshop(workshopId, updatedData)
// Response: Updated workshop
```

**Endpoint:** `PUT /workshops/{id}/`  
**Params:** Workshop ID  
**Body:** Updated fields  

### Workshop Types Service

#### Get Workshop Types
```javascript
const response = await workshopService.getWorkshopTypes()
// Response: { results: [ { id, name, duration, ... } ] }
```

**Endpoint:** `GET /workshop-types/`

### Statistics Service

#### Get Statistics
```javascript
const params = {
  startDate: '2026-01-01',
  endDate: '2026-12-31',
  state: 'Maharashtra',        // optional
  workshopType: 'Programming'  // optional
}

const response = await statisticsService.getStatistics(params)
// Response: {
//   total: 161,
//   byState: { Maharashtra: 45, ... },
//   byType: { Python: 52, ... }
// }
```

**Endpoint:** `GET /statistics/?startDate=...&endDate=...&state=...`  

#### Export Statistics (CSV)
```javascript
const params = {
  startDate: '2026-01-01',
  endDate: '2026-12-31'
}

const response = await statisticsService.exportCSV(params)
// Response: Blob (CSV file)

// Download file
const url = window.URL.createObjectURL(response)
const link = document.createElement('a')
link.href = url
link.setAttribute('download', 'statistics.csv')
link.click()
```

**Endpoint:** `GET /statistics/export/?startDate=...&endDate=...`  
**Returns:** CSV file as blob  

### Profile Service

#### Get User Profile
```javascript
const response = await profileService.getProfile()
// Response: {
//   id, name, email, phone, institute,
//   department, position, state, ...
// }
```

**Endpoint:** `GET /profile/`  
**Auth Required:** Yes (Bearer token)  

#### Update Profile
```javascript
const data = {
  name: 'John Updated',
  phone: '9876543210',
  institute: 'IIT Bombay',
  department: 'CSE'
}

const response = await profileService.updateProfile(data)
// Response: Updated user data
```

**Endpoint:** `PUT /profile/`  
**Auth Required:** Yes  
**Body:** Fields to update (only update what changed)  

## Error Handling

### Error Response Format
```javascript
{
  response: {
    status: 400,
    data: {
      detail: "Invalid email format",
      errors: {
        email: ["Enter a valid email"]
      }
    }
  }
}
```

### Error Categories

#### 400 Bad Request
```javascript
// Validation error
try {
  await authService.login(email, password)
} catch (error) {
  const errors = error.response.data.errors
  // { email: ['...'], password: ['...'] }
}
```

#### 401 Unauthorized
```javascript
// Token expired or invalid - Automatic redirect
// Handled by interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

#### 403 Forbidden
```javascript
// User doesn't have permission
// Example: Coordinator trying to create workshop type
```

#### 404 Not Found
```javascript
// Resource doesn't exist
// Example: Workshop with ID 999
```

#### 500 Server Error
```javascript
// Backend error
// Show generic message to user
toast.error('Something went wrong. Please try again.')
```

## Common Usage Examples

### Example 1: Login Flow
```javascript
import { authService } from '../services/api'
import toast from 'react-hot-toast'

async function handleLogin(email, password) {
  try {
    const response = await authService.login(email, password)
    
    // Store auth data
    localStorage.setItem('authToken', response.data.token)
    localStorage.setItem('userName', response.data.user.name)
    localStorage.setItem('userRole', response.data.user.role)
    
    toast.success('Login successful!')
    navigate('/dashboard')
  } catch (error) {
    const message = error.response?.data?.detail || 'Login failed'
    toast.error(message)
  }
}
```

### Example 2: Fetch Workshops
```javascript
import { workshopService } from '../services/api'

useEffect(() => {
  const fetchWorkshops = async () => {
    try {
      setLoading(true)
      const response = await workshopService.getWorkshops({
        status: 'accepted'
      })
      setWorkshops(response.data.results)
    } catch (error) {
      toast.error('Failed to load workshops')
    } finally {
      setLoading(false)
    }
  }
  
  fetchWorkshops()
}, [])
```

### Example 3: Update Profile
```javascript
import { profileService } from '../services/api'

async function handleSave(formData) {
  try {
    setLoading(true)
    const response = await profileService.updateProfile(formData)
    setProfile(response.data)
    toast.success('Profile updated!')
  } catch (error) {
    toast.error('Failed to update profile')
    setErrors(error.response?.data?.errors || {})
  } finally {
    setLoading(false)
  }
}
```

### Example 4: Export CSV
```javascript
async function handleExportCSV() {
  try {
    const response = await statisticsService.exportCSV({
      startDate: '2026-01-01',
      endDate: '2026-12-31'
    })
    
    // Create download link
    const url = window.URL.createObjectURL(response)
    const link = document.createElement('a')
    link.href = url
    link.download = 'statistics.csv'
    link.click()
    window.URL.revokeObjectURL(url)
    
    toast.success('CSV exported successfully')
  } catch (error) {
    toast.error('Failed to export CSV')
  }
}
```

## Request/Response Interceptors

### Request Interceptor (Auto-inject Token)
```javascript
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
```

### Response Interceptor (Handle Errors)
```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    
    // Add more error handling as needed
    return Promise.reject(error)
  }
)
```

## CORS Configuration

### Backend CORS Setup (Django)
```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",      # Dev
    "http://127.0.0.1:5173",
    "https://yourdomain.com",     # Production
]

CORS_ALLOW_CREDENTIALS = True
```

### Frontend Credentials
```javascript
// Axios automatically sends cookies if needed
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true  // Include cookies
})
```

## API Documentation Format

```javascript
/**
 * Fetch all workshops
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {string} params.status - Filter by status
 * @returns {Promise} Workshop list with pagination
 */
workshopService.getWorkshops(params)
```

## Testing API Calls

### Using Browser DevTools
```
1. Open DevTools (F12)
2. Go to Network tab
3. Perform action (login, fetch, etc.)
4. See request/response in Network tab
5. Check status code, headers, body
```

### Using cURL (Command Line)
```bash
# Get workshops
curl -H "Authorization: Bearer TOKEN" \
  http://127.0.0.1:8000/api/workshops/

# Login
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'
```

### Using Postman
1. Create new request
2. Set method and URL
3. Add headers: `Authorization: Bearer TOKEN`
4. Add body (JSON) if POST/PUT
5. Send request
6. Review response

## Pagination

### Paginated Response Format
```javascript
{
  count: 150,              // Total items
  next: "?page=2",         // Next page URL
  previous: null,          // Previous page URL
  results: [...]           // Data for current page
}
```

### Handling Pagination
```javascript
const [page, setPage] = useState(1)

const fetchPage = async (pageNum) => {
  const response = await workshopService.getWorkshops({
    page: pageNum
  })
  setPage(pageNum)
  setWorkshops(response.data.results)
}

// Next page
if (response.data.next) {
  fetchPage(page + 1)
}
```

## Rate Limiting (Future)

If backend implements rate limiting:
```javascript
// Catch rate limit error
if (error.response?.status === 429) {
  toast.error('Too many requests. Please wait.')
}
```

---

**Last Updated**: April 13, 2026  
**Version**: 1.0.0

**See Also:**
- [ARCHITECTURE.md](./ARCHITECTURE.md) - App structure
- [SETUP.md](./SETUP.md) - Installation guide
