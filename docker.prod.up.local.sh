#!/bin/sh

docker compose --project-name diploma-project-local \
    --project-directory . \
    --file .docker/prod_local/docker-compose.yml \
    up \
    --remove-orphans \
    --build \
    --detach \
