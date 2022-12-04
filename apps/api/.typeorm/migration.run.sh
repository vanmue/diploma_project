#!/bin/sh

if [ $NODE_ENV != "production" ]; then
  export $(cat ./.docker/dev/.env | egrep -v '#|^$' | xargs)
fi

npx typeorm-ts-node-commonjs \
  $1 \
  "-d" \
  "./.typeorm/config/data.source.ts"
