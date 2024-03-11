.PHONY: *

# First so that running without command runs a build
build: prebuild
	pnpm run prerender

prebuild:
	pnpm run prebuild

install:
	# Despite it's enabled by default on CI. This allows to mock CI locally
	# https://pnpm.io/cli/install#--frozen-lockfile
	pnpm install --frozen-lockfile

build-pull-request: prebuild
	pnpm run prerender:pullRequest

lint:
	pnpm run lint --format eslint-formatter-multiple --max-warnings 0

lint-last-commit:
	pnpm run commitlint-last

render-templates:
	pnpm run prebuild:render-templates

ensure-no-pending-changes:
	./ensure-no-pending-changes.sh

test:
	pnpm run prebuild:font-subsets

	# In CI, this file is not generated because should be mocked when testing
	cp ../src/test/@mocks/release.json ..

	pnpm run test --browsers=ChromeHeadless \
		--no-watch --no-progress --reporters junit,progress --code-coverage

run-main:
	cd .. && act

reset:
	docker ps -a --format '{{.Names}}' | grep -e '^act-' | xargs docker rm -f

format-check:
	cd .. && pnpm run format-check-all

lighthouse:
	cd .. && pnpm dlx @lhci/cli@0.12.x autorun
