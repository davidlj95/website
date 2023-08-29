.PHONY: *

build:
	yarn run prerender

test:
	yarn test --browsers=ChromeHeadless --watch=false

run-main:
	act

reset:
	docker ps -a --format '{{.Names}}' | grep -e '^act-' | xargs docker rm -f
