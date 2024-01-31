start:
	docker compose up -d --wait
	npx remix dev --manual

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

FORCE:
.PHONY: FORCE
