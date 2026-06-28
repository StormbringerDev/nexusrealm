# syntax=docker/dockerfile:1

# Base image with Node.js
FROM node:22-alpine AS base

# ===========================================
# Dependencies stage - install all packages
# ===========================================
FROM base AS deps

# Install build tools needed for native dependencies (better-sqlite3)
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat

WORKDIR /app

# Enable pnpm via corepack (pnpm version will be determined by pnpm-lock.yaml or latest compatible)
RUN corepack enable && corepack prepare pnpm@10 --activate

# Copy dependency files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install all dependencies (including devDependencies so drizzle-kit is available for migrations)
RUN pnpm install --frozen-lockfile

# ===========================================
# Builder stage - build the Next.js app
# ===========================================
FROM base AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10 --activate

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the source code
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN pnpm build

# ===========================================
# Runner / Production stage
# ===========================================
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Re-enable pnpm in production image (needed for running drizzle-kit migrate)
RUN corepack enable && corepack prepare pnpm@10 --activate

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy Drizzle files needed for migrations
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/envConfig.ts ./envConfig.ts

# Create persistent data directory for SQLite database and set ownership
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

# Switch to non-root user
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
# Default SQLite location inside the container (override via docker-compose or -e if needed)
ENV DATABASE_URL="file:/app/data/nexusrealm.db"

# Run migrations on container start (safe to run multiple times) then start the app.
# This ensures the database schema is always up to date when the container starts.
CMD ["sh", "-c", "pnpm drizzle-kit migrate && exec pnpm start"]
