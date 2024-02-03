start:
	explorer.exe http://localhost:3000/collection || true
	docker compose up -d --wait
	pkill -KILL -f "npm exec remix de[v]" || true
	npx remix dev --manual

routes:
	npx remix routes --json | jq

build: FORCE
	npx remix build
start_built:
	npx remix-serve ./build/index.js

update_remix:
	rm -f ./app/entry.client.tsx
	npx remix reveal entry.client
	rm -f ./app/entry.server.tsx
	npx remix reveal entry.server

lint:
	npx eslint --ignore-path .gitignore --cache --cache-location ./node_modules/.cache/eslint .
typecheck:
	npx tsc --skipLibCheck

db_seed:
	npx prisma db seed
db_push:
	npx prisma db push
db_reset:
	npx prisma migrate reset --force
db_migrate:
	npx prisma migrate dev

FORCE:
.PHONY: FORCE
