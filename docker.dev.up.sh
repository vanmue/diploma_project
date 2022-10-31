#!/bin/sh

docker compose --project-name diploma-project-dev \
    --project-directory . \
    --file .docker/dev/docker-compose.yml \
    up \
    --remove-orphans \
    --build \
    --detach \
