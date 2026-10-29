FROM node:18-alpine AS builder

WORKDIR /app

RUN npm install -g npm@9.9.4 \
    && npm config set registry https://registry.npmjs.org/

COPY package*.json ./
RUN npm install --legacy-peer-deps --include=dev \
    && test -x node_modules/.bin/vue-cli-service

COPY . .
RUN npm run build

FROM nginx:alpine

ENV NGINX_ENVSUBST_FILTER=^(BACKEND_ORIGIN)$

RUN rm /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.d/15-backend-origin.envsh /docker-entrypoint.d/15-backend-origin.envsh
RUN chmod +x /docker-entrypoint.d/15-backend-origin.envsh
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1:80/ || exit 1