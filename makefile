include .env

.env:
	cp .env.example .env

init:
	docker compose run back --rm i
	docker compose run back --rm run build:deps
	docker compose run front --rm i --filter "front"
	docker compose run back --rm i
	docker compose run back --rm run migrate

start:
	docker compose up -d

stop:
	docker compose down

migrate:
	docker run --volume .:/home/bun/app --env-file .env --rm --workdir /home/bun/app oven/bun:slim run migrate
	