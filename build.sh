#!/usr/bin/env bash

if [[ "${NODE_ENV}" != "production" ]]; then
    export WALLET_MNEMONIC='erupt point century seek certain escape solution flee elegant hard please pen'
    export WALLET_PASSWORD='dev_password'
fi

echo "removing old full-build"
rm -rf full-build app.zip
echo "compiling contracts"
./node_modules/.bin/embark build
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
