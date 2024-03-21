# Метагеномная карта Ростовской области

Команда для запуска: `docker compose -f docker/docker-compose.yml up`.

Разворачивает инстанс приложения (на `http://localhost:3000/`), PostgreSQL + PostGis с уже развернутой базой метагенома (`postgres://postgres:postgres@localhost:5430/metagenome`) и PgAdmin (`http://localhost:5050`, логин: _<admin@admin.com>_, пароль: _admin_)

Для разработки перед запуском необходимо установить зависимости (`npm i`)
