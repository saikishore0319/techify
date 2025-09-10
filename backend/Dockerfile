FROM node:18-slim

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the rest of the backend code
COPY . .

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server.js"] 
