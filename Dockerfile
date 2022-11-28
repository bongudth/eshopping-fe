FROM node:14.17.3 AS BUILD_IMAGE

ENV APP_ROOT /nuxt

RUN mkdir ${APP_ROOT}
ADD package.json ${APP_ROOT}
ADD yarn.lock ${APP_ROOT}
WORKDIR ${APP_ROOT}
RUN yarn install --network-timeout 1000000

ADD . ${APP_ROOT}

RUN yarn build

FROM node:14.17.3-alpine

WORKDIR /nuxt
# copy from build image
COPY --from=BUILD_IMAGE /nuxt .

ENV HOST 0.0.0.0
