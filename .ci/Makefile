.PHONY: *

build:
	yarn run prerender

lint:
	yarn lint --format eslint-formatter-multiple --max-warnings 0

test:
	yarn test --browsers=ChromeHeadless --watch=false --reporters junit,progress --code-coverage

run-main:
	act

reset:
	docker ps -a --format '{{.Names}}' | grep -e '^act-' | xargs docker rm -f
