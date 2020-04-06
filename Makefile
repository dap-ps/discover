.PHONY: help clean purge compile-contracts patch-ipfs patch-ws mk-build-dir copy-misc copy-backend compile-js copy-frontend archive

export NODE_ENV ?= localhost
export WALLET_PASSWORD ?= dev_password
export WALLET_MNEMONIC ?= erupt point century seek certain escape solution flee elegant hard please pen

ifeq ($(NODE_ENV),production)
export EMBARK_TARGET ?= livenet
else
ifeq ($(NODE_ENV), localhost)
export EMBARK_TARGET ?= development
else
export EMBARK_TARGET ?= testnet
endif
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
all: node_modules clean compile-contracts mk-build-dir copy-misc copy-backend compile-js copy-frontend archive install-build
ifneq ($(NODE_ENV),localhost)
	@echo "SUCCESS! Use the app.zip file."
else
	@echo "SUCCESS! Execute 'yarn server-start' and browse http://localhost:4000"
endif

node_modules: ##@install Install the Node.js dependencies using Yarn
	yarn install

check-prod-vars: ##@checks Check if the necesary env variables are set
ifneq ($(NODE_ENV),$(filter $(NODE_ENV),production development localhost))
	@echo "Unknown NODE_ENV value: ${NODE_ENV}"
	@echo "Use 'production' or 'development' or 'localhost'."
	exit 1
endif

compile-contracts: ##@compile Compile the contracts using Embark.js
compile-contracts: check-prod-vars
	./node_modules/.bin/embark build "${EMBARK_TARGET}"

compile-js: ##@compile Compile the React application
	./WebApp/node_modules/.bin/cross-env NODE_ENV=production webpack --config internals/webpack/webpack.prod.babel.js --color -p --progress --hide-modules --display-optimization-bailout

mk-build-dir: ##@create Create the destination directory for full build if the folder doesn't exist
	[ -d full-build ] || mkdir -p full-build

copy-backend: ##@copy Copy over the backend files to full-build dir
ifeq ($(NODE_ENV),localhost)
	if [ -f ./full-build/yarn.lock ]; then \
		cmp -s ./Backend/yarn.lock ./full-build/yarn.lock; \
		RETVAL=$$?; \
		if [ ! $$RETVAL -eq 0 ]; then \
			echo "yarn.lock is different. Removing node_modules and replacing yarn.lock"; \
			rm -rf full-build/yarn.lock full-build/node_modules; \
		fi \
	fi
	rsync -r --exclude node_modules ./Backend/* ./full-build/
else
	cp -r Backend/* full-build/
endif

copy-frontend: ##@copy Copy over the frontend files to full-build dir
	mkdir full-build/frontend
	cp -r WebApp/build/* full-build/frontend/

copy-misc: ##@copy Copy over the miscalenious config config files
	cp .npmrc full-build/


archive: ##@archive Create the app.zip archive for use with ElasticBeanstalk when running on testnet or mainnet
ifneq ($(NODE_ENV),localhost)
archive: clean-archive
	cd full-build && zip -r ../app.zip ./
endif

install-build:
ifeq ($(NODE_ENV),localhost)
	cd full-build && yarn
endif

clean-archive: ##@clean Remove app.zip
ifneq ($(NODE_ENV),localhost)
	rm -f app.zip
endif

clean-build-dir: ##@clean Remove full-build folder and keep node_modules (depending on environment)
ifeq ($(NODE_ENV),localhost)
	find ./full-build -mindepth 1 ! -regex '^./full-build/\(node_modules\|yarn.lock\).*' -delete; 2> /dev/null
else
	rm -fr full-build
endif

clean: clean-build-dir clean-archive ##@clean Cleanup all the build artifacts

purge: ##@clean Remove everything that isn't committed
	git clean -dxf -f
