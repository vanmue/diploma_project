# diploma_project

## Каталог маршрутов

Название | эндпоинт | параметры
---| --- | ---
стартовая страница | `GET /` | 
тестовый ответ API | `GET /api/v1/test-response/` |
группа услуг - список | `GET /api/v1/deliverable-groups/` |
группа услуг - создание | `POST /api/v1/deliverable-groups/` | пример `body` запроса:
--- | --- |    {
--- | --- |        index: 10, // порядковый номер в списке
--- | --- |        name: "парикмахерские услуги",
--- | --- |        image: "/uploads/groups/parikmaherskiye_uslugi.png"
--- | --- |    }

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
