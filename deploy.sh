
#!/usr/bin/env sh

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
git push -f https://a1c47e2fccde4f6469d4bb4ec5f54842f2691716@github.com/kongyajie/kongyajie.github.io.git master