#!/bin/sh

#!/bin/sh

WEB_EXTERNAL_PORT=$1 # порт веб-сервера
PREFIX=diploma-project # префикс имени образа и контейнера

root=$(pwd)

# network

api_container="$PREFIX-api" # такое же имя, которое указано в nginx.conf
web_container="$PREFIX-web"
postgres="$PREFIX-postgres"

network="$PREFIX-network"

docker stop $api_container
docker stop $web_container
docker stop $postgres

docker network rm $network
docker network create $network

# postgres

cd $root/apps/postgres
./docker.prod.run.sh $PREFIX

# backend

cd $root/apps/api
./docker.prod.run.sh $PREFIX

# frontend

cd $root/apps/web
./docker.prod.run.sh $PREFIX $WEB_EXTERNAL_PORT

echo 'containers started'

docker ps --all
