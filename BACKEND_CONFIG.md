# Backend Configuration with Environment Variables

This guide explains how to configure backend API URLs using `.env` variables.

## Configuration Files

### `.env` (Development)
```
VUE_APP_BACKEND_URL=http://127.0.0.1/wlwl
VUE_APP_IMAGE_UPLOAD_URL=http://127.0.0.1/wlwl
```

### `.env.production` (Production)
Create a `.env.production` file for production environment:
```
VUE_APP_BACKEND_URL=https://api.yourdomain.com
VUE_APP_IMAGE_UPLOAD_URL=https://api.yourdomain.com
```

### `.env.staging` (Staging)
Create a `.env.staging` file for staging environment:
```
VUE_APP_BACKEND_URL=https://staging-api.yourdomain.com
VUE_APP_IMAGE_UPLOAD_URL=https://staging-api.yourdomain.com
```

## Using Environment Variables in Code

### Option 1: Using the API Config Module (Recommended)

Import and use the API configuration module:

```javascript
import API_CONFIG from '@/config/api.js';

// Get backend endpoint
const url = API_CONFIG.getEndpoint('staffsignin/');
// Result: http://127.0.0.1/wlwl/staffsignin/

const res = await fetch(url, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(data)
});
```

### Option 2: Using Environment Variables Directly

In Vue components:

```vue
<script>
export default {
  data() {
    return {
      backendUrl: process.env.VUE_APP_BACKEND_URL
    }
  },
  methods: {
    async fetchData() {
      const url = `${process.env.VUE_APP_BACKEND_URL}/action/`;
      const res = await fetch(url, { ... });
    }
  }
}
</script>
```

### Option 3: Using vue.config.js Proxy (For Development)

The proxy in `vue.config.js` automatically routes requests:

```javascript
// Development requests to /backend/* are proxied to VUE_APP_BACKEND_URL
const res = await fetch('/backend/staffsignin/', { ... });
// Proxied to: http://127.0.0.1/wlwl/backend/staffsignin/
```

## Refactoring Existing Code

### Before (Hardcoded URLs):
```javascript
const res = await fetch('backend/staffsignin/', { ... });
const res = await fetch('/backend/action/', { ... });
const res = await fetch('/backend/images/upload.php', { ... });
```

### After (Using Environment Variables):
```javascript
import API_CONFIG from '@/config/api.js';

const res = await fetch(API_CONFIG.getEndpoint('staffsignin/'), { ... });
const res = await fetch(API_CONFIG.getEndpoint('action/'), { ... });
const res = await fetch(API_CONFIG.getImageUploadendpoint('images/upload.php'), { ... });
```

## Environment Variable Names

- `VUE_APP_BACKEND_URL` - Main backend API base URL
- `VUE_APP_IMAGE_UPLOAD_URL` - Image upload service URL

**Note:** All environment variables in Vue CLI must be prefixed with `VUE_APP_` to be exposed to the client.

## Building for Different Environments

```bash
# Development (uses .env)
npm run serve

# Production (uses .env.production)
npm run build

# Staging (uses .env.staging)
npm run build -- --mode staging
```

## Common Configurations

### Local Development
```
VUE_APP_BACKEND_URL=http://localhost:8000
VUE_APP_IMAGE_UPLOAD_URL=http://localhost:8000
```

### Docker Compose Development
```
VUE_APP_BACKEND_URL=http://backend-service:8000
VUE_APP_IMAGE_UPLOAD_URL=http://backend-service:8000
```

### Production
```
VUE_APP_BACKEND_URL=https://api.example.com
VUE_APP_IMAGE_UPLOAD_URL=https://api.example.com
```

## Troubleshooting

1. **Variables not loading?**
   - Restart the dev server after modifying `.env`
   - Verify variables start with `VUE_APP_`

2. **CORS errors?**
   - Check backend URL is correct
   - Verify backend CORS headers are configured
   - For dev, ensure vue.config.js proxy is set up

3. **Wrong URL in production?**
   - Create `.env.production` file
   - Rebuild the application
   - Check that VUE_APP_ variables are used (not NODE_ENV specific)
