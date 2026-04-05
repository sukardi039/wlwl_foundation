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

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve package to serve the built app
RUN npm install -g serve

# Copy built app from builder stage
COPY --from=builder /app/dist ./dist

# Dokploy and other platforms often route to container port from PORT env.
ENV PORT=3000

# Expose default runtime port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "const p=process.env.PORT||3000; require('http').get('http://localhost:'+p, (res) => {if (res.statusCode < 200 || res.statusCode >= 400) throw new Error(res.statusCode)})"

# Start the application
CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:${PORT:-3000}"]
