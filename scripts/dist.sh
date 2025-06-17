# /bin/usr/env bash

rm -rf dist/
mkdir -p dist/public/
cp -R public/* dist/public/
cp -R server/* dist/
