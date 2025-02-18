# Frontend build
FROM node:18 AS frontend-builder
WORKDIR /client
COPY client/package*.json ./
RUN npm install
COPY client ./
RUN npm run build

# Backend build
FROM node:18-alpine AS backend-builder
WORKDIR /services
COPY services/package*.json ./
RUN npm install
COPY services ./
RUN npx prisma generate
RUN npm run build

# Final container
FROM node:18-alpine
WORKDIR /app
RUN npm install -g pm2
RUN apk add --no-cache nginx
COPY --from=frontend-builder /client/dist /usr/share/nginx/html
COPY --from=backend-builder /services/package*.json ./services/
COPY --from=backend-builder /services/node_modules ./services/node_modules
COPY --from=backend-builder /services/dist ./services/dist
COPY --from=backend-builder /services/prisma ./services/prisma
COPY services/.env ./services/.env
COPY ecosystem.config.js /app/ecosystem.config.js
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 3000
CMD ["pm2-runtime", "start", "/app/ecosystem.config.js"]
