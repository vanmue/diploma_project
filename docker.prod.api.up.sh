#!/bin/sh

docker compose --project-name diploma-project-api-servers \
    --project-directory . \
    --file .docker/prod/docker-compose.api.yml \
    up \
    --remove-orphans \
    --build \
    --detach \
