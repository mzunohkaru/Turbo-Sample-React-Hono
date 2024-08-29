FROM node:20.12.1-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV $NODE_ENV
RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm install turbo --global
RUN turbo prune client --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --no-frozen-lockfile
COPY --from=builder /app/out/full/ .
RUN pnpm turbo build --filter=client

FROM base AS development
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --from=installer --chown=node:node /app .
RUN pnpm install --no-frozen-lockfile
CMD [ "pnpm", "turbo", "dev:docker", "--filter", "client" ]

FROM nginx:alpine AS production
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=installer /app/apps/client/dist /usr/share/nginx/html
EXPOSE 80/tcp
CMD [ "/usr/sbin/nginx", "-g", "daemon off;" ]
