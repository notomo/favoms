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

_deploy:
	rm -rf ./deploy
	mkdir -p ./deploy/public
	cp -rf ./public/* ./deploy/public
	mkdir -p ./deploy/build
	cp -rf ./build/* ./deploy/build
	mkdir -p ./deploy/prisma
	cp -f ./prisma/schema.prisma ./deploy/prisma
	cp -rf ./app.yaml ./app_secret.yaml package.json package-lock.json ./deploy

deploy: _deploy build FORCE
	cd deploy; gcloud --project favoms app deploy --stop-previous-version --quiet

FORCE:
.PHONY: FORCE
