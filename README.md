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
города - список | `GET /api/v1/cities/` |
салоны - преимущества ("бесплатная парковка" и т.п.) | `GET /api/v1/shop-advantages/` |
салоны - список | `GET /api/v1/shops/?deliverable_group_id=3&city_id=2` | Параметры поиска:
--- | --- | `deliverable_group_id` - id услуги
--- | --- | `city_id` - id города
--- | --- | параметры опциональны, могут отсутствовать
мастера - список | `GET /api/v1/masters/?deliverable_group_id=1&city_id=1&shop_id=1` | Параметры поиска:
--- | --- | `deliverable_group_id` - id услуги
--- | --- | `city_id` - id города
--- | --- | `shop_id` - id салона
--- | --- | параметры опциональны, могут отсутствовать
запись к мастеру - создание | `POST /api/v1/appointments/` | Параметры `body` запроса:
--- | --- | {
--- | --- |     "shop": { "id": 1 },
--- | --- |     "master": { "id": 6 },
--- | --- |     "deliverable": { "id": 1 }, // услуга
--- | --- |     "name": "посетитель сайта",
--- | --- |     "phone": "+71234567890",
--- | --- |     "comments": "могу опоздать",
--- | --- |     "from": "2022-11-17T10:00:00+00:00",
--- | --- |     "to": "2022-11-17T11:00:00+00:00"
--- | --- | }
запись к мастеру - список | `GET /api/v1/appointments/?date=2022-11-17&shop_id=1&master_id=6` | Параметры поиска:
--- | --- | `date`
--- | --- | `shop_id`
--- | --- | `master_id`
--- | --- | параметры опциональны, могут отсутствовать



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
