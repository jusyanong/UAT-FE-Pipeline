# Stage 1 - Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy ONLY package files first to cache dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code (will ignore node_modules because of .dockerignore)
COPY . .
RUN npm run build

# Stage 2 - Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
