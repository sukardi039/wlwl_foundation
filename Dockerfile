# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Avoid npm 10.x instability seen in CI logs ("Exit handler never called").
RUN npm install -g npm@9.9.4

# Force public npm registry in CI environments.
RUN npm config set registry https://registry.npmjs.org/

# Copy package files
COPY package*.json ./

# Install dependencies
RUN rm -f package-lock.json \
    && npm install --legacy-peer-deps --include=dev \
    && test -x node_modules/.bin/vue-cli-service

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage - using Nginx for better performance
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Reuse VUE_APP_BACKEND_URL at runtime when BACKEND_ORIGIN is not set.
COPY docker-entrypoint.d/40-backend-origin.envsh /docker-entrypoint.d/40-backend-origin.envsh
RUN chmod +x /docker-entrypoint.d/40-backend-origin.envsh

# Copy nginx template (rendered by nginx entrypoint with env vars)
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy built app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose ports (80 preferred; 3000 for platform compatibility)
EXPOSE 80 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Start nginx (require BACKEND_ORIGIN or VUE_APP_BACKEND_URL to be set)
ENTRYPOINT ["/bin/sh", "-c", "if [ -z \"${BACKEND_ORIGIN}${VUE_APP_BACKEND_URL}\" ]; then echo 'ERROR: BACKEND_ORIGIN or VUE_APP_BACKEND_URL must be set' >&2; exit 1; fi; exec nginx -g 'daemon off;'"]
