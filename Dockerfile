# Stage 1: Build the React static files
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./

# Install ALL dependencies (including devDependencies like Vite)
RUN npm ci

COPY . .

# Now vite will be available to run the build
RUN npm run build

# Stage 2: Serve static files using Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]