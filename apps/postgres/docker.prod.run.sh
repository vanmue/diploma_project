#!/bin/sh

PREFIX=$1

postgres=$PREFIX-postgres
network=$PREFIX-network

docker stop $postgres
docker rm $postgres
docker run --env-file ./.docker/prod/.env \
    --name $postgres \
    --network $network \
    --restart=on-failure \
    -v /var/lib/postgresql/data/$PREFIX:/var/lib/postgresql/data \
    -d \
    postgres:15
