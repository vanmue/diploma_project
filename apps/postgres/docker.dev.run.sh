#!/bin/sh

PREFIX=$1

postgres=$PREFIX-postgres

docker stop $postgres
docker rm $postgres
docker run --env-file ./docker/dev/.env \
    --name $postgres \
    -d \
    -p 5432:5432 \
    -v /var/lib/postgresql/data/diploma-project:/var/lib/postgresql/data \
    postgres
 

