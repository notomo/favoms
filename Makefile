dev:
	npx remix dev --manual
build:
	npx remix build
start:
	npx remix-serve ./build/index.js

lint:
	npx eslint --ignore-path .gitignore --cache --cache-location ./node_modules/.cache/eslint .
typecheck:
	npx tsc --skipLibCheck

db_seed:
	npx prisma db seed
db_push:
	npx prisma db push
