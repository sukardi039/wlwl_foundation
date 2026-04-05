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
RUN if [ -f package-lock.json ]; then \
    sed -i 's#https://registry\\.nlark\\.com/#https://registry.npmjs.org/#g' package-lock.json; \
    sed -i 's#https://registry\\.npm\\.taobao\\.org/#https://registry.npmjs.org/#g' package-lock.json; \
    sed -i 's#https://r\\.cnpmjs\\.org/#https://registry.npmjs.org/#g' package-lock.json; \
    fi \
    && npm ci --legacy-peer-deps --include=dev \
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

# Expose port for the application
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000', (res) => {if (res.statusCode !== 200) throw new Error(res.statusCode)})"

# Start the application
CMD ["serve", "-s", "dist", "-l", "5000"]
