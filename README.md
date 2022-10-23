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
группа услуг - создание | `POST /api/v1/deliverable-groups/` | "index": 10
--- | --- | "name": "парикмахерские услуги"
--- | --- | "image": "/uploads/deliverable-groups/parikmaherskiye_uslugi.png"




## Развертывание в production

### Пересборка образов и контейнеров, запуск контейнеров


Префикс имен образов и контейнеров `diploma-project`, старт Nginx на порту `8001`:

`./docker.prod.run.sh 8001`