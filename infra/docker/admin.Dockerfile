FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS pruner
COPY . .
RUN pnpm dlx turbo prune @awt/admin --docker

FROM base AS builder
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
ENV STANDALONE=true
RUN pnpm --filter @awt/db exec prisma generate
RUN pnpm turbo build --filter=@awt/admin

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3001 HOSTNAME=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=builder --chown=app:app /app/apps/admin/.next/standalone ./
COPY --from=builder --chown=app:app /app/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=builder --chown=app:app /app/apps/admin/public ./apps/admin/public
USER app
EXPOSE 3001
CMD ["node", "apps/admin/server.js"]

