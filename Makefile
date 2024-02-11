start:
	docker compose up -d --wait
	pkill -KILL -f "npm exec remix de[v]" || true
	npx remix dev --manual

open:
	explorer.exe http://localhost:3000/collection || true

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

prisma_generate:
	npx prisma generate
db_seed:
	npx prisma db seed
db_push:
	npx prisma db push
db_migrate_reset:
	npx prisma migrate reset --force
db_migrate_dev:
	npx prisma migrate dev
db_migrate_status:
	npx prisma migrate status

_deploy: build
	rm -rf ./deploy
	mkdir -p ./deploy/public
	cp -rf ./public/* ./deploy/public
	mkdir -p ./deploy/build
	cp -rf ./build/* ./deploy/build
	mkdir -p ./deploy/prisma
	cp -f ./prisma/schema.prisma ./deploy/prisma
	cp -rf ./app.yaml ./app_secret.yaml package.json package-lock.json ./deploy

deploy: _deploy FORCE
	cd deploy; gcloud --project favoms app deploy --stop-previous-version --quiet

PROJECT:=favoms
setup_terraform_backend:
	gsutil mb -b on -c standard -p ${PROJECT} -l us-west1 gs://favoms-tfstate

FORCE:
.PHONY: FORCE
