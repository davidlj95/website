.PHONY: *

# First so that running without command runs a build
build:
	pnpm run data && pnpm run build

install:
	# Despite it's enabled by default on CI. This allows to mock CI locally
	# https://pnpm.io/cli/install#--frozen-lockfile
	pnpm install --frozen-lockfile

unit-test:
	pnpm run test:unit --browsers=ChromeHeadless \
		--no-watch --no-progress --reporters progress --code-coverage
