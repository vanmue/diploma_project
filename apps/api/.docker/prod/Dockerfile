FROM node:16 as build-stage

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY ./ .

RUN npm run build
RUN npm prune --production

FROM node:16-alpine as production-stage

# ENV NODE_ENV=production
# Для отладки разработки
ENV NODE_ENV=development 

WORKDIR /app

COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/dist/ ./

# Для выполнения миграций
COPY --from=build-stage /app/.typeorm/ ./.typeorm
COPY --from=build-stage /app/.typeorm/ ./.docker

CMD ["node", "main.js"]

