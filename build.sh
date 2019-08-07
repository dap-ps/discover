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

echo "removing old full-build"
rm -rf full-build app.zip
echo "compiling contracts"
./node_modules/.bin/embark build "${EMBARK_TARGET}"
echo "creating new full-build"
mkdir full-build
cp -r back-end/* full-build/
echo "copying special files"
cp .npmrc full-build/
echo "building new frontend"
./node_modules/.bin/react-scripts build
echo "copying new frontend"
mkdir full-build/frontend
cp -r build/* full-build/frontend/
echo "archiving the build"
{
    cd full-build;
    zip -r ../app.zip ./
}
echo "Finished. Use the app.zip file."
