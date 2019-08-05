echo "removing old full-build"
rm -rf full-build
echo "creating new full-build"
mkdir full-build
cp -r back-end/* full-build/
echo "building new frontend"
if [ $1 = "--dev" ]
then 
    npm run build-dev
else
    npm run build
fi
echo "copying new frontend"
rm -rf full-build/frontend/*
cp -r build/* full-build/frontend/
echo "Finished. Use your full-build folder"
