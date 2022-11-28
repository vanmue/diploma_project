# diploma_project

## Создание мастера

1. Создать пользователя POST /api/v1/users/
2. 

## Каталог маршрутов

см. https://vanmue.ru:8001/swagger

## Dev-среда

### docker compose

`./docker.dev.up.sh`

### вход в Adminer

- url: `http://localhost:8080`
- сервер базы данных: `diploma-project-postgres-dev`
- имя пользователя: `postgres`
- пароль: `postgres`

## Развертывание в production

### Конфигурирование

1. Хранение базы данных на хостовой машине - директория:

`/storage/postgresql/data/`

2. Имя пользователя и пароль к базе данных - в файле:

`apps/postgres/.docker/prod/.env`

3. Реквизиты подключения API-сервера к базе данных - в файле:

`apps/api/.docker/prod/.env`

### Пересборка образов и контейнеров, запуск контейнеров

1. Сценарий сборки контейнеров с префиксом имен `diploma-project`

- старт Nginx на порту `8001`:

`./docker.prod.up.sh`

### Вход в Adminer

- https://vanmue.ru:8001/adminer
- база данных: `diploma-project-postgres`

## Сборка контейнеров production локально

- старт Nginx на порту `8001`:

`./docker.prod.up.local.sh`

Отличия от конфигурации production:

- nginx.conf:
	- отключены сертификаты SSL
	- отключена Basic authorization для входа в Adminer
- Dockerfile проекта web:
	- не копируется файл паролей для Basic authorization
- docker-compose.yml:
	- не монтируется каталог сертификатов SSL
