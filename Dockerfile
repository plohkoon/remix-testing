# base node image
FROM node:16-bullseye-slim as base

# Install openssl for Prisma
RUN apt-get update && \
  apt-get install -y openssl \
  ca-certificates

# Install all node_modules, including dev dependencies
FROM base as deps

RUN mkdir -p /app/fly
WORKDIR /app

ADD package.json yarn.lock ./
ADD fly/package.json ./fly/
RUN yarn install

# Setup production node_modules
FROM base as production-deps

RUN mkdir -p /app/fly
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json yarn.lock ./
ADD fly/package.json ./fly/
RUN yarn install --prod

# Build the app
FROM base as build

RUN mkdir -p /app/fly
WORKDIR /app
ADD package.json yarn.lock ./
ADD fly/package.json ./fly/

RUN yarn install

ENV NODE_ENV=production

# If we're using Prisma, uncomment to cache the prisma schema
ADD prisma .
RUN npx prisma generate

ADD . .
RUN yarn workspace fly build

# Finally, build the production image with minimal footprint
FROM base

ENV NODE_ENV=production

RUN mkdir -p /app/fly
WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=production-deps /app/fly/node_modules /app/fly/node_modules

# Uncomment if using Prisma
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma

COPY --from=build /app/fly/build /app/fly/build
COPY --from=build /app/fly/public /app/fly/public
ADD . .

CMD ["yarn", "workspace", "fly", "start"]
