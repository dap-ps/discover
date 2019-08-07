#!/usr/bin/env bash

if [[ "${NODE_ENV}" == "production" ]]; then
    export EMBARK_TARGET=livenet
    if [[ -z "${WALLET_MNEMONIC}" ]]; then echo "Not defined: WALLET_MNEMONIC"; exit 1; fi
    if [[ -z "${WALLET_PASSWORD}" ]]; then echo "Not defined: WALLET_PASSWORD"; exit 1; fi
elif [[ "${NODE_ENV}" == "development" ]]; then
    export EMBARK_TARGET=testnet
    export WALLET_MNEMONIC='erupt point century seek certain escape solution flee elegant hard please pen'
    export WALLET_PASSWORD='dev_password'
else
    echo "Unknown NODE_ENV value: ${NODE_ENV}"
    echo "Use 'production' or 'development'."
    exit 1
fi

echo " * Removing old full-build"
rm -rf full-build app.zip

echo " * Compiling contracts"
./node_modules/.bin/embark build "${EMBARK_TARGET}"

echo " * Patching deprecated IPFS id() call"
sed -i \
    's#_ipfsConnection.id#_ipfsConnection.version#' \
    src/embarkArtifacts/embarkjs.js

echo " * Creating new full-build"
mkdir full-build
cp -r back-end/* full-build/

echo " * Copying special files"
cp .npmrc full-build/

echo " * Building new frontend"
./node_modules/.bin/react-scripts build

echo " * Copying new frontend"
mkdir full-build/frontend
cp -r build/* full-build/frontend/

echo " * Archiving the build"
{
    cd full-build;
    zip -r ../app.zip ./
}
echo
echo "Finished. Use the app.zip file."
