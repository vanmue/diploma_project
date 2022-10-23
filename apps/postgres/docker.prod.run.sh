#!/bin/sh

PREFIX=$1

postgres=$PREFIX-postgres
network=$PREFIX-network

docker stop $postgres
docker rm $postgres
docker run --env-file .env \
    --name $postgres \
    --network $network \
    -v /var/lib/postgresql/data/$PREFIX:/var/lib/postgresql/data \
    -d \
    postgres
