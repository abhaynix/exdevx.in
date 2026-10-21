# Multi-stage build for self-hosted ExDevX static deployment
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy project files and build static SSG pages
COPY . .
RUN npm run build

# Production static server stage using lightweight Nginx
FROM nginx:alpine AS runner

# Copy prerendered static pages
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx server block
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    gzip on; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml; \
    location / { \
        try_files $uri $uri/ =404; \
    } \
    error_page 404 /404.html; \
    location ~* \.(?:ico|css|js|gif|jpe?g|png|svg|woff2?)$ { \
        expires 6M; \
        access_log off; \
        add_header Cache-Control "public, max-age=15552000, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
