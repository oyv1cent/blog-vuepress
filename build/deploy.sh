#!/usr/bin/env sh

set -e
npm run build
cd docs/.vuepress/dist
git init
git remote add origin https://github.com/oyv1cent/myblog.git
git fetch
git reset origin/master
git add .
git commit -m 'deploy blog'
git push --set-upstream origin master
