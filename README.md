1104，主应用采用vue-cli脚手架，重新创建新的 demo

#### master分支说明
主分支，各个分支问题解决合并到此分支

#### testRouter分支说明
测试，解决 路由问题

#### testSubAppComponents分支说明
测试，解决 子应用组件问题


## 拉取远程分支到本地
```sh
#情况一：目前本地还没拉代码，直接拉分支代码
git clone -b <branchName> https://github.com/wusp1994/qiankunTestByWu.git
#情况二：本地已经拉取了代码，想拉取远程某一分支的代码到本地
git checkout -b <branchName> origin/<branchName> #当前分支上创建一个分支，拉取远程到本地（方式一）
  # 如果报错 git fetch 同步仓库
git fetch origin <branchName>:<branchName>  #拉取远程分支到本地(方式二)
```