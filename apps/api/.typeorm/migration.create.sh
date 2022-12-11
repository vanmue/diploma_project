#!/bin/sh

npx typeorm-ts-node-commonjs \
  "migration:create" \
  "./.typeorm/migrations/$1"
