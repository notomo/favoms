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
	npx @biomejs/biome check
fix:
	npx @biomejs/biome check --fix --unsafe
typecheck:
	npx tsc
format:
	npx biome format --write
test_watch:
	npx vitest
test:
	npx vitest run --passWithNoTests

setup_local:
	cp ./prisma/.env.sample ./prisma/.env

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
	cp -rf ./app.yaml ./app-secret.yaml package.json package-lock.json ./deploy

PROJECT:=favoms
deploy: _deploy FORCE
	cd deploy; gcloud --project ${PROJECT} app deploy --stop-previous-version --quiet

delete_old_versions:
	gcloud --project=${PROJECT} app versions list --format="value(version.id)" --sort-by="~version.createTime" | tail -n +5 | xargs --no-run-if-empty gcloud app versions delete --quiet --project=${PROJECT} --service=default

setup_terraform_backend:
	gsutil mb -b on -c standard -p ${PROJECT} -l us-west1 gs://favoms-tfstate

setup_cleanup_policy:
	gcloud artifacts repositories set-cleanup-policies asia.gcr.io \
	  --project ${PROJECT} \
	  --location asia \
	  --policy ./infra/repository_cleanup_policy.json \
	  --no-dry-run \
	  --overwrite

FORCE:
.PHONY: FORCE
