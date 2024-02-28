start:
	docker compose up -d --wait
	pkill -KILL -f "npm exec remix vite:de[v]" || true
	npx remix vite:dev

open:
	explorer.exe http://localhost:3000/collection || true

routes:
	npx remix routes --json | jq

build: FORCE
	npx remix vite:build
start_built:
	npx remix-serve ./build/server/index.js

update_remix:
	rm -f ./app/entry.client.tsx
	npx remix reveal entry.client
	rm -f ./app/entry.server.tsx
	npx remix reveal entry.server

check: typecheck lint build
lint:
	npx eslint --ignore-path .gitignore --cache --cache-location ./node_modules/.cache/eslint .
typecheck:
	npx tsc
format:
	npx prettier . --write 

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
db_studio:
	npx prisma studio

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

delete_old_versions:
	gcloud --project=favoms app versions list --format="value(version.id)" --sort-by="~version.createTime" | tail -n +5 | xargs --no-run-if-empty gcloud app versions delete --quiet --project=favoms --service=default

PROJECT:=favoms
setup_terraform_backend:
	gsutil mb -b on -c standard -p ${PROJECT} -l us-west1 gs://favoms-tfstate

FORCE:
.PHONY: FORCE
