#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
#set -e

# 生成静态文件
# npm run docs:build

# 进入静态文件的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# git push origin 本地分支:远端希望创建的分支
git remote add origin https://github.com/sumyee/sumyee.github.io.git
# git push --set-upstream origin master -f
git push -u origin master -f
# git push -f https://github.com/sumyee/sumyee.github.io.git

cd -
