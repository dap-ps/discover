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
yarn run build
echo "copying new frontend"
rm -rf full-build/frontend/*
cp -r build/* full-build/frontend/
echo "archiving the build"
{
    cd full-build;
    zip -r ../app.zip ./
}
echo "Finished. Use the app.zip file."
