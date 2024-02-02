start:
	explorer.exe http://localhost:3000 || true
	docker compose up -d --wait
	pkill -KILL -f "npm exec remix de[v]" || true
	npx remix dev

routes:
	npx remix routes --json | jq

build: FORCE
	npx remix build
start_built:
	npx remix-serve ./build/index.js

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

FORCE:
.PHONY: FORCE
