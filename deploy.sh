
# 确保脚本抛出遇到的错误
set -e

# 生成静态资源
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 提交构建后的页面到github
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/kongyajie/kongyajie.github.io.git master