#!/usr/bin/env sh

set -e

npm run build

cd docs/.vuepress/dist

git init
git add .
git commit -m 'deploy blog'
git remote add origin git@github.com:oyv1cent/myblog.git
git remote set-url origin https://github.com/oyv1cent/myblog.git
git push --set-upstream origin master -f
