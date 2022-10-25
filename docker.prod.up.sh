#!/bin/sh

docker compose --project-name diploma-project \
    --project-directory . \
    --file .docker/prod/docker-compose.yml \
    up \
    --remove-orphans \
    --build \
    --detach \
