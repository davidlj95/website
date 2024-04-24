.PHONY: *

# First so that running without command runs a build
build:
	pnpm run prebuild && pnpm run prerender

install:
	# Despite it's enabled by default on CI. This allows to mock CI locally
	# https://pnpm.io/cli/install#--frozen-lockfile
	pnpm install --frozen-lockfile

lint:
	pnpm run lint --format eslint-formatter-multiple --max-warnings 0

test:
	pnpm run prebuild:font-subsets
	pnpm run prebuild:simple-icons

	# In CI, this file is not generated because should be mocked when testing
	cp ../src/test/mocks/release.json ..

	pnpm run test --browsers=ChromeHeadless \
		--no-watch --no-progress --reporters junit,progress --code-coverage

format-check:
	cd .. && pnpm run format-check-all
