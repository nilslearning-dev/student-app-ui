# Stage 1: Build the React static files
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Clean npm install that immediately clears temporary cache archives
RUN npm ci --no-audit --no-fund && npm cache clean --force

# Copy source files
COPY . .

# Build static assets
RUN npm run build

# Stage 2: Serve static files using Nginx
FROM nginx:alpine

# Copy built assets to Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]