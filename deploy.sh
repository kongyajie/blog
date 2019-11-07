
# 确保脚本抛出遇到的错误
set -e

# 生成静态资源
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 添加CNAME，链接到自定义域名
echo 'www.aaronkong.top' > CNAME

# 提交构建后的页面到github
git init
git add -A
git commit -m 'deploy'

# 直接提交并覆盖
# git push -f https://github.com/kongyajie/kongyajie.github.io.git master

# 使用 travis 持续集成
git push -f https://e6a04247da9bb63ca3e6649121ce8753de4d6e71@github.com/kongyajie/kongyajie.github.io.git master