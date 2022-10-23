#!/bin/sh

PREFIX=$1 # префикс имени образа и контейнера
WEB_EXTERNAL_PORT=$2 # порт веб-сервера

web_container="$PREFIX-web"
web_image="$web_container-image"
network=$PREFIX-network

docker stop $web_container
docker rm $web_container
docker rmi $web_image
docker build -t $web_image -f ./docker/prod/Dockerfile .

docker run -p $WEB_EXTERNAL_PORT:80 \
    --name $web_container \
    --network $network \
    -d \
    $web_image
