# 🏗️ ARCHITECTURE & PROJECT STRUCTURE

## High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│              React Application (SPA)                │
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐   │
│  │         React Router                        │   │
│  │  Handles navigation between pages           │   │
│  └─────────────────────────────────────────────┘   │
│               ↓ ↓ ↓                                 │
│  ┌─────────────────────────────────────────────┐   │
│  │   Page Components (7 pages)                 │   │
│  │  - Login, Register, Dashboard, etc.         │   │
│  └─────────────────────────────────────────────┘   │
│               ↓ ↓ ↓                                 │
│  ┌─────────────────────────────────────────────┐   │
│  │   Reusable Components                       │   │
│  │  - Header, Navigation, Footer, Cards, etc.  │   │
│  └─────────────────────────────────────────────┘   │
│               ↓ ↓ ↓                                 │
│  ┌─────────────────────────────────────────────┐   │
│  │   Services Layer (API)                      │   │
│  │  - Axios HTTP client & endpoints            │   │
│  └─────────────────────────────────────────────┘   │
│               ↓                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │   Django Backend API                        │   │
│  │  - REST endpoints for authentication        │   │
│  │  - Workshop, Statistics, Profile data      │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App (Routing)
├── Login (Public)
├── Register (Public)
└── Layout (Protected Routes)
    ├── Header
    │   ├── Logo
    │   ├── Navigation (Desktop)
    │   └── User Dropdown Menu
    ├── Navigation (Mobile/Sidebar)
    │   └── Nav Items
    ├── Main Content
    │   ├── Dashboard
    │   │   ├── Stats Cards
    │   │   ├── Filter Tabs
    │   │   └── Workshop List/Table
    │   ├── Statistics
    │   │   ├── Filters
    │   │   ├── Charts
    │   │   └── Summary
    │   ├── Profile
    │   │   └── Form
    │   ├── WorkshopDetails
    │   │   ├── Info
    │   │   ├── Comments
    │   │   └── Actions
    │   └── NotFound
    └── Footer
```

## File Organization By Purpose

### Pages (User Screens)
```
pages/
├── Login.jsx              # Authentication entry point
├── Register.jsx           # New user registration
├── Dashboard.jsx          # Main user hub (workshops list)
├── Statistics.jsx         # Analytics & reporting
├── Profile.jsx            # User settings & info
├── WorkshopDetails.jsx    # Individual workshop page
└── NotFound.jsx           # 404 error page
```

**Characteristics:**
- Full-page components
- Handle routing and params
- Manage page-level state
- Include multiple child components

### Components (Reusable Pieces)

**Layout Components:**
```
components/Layout/
├── Layout.jsx             # Main wrapper with sidebar
├── Header.jsx             # Top navigation bar
├── Navigation.jsx         # Sidebar/mobile nav
└── Footer.jsx             # Bottom section
```

**Common Components (Prepared for future):**
```
components/common/
├── FormInput.jsx          # Reusable form field (optional)
├── Card.jsx               # Card container (optional)
└── Button.jsx             # Custom button (optional)
```

**Characteristics:**
- Reusable across pages
- Accept props for customization
- Self-contained functionality
- Focused responsibility

### Services (API & Logic)
```
services/
└── api.js                 # Axios setup, API endpoints, auth handling
```

**Responsibilities:**
- HTTP client configuration
- Request/response interceptors
- Authentication token management
- API endpoint definitions
- Error handling

### Configuration Files
```
src/
├── App.jsx                # Router & route definitions
├── main.jsx               # Entry point
└── index.css              # Global styles & Tailwind

root/
├── vite.config.js         # Vite build configuration
├── tailwind.config.js     # Tailwind design tokens
├── postcss.config.js      # PostCSS plugins
├── eslint.config.js       # Code quality rules
└── .env                   # Environment variables
```

## Data Flow

### Authentication Flow
```
1. User submits login form
   └─→ Login.jsx validates input
   
2. API call
   └─→ services/api.js → POST /auth/login/
   
3. Response handling
   └─→ Store token in localStorage
   └─→ Store user info (name, role)
   └─→ Redirect to dashboard
   
4. Navigation
   └─→ Protected routes check token
   └─→ Route to appropriate page
```

### Workshop Data Flow
```
1. Dashboard loads
   └─→ Dashboard.jsx mounts
   
