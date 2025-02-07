FROM node:18-bullseye as buildimage
# Use bullseye, because python 3.11 causes problems. Bullseye has python 3.9

RUN  export DEBIAN_FRONTEND=noninteractive && apt-get update \
  && apt-get install --no-install-recommends --no-install-suggests -y \
  git python3

ENV NODE_OPTIONS="--openssl-legacy-provider --max-old-space-size=8192"

WORKDIR /opt/oskari

COPY package.json ./
# Skip package--lock...

RUN npm install

COPY applications ./applications
COPY bundles ./bundles
COPY packages ./packages

COPY .storybook ./.storybook
COPY .eslintrc.js ./

ARG BUILD_TARGET=build
RUN npm run $BUILD_TARGET



