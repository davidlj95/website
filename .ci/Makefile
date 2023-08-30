.PHONY: *

build:
	yarn run font-subsets
	yarn run prerender

lint:
	yarn lint --format eslint-formatter-multiple --max-warnings 0

render-templates:
	yarn run render-templates

ensure-no-pending-changes:
	./ensure-no-pending-changes.sh

test:
	yarn test --browsers=ChromeHeadless --no-watch --no-progress --reporters junit,progress --code-coverage

run-main:
	cd .. && act

reset:
	docker ps -a --format '{{.Names}}' | grep -e '^act-' | xargs docker rm -f

lighthouse:
	cd .. && yarn dlx @lhci/cli@0.12.x autorun
