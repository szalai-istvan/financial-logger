# Base stage
FROM node:20-alpine AS base
WORKDIR /usr/src/app

# Dependencies stage
FROM base AS dependencies
COPY package*.json ./
RUN npm ci

# Build stage
FROM base AS build
COPY package*.json ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build
# Prune dev dependencies for production
RUN npm prune --production

# Production stage
FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./assets ./assets
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]
