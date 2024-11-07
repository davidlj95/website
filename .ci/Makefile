.PHONY: *

# First so that running without command runs a build
build:
	pnpm run prebuild && pnpm run build

install:
	# Despite it's enabled by default on CI. This allows to mock CI locally
	# https://pnpm.io/cli/install#--frozen-lockfile
	pnpm install --frozen-lockfile

unit-test:
	pnpm run prebuild:font-subsets
	pnpm run prebuild:simple-icons

	# In CI, this file is not generated because should be mocked when testing
	cp ../src/test/mocks/release.json ..

	pnpm run test:unit --browsers=ChromeHeadless \
		--no-watch --no-progress --reporters progress --code-coverage
