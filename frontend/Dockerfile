# ---------- Stage 1: Build the React app ----------
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and lockfile first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the React app for production
RUN npm run build
# (For Create React App the build output is in /app/build, for Vite it’s in /app/dist)

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:alpine

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx config (with /api reverse proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build artifacts from the first stage
# Change /app/dist to /app/build if using CRA
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
