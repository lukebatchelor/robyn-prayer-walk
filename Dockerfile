FROM node:18-alpine as builder
WORKDIR /app
COPY prisma ./
COPY yarn.lock package.json ./
RUN yarn install --frozen-lockfile
COPY . .
ENV SKIP_ENV_VALIDATION=true
ENV DISABLE_ESLINT_PLUGIN=true
RUN yarn build

FROM node:18-alpine as runner
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/next.config.mjs .
COPY --from=builder /app/.eslintrc.cjs .
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]