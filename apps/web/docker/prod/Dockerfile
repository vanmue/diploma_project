FROM node:16-alpine as build-stage

WORKDIR /app

COPY ./package.json ./package-lock.json ./
# RUN npm ci
# COPY ./ .
# RUN npm run build

FROM nginx:1.23.1-alpine as production-stage

ENV NODE_ENV=production

RUN mkdir /app
# COPY --from=build-stage /app/dist /app

COPY ./docker/prod/nginx.conf /etc/nginx/nginx.conf
