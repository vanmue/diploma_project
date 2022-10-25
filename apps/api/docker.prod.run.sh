#!/bin/sh

PREFIX=$1 # префикс имени образа, контейнера и сети

api_container="$PREFIX-api" # такое же имя, которое указано в nginx.conf
api_image="$api_container-image"
network="$PREFIX-network"

docker stop $api_container
docker rm $api_container
docker rmi $api_image
docker build -t $api_image -f ./.docker/prod/Dockerfile .

docker run --env-file ./.docker/prod/.env \
    --name $api_container \
    --network $network \
    --restart=on-failure \
    -d \
    $api_image
