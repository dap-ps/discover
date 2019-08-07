.PHONY: help clean purge compile-contracts patch-ipfs mk-build-dir copy-misc copy-backend compile-js copy-frontend archive

export NODE_ENV ?= development
export WALLET_PASSWORD ?= dev_password
export WALLET_MNEMONIC ?= erupt point century seek certain escape solution flee elegant hard please pen

ifeq ($(NODE_ENV),production)
export EMBARK_TARGET ?= livenet
else
export EMBARK_TARGET ?= testnet
endif

HELP_FUN = \
	%help; \
	while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-]+)\s*:.*\#\#(?:@([a-zA-Z\-]+))?\s(.*)$$/ }; \
	print "Usage: make [target]\n\n"; \
	for (sort keys %help) { \
		print "${WHITE}$$_:${RESET}\n"; \
		for (@{$$help{$$_}}) { \
			$$sep = " " x (22 - length $$_->[0]); \
			print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
		}; \
		print "\n"; \
	}

help: ##@miscellaneous Show this help.
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)

all: ##@build Build the final app.zip from scratch
all: node_modules clean compile-contracts patch-ipfs mk-build-dir copy-misc copy-backend compile-js copy-frontend archive
	@echo "SUCCESS! Use the app.zip file."

node_modules: ##@install Install the Node.js dependencies using Yarn
	yarn install

check-prod-vars: ##@checks Check if the necesary env variables are set
ifeq ($(NODE_ENV),production)
	[[ -z "${WALLET_MNEMONIC}" ]] && { echo "Not defined: WALLET_MNEMONIC"; exit 1 }
	[[ -z "${WALLET_PASSWORD}" ]] && { echo "Not defined: WALLET_PASSWORD"; exit 1 }
else
ifneq ($(NODE_ENV),development)
	@echo "Unknown NODE_ENV value: ${NODE_ENV}"
	@echo "Use 'production' or 'development'."
	exit 1
endif
endif

compile-contracts: ##@compile Compile the contracts using Embark.js
compile-contracts: check-prod-vars
	./node_modules/.bin/embark build "${EMBARK_TARGET}"

compile-js: ##@compile Compile the React application
	./node_modules/.bin/react-scripts build

patch-ipfs: ##@patch Patch the deprecated id() call in IPFS API
	sed -i 's#_ipfsConnection.id#_ipfsConnection.version#' \
		src/embarkArtifacts/embarkjs.js

mk-build-dir: ##@create Create the destination directory for full build
	mkdir full-build

copy-backend: ##@copy Copy over the backend files to full-build dir
	cp -r back-end/* full-build/

copy-frontend: ##@copy Copy over the frontend files to full-build dir
	mkdir full-build/frontend
	cp -r build/* full-build/frontend/

copy-misc: ##@copy Copy over the miscalenious config config files
	cp .npmrc full-build/

archive: ##@archive Create the app.zip archive for use with ElasticBeanstalk
archive: clean-archive
	cd full-build && zip -r ../app.zip ./

clean-archive: ##@clean Remove app.zip
	rm -f app.zip

clean-build-dir: ##@clean Remove full-build dir
	rm -fr full-build 

clean: clean-build-dir clean-archive ##@clean Cleanup all the build artifacts

purge: ##@clean Remove everything that isn't committed
	git clean -dxf -f
