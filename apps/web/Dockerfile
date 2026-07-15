# syntax=docker/dockerfile:1
FROM node:22-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# --- Pruner stage ---
FROM base AS pruner
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PNPM_HOME/bin:$PATH"
RUN pnpm add -g turbo
COPY . .
RUN turbo prune web --docker

# --- Builder stage ---
FROM base AS builder

COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN pnpm turbo build --filter=web

# --- Runner stage ---
FROM base AS runner

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

CMD ["node", "apps/web/server.js"]
