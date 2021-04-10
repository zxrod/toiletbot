ARG BUILD_BASE_IMAGE=node:14-alpine

FROM ${BUILD_BASE_IMAGE}

RUN echo NODE_ENV ${BUILD_NODE_ENV}

RUN apk add --no-cache \
  autoconf \
  automake \
  bash \
  ca-certificates \
  curl \
  g++ \
  fontconfig \
  libc6-compat \
  libjpeg-turbo-dev \
  libpng-dev \
  make \
  nasm

RUN rm -rf /var/cache/apk/*

USER node

WORKDIR /home/node

COPY --chown=node:node  package.json  ./
COPY --chown=node:node  yarn.lock     ./
COPY --chown=node:node  run.js        ./
COPY --chown=node:node  config.js     ./
COPY --chown=node:node  lib           ./lib
COPY --chown=node:node  modules       ./modules

RUN yarn

CMD node run

