#!/bin/sh

export $(cat ./.docker/dev/.env | egrep -v '#|^$' | xargs) &&
npx typeorm-ts-node-commonjs \
  $1 \
  "-d" \
  "./.typeorm/config/db.config.ts"