2. Fetch workshops
   └─→ services/api.js → GET /workshops/?params
   
3. Response received
   └─→ setState(workshops)
   
4. Render
   └─→ Map workshops to rows/cards
   └─→ Apply filters & sorting
   └─→ Display in table/cards
```

### User Interaction Flow
```
1. User clicks button
   └─→ onClick handler triggered
   
2. Event handling
   └─→ Validate user input
   └─→ Show loading state
   
3. API call
   └─→ Send request to backend
   
4. Response
   └─→ Success: Update state, show toast
   └─→ Error: Display error message
```

## State Management

### Local State (using `useState`)
```javascript
const [workshops, setWorkshops] = useState([])
const [loading, setLoading] = useState(false)
const [filter, setFilter] = useState('all')
const [errors, setErrors] = useState({})
```

### Global State (localStorage)
```javascript
localStorage.setItem('authToken', token)
localStorage.setItem('userName', userName)
localStorage.setItem('userRole', role)
```

### When to Use What:
- **localStorage**: Authentication data, user preferences
- **useState**: Form inputs, UI state, component data
- **Future**: Context API for deeper nesting (if needed)
- **Not Using**: Redux (overkill for this app)

## Routing Structure

```
/
├── /login                  # Login page (public)
├── /register              # Registration page (public)
├── /dashboard             # Main dashboard (protected)
├── /statistics            # Analytics page (protected)
├── /workshop/:id          # Workshop details (protected)
├── /profile               # User profile (protected)
└── *                      # 404 Not Found (public)
```

**Route Protection:**
- Login/Register: Redirect to dashboard if already logged in
- Protected routes: Redirect to login if no token
- Implementation: Check localStorage['authToken'] before rendering

## Styling Strategy

### Tailwind CSS Utility-First
```css
className="flex items-center gap-4 p-6 bg-white rounded-lg shadow"
```

**Benefits:**
- No CSS filename collisions
- Smaller total bundle size
- Responsive utilities built-in
- Consistent design tokens

### Responsive Breakpoints
```javascript
// Mobile first by default
className="block"                    // All screens

// Tablet (640px+)
className="hidden md:block"          // Tablet and up

// Desktop (1024px+)
className="grid-cols-1 lg:grid-cols-4"  // Desktop

// Extra Large (1280px+)
className="hidden xl:block"
```

## Performance Considerations

### Code Splitting
- React Router lazy loading ready
- Each page is separate component
- Future: Can implement `React.lazy()` per route

### Asset Optimization
- Tailwind CSS purges unused styles
- Lucide icons are tree-shakeable
- Vite handles asset optimization

### Caching Strategy
```javascript
// HTTP requests via api.js
// Response caching not implemented (stateless)
// Frontend caching: localStorage for auth data
```

## Error Handling

### Global Error Handler
```javascript
// In api.js interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error)
  }
)
```

### Page-Level Error Handling
```javascript
try {
  const data = await apiCall()
  setState(data)
} catch (error) {
  setErrors({ message: error.message })
  toast.error('Failed to load data')
}
```

### User Feedback
- Toast notifications (react-hot-toast)
- Form validation errors inline
- Loading states for async operations

## Component Composition Patterns

### Presentational Component
```javascript
function UserCard({ name, email, onEdit }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{email}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  )
}
```

### Container Component
```javascript
function UserProfile() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetchUser().then(setUser)
  }, [])
  
  return <UserCard {...user} onEdit={handleEdit} />
}
```

## Dependency Injection

### API Service Injection
```javascript
// Direct import in components
import { workshopService } from '../services/api'

// Usage
const data = await workshopService.getWorkshops()
```

**Alternative (for testing):**
- Could pass as prop
- Could use Context API
- Could use React Query (if added later)

## Future Architecture Improvements

### When to Add:
1. **Context API**: If passing props through 3+ levels
2. **React Query**: If complex caching needed
3. **Redux**: If app grows significantly
4. **TypeScript**: For type safety
5. **Storybook**: For component documentation
6. **Testing**: Jest + React Testing Library

### Current: KISS Principle
- Keep It Simple, Stupid
- No premature optimization
- Add patterns only when needed
- Current approach works well for app size

---

**Last Updated**: April 13, 2026  
**Version**: 1.0.0
