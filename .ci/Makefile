.PHONY: *

# First so that running without command runs a build
build:
	pnpm run prebuild && pnpm run build

install:
	# Despite it's enabled by default on CI. This allows to mock CI locally
	# https://pnpm.io/cli/install#--frozen-lockfile
	pnpm install --frozen-lockfile

unit-test:
	cd ../scripts
	pnpm run build
	pnpm run generate:font-subsets
	pnpm run generate:simple-icons
	cd ..

	pnpm run test:unit --browsers=ChromeHeadless \
		--no-watch --no-progress --reporters progress --code-coverage
