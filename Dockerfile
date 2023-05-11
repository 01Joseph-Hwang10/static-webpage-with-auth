# Pull node image as build
FROM node:16-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build app and docs
RUN npm run build

# Install only production dependencies
RUN npm prune --production

# Create another build stage
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy from build image
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
