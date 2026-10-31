# Practical 11: Containerization with Docker - Diya Shah (D25IT118)
# Multi-stage build for React frontend (Supplementary Problem)
FROM node:18-alpine AS build

WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm install

# Build static production assets
COPY . .
RUN npm run build

# Expose Vite preview port
EXPOSE 5173

# Serve built frontend
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
