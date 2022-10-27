FROM node:16 as build-stage

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY ./ .
RUN npm run build

FROM nginx:1.23.1-alpine as production-stage

COPY ./.docker/prod_local/nginx.conf /etc/nginx/nginx.conf

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app
COPY --from=build-stage /app/build ./

# подключение каталога файлов общего доступа из сервера api

VOLUME /app/uploads
