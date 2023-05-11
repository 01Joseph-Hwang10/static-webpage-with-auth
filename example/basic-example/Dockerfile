# This is an example Dockerfile for a static website
# with authentication using Google OAuth2.0 included in firebase
# Copy this file for your own use
# See README.md for more info

# Change the base image as needed
FROM node:16-alpine as build

# Set working directory
WORKDIR /app

# Generate static documentation files here
# In this example, we use `typedoc` to generate documentation

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build source code
RUN npm run build

FROM josephhwang02/static-webpage-with-auth:latest

# Set working directory
WORKDIR /app

# Copy from build image
# name `public` can be changed to any other name
# just make sure you change `STATIC_FILES_PATH` env variable
# See README.md for more info
COPY --from=build /app/public ./public

# Expose port
# port `3000` can be changed to any other port
# just make sure you change `PORT` env variable
# See README.md for more info
EXPOSE 3000

# Start app
# Do not change this command
CMD node dist/index.js