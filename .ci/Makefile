.PHONY: *

build:
	yarn run prebuild
	yarn run prerender

lint:
	yarn lint --format eslint-formatter-multiple --max-warnings 0

render-templates:
	yarn run render-templates

ensure-no-pending-changes:
	./ensure-no-pending-changes.sh

test:
	yarn run font-subsets

	# In CI, this file is not generated because should be mocked when testing
	cp ../src/test/@mocks/release.json ..

	yarn test --browsers=ChromeHeadless --no-watch --no-progress --reporters junit,progress --code-coverage

run-main:
	cd .. && act

reset:
	docker ps -a --format '{{.Names}}' | grep -e '^act-' | xargs docker rm -f

format-check:
	cd .. && yarn run format-check

lighthouse:
	cd .. && npx --yes @lhci/cli@0.12.x autorun
