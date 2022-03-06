FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock load-env.sh .env.example.txt ./
RUN yarn install --frozen-lockfile

FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build
RUN yarn install --production

FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/next-sitemap.js ./
COPY --from=builder /app/tailwind.config.js ./
COPY --from=builder /app/postcss.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000

ENV PORT 3000

ARG WEB_SOCKET_URL
ARG API

ENV API={API:-http://localhost:3280/graphql}
ENV WEB_SOCKET_URL={WEB_SOCKET_URL:-ws://localhost:3280/graphql}

ENV NEXT_TELEMETRY_DISABLED 1
ENV DOCKER_CONTAINER 1
ENV DISABLE_SEO 1

CMD ["npm", "run", "start"]