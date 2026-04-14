# 🚀 SETUP & INSTALLATION GUIDE

## Prerequisites

- **Node.js**: v16 or higher
- **npm**: v7 or higher
- **Git**: For version control
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## Quick Start

### 1. Clone or Navigate to Project

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages from `package.json`:
- React 19+
- Vite 5+
- Tailwind CSS 3.4+
- React Router v6
- Axios
- Lucide React (icons)
- React Hot Toast (notifications)

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

### 4. Build for Production

```bash
npm run build
```

Optimized build output goes to `dist/` directory

### 5. Preview Production Build

```bash
npm run preview
```

## Environment Configuration

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://127.0.0.1:8000/api

# Optional: Analytics
VITE_SENTRY_DSN=
VITE_GA_ID=

# Optional: Features
VITE_ENABLE_PWA=false
VITE_ENABLE_DARK_MODE=false
```

## Project Structure

```
frontend/
├── src/
│   ├── pages/                    # Full-page components
│   │   ├── Login.jsx            # Login page
│   │   ├── Register.jsx         # Registration page
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── Statistics.jsx       # Statistics page
│   │   ├── Profile.jsx          # User profile
│   │   ├── WorkshopDetails.jsx  # Workshop details
│   │   └── NotFound.jsx         # 404 page
│   │
│   ├── components/              # Reusable components
│   │   ├── Layout/
│   │   │   ├── Layout.jsx      # Main layout wrapper
│   │   │   ├── Header.jsx      # Top header
│   │   │   ├── Navigation.jsx  # Sidebar navigation
│   │   │   └── Footer.jsx      # Footer
│   │   └── common/             # Common components
│   │
│   ├── services/                # API & utilities
│   │   └── api.js              # Axios instance & endpoints
│   │
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # Entry point
│   ├── index.css               # Tailwind CSS + custom styles
│   └── assets/                 # Static assets
│
├── public/                      # Static files
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── eslint.config.js            # ESLint rules
│
└── dist/                        # Production build (generated)
```

## Available npm Scripts

### Development

```bash
npm run dev
# Start dev server with hot module replacement
# Runs on http://localhost:5173
```

### Production Build

```bash
npm run build
# Create optimized production build
# Output: dist/ directory
```

### Preview Production Build

```bash
npm run preview
# Preview production build locally
# Useful before deployment
```

### Linting

```bash
npm run lint
# Check code with ESLint
# Helps maintain code quality
```

## Troubleshooting Installation

### Port Already in Use

If port 5173 is already in use:

```bash
npm run dev -- --port 3000
```

### Dependencies Installation Issues

If you encounter dependency errors:

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock
rm -r node_modules
rm package-lock.json

# Reinstall
npm install
```

### Native Binding Errors

If you get native binding errors:

```bash
# Rebuild dependencies
npm rebuild

# Or reinstall completely
rm -r node_modules package-lock.json
npm install
```

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full support |
| Firefox | 88+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 90+ | ✅ Full support |
| IE 11 | Any | ❌ Not supported |

## First-Time Setup Checklist

- [ ] Node.js v16+ installed
- [ ] Cloned/navigated to frontend directory
- [ ] Ran `npm install` successfully
- [ ] Created `.env` file with API URL
- [ ] Started dev server with `npm run dev`
- [ ] Opened http://localhost:5173 in browser
- [ ] Saw app loading without errors
- [ ] Tested responsive design (DevTools)

## Next Steps

1. **Read Architecture**: Check [ARCHITECTURE.md](./ARCHITECTURE.md) for project structure
2. **Design Principles**: See [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md) for decisions
3. **Component Docs**: Visit [COMPONENTS.md](./COMPONENTS.md) for component details
4. **API Guide**: Check [API_GUIDE.md](./API_GUIDE.md) for API integration
5. **Accessibility**: Review [ACCESSIBILITY.md](./ACCESSIBILITY.md) for a11y features
6. **Performance**: Check [PERFORMANCE.md](./PERFORMANCE.md) for optimization
7. **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup

## Performance Tips

### Development
- Use Chrome DevTools Performance tab
- Check Network tab for bundle sizes
- Monitor Console for warnings/errors

### Production
- Always run `npm run build` before deploying
- Use `npm run preview` to test production build locally
- Check Lighthouse scores
- Enable gzip compression on server

## Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all packages (careful!)
npm update

# Update specific package
npm install package-name@latest
```

## Getting Help

- **Documentation**: Read all `.md` files in frontend/
- **Errors**: Check browser console for error messages
- **Issues**: Search GitHub issues
- **Community**: Check React and Vite documentation

---

**Last Updated**: April 13, 2026  
**Version**: 1.0.0
