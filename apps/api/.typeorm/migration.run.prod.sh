#!/bin/sh

# переменные среды не подгружаем из .env, т.к. они инжектированы через docker compose
npx typeorm-ts-node-commonjs \
  $1 \
  "-d" \
  "./.typeorm/config/db.config.ts"
