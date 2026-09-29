# Public Facturance website (facturance.com).
#
# Next.js standalone output, so the runtime image carries the server and only
# the dependencies the build actually traced, rather than the whole
# node_modules tree. The other frontends in this suite are static bundles
# served by nginx; this one renders on the server and therefore runs Node.

FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the browser bundle while it is built,
# so they have to be present here and cannot be supplied at runtime.
#
# Both are public URLs the browser reveals anyway - no secret belongs in a
# build argument, which is recorded in the image history.
#
# The defaults are the production hosts on purpose: an empty value would not be
# nullish, so the website's `?? "http://localhost:5174"` fallback would not fire
# and every client link would silently become a same-origin relative path.
ARG NEXT_PUBLIC_API_BASE_URL=https://api.plus.facturance.com
ARG NEXT_PUBLIC_CLIENT_APP_BASE_URL=https://client.plus.facturance.com
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_CLIENT_APP_BASE_URL=${NEXT_PUBLIC_CLIENT_APP_BASE_URL}
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# The standalone server binds these itself. Nothing is published from the
# container directly; compose maps this port to 127.0.0.1:3104 on the host.
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# `standalone` holds server.js and its traced dependencies. The static assets
# and public/ are deliberately NOT part of that trace and have to be placed
# beside it, or every asset request 404s while the pages still render.
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

USER node

EXPOSE 3000

CMD ["node", "server.js"]
