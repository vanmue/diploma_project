# Dev-среда сервера api

## Сборка бандла фронтенда, копирование в каталог public сервера api:

`npm run web:build`

## Старт dev-сервера api:

- старт на http://localhost:3000:

`npm run api:dev`

## Сборка бандла фронтенда, копирование в каталог public сервера api, старт dev-сервера api:

`npm run start:dev`

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



## Развертывание в production

### Конфигурирование

1. Хранение базы данных на хостовой машине - директория:

`/var/lib/postgresql/data/diploma_project/`

2. Имя пользователя и пароль к базе данных - в файле:

`apps/postgres/.docker/prod/.env`

3. Реквизиты подключения API-сервера к базе данных - в файле:

`apps/api/.docker/prod/.env`

### Пересборка образов и контейнеров, запуск контейнеров

1. Сценарий сборки контейнеров с префиксом имен `diploma-project`

- старт Nginx на порту `8001`:

`./docker.prod.run.sh 8001`