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
	