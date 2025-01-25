#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# deploy to gh-pages branch
git push -f https://github.com/innerpixel/space-nexus-defense-comm.git main:gh-pages

cd -
