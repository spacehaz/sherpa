# Base image: Node 20 on Alpine Linux (minimal distro, ~5MB vs ~900MB for Debian)
FROM node:20-alpine
RUN apk add --no-cache openssl


# All subsequent commands run from /app inside the container
WORKDIR /app

# Copy only manifests first — if source changes but these don't,
# Docker reuses the cached yarn install layer (saves minutes on rebuilds)
COPY package.json yarn.lock ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY packages/shared/package.json ./packages/shared/package.json

# Install all deps (--frozen-lockfile fails if yarn.lock is out of sync)
RUN yarn install --frozen-lockfile

# Copy source after install so code changes don't bust the install cache
COPY apps/backend/ ./apps/backend/
COPY packages/shared/ ./packages/shared/

# Compile shared types — backend imports from @sherpa/shared, so this must run first
RUN yarn workspace @sherpa/shared build

# Generate Prisma Client from schema.prisma — produces type-safe DB methods into node_modules/.prisma/client
RUN cd apps/backend && npx prisma generate

# Compile TypeScript → JavaScript into apps/backend/dist/
RUN yarn workspace backend build

# Shift working directory so CMD runs in the right place and prisma paths resolve correctly
WORKDIR /app/apps/backend

# Documents the port — doesn't open it (docker-compose ports: does that)
EXPOSE 3000

# On container start:
# 1. Apply any pending DB migrations
# 2. Start the compiled app (only runs if migrations succeed)
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]