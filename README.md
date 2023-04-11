### 安装：

```bash
$ git clone git@git2.bnq.com.cn:iam/fronted/todo-center-fronted.git
$ cd todo-center-fronted
$ npm run pre # 或 npm install --registry https://nodejs.bnq.com.cn
```

### 本地开发

0. 【建议】修改本地 host: `127.0.0.1 localhost.bnq.com.cn`
1. 修改文件`config\url`中的字段`url.development.targetUrl`为需要对接的后端接口地址
2. 执行命令`npm run start`
3. 浏览器打开本地测试地址，`http://localhost.bnq.com.cn:8009`
4. 页面实际是放在通用管理后台（https://btadmin.bnqoa.com/），用qiankun的方式接入：https://qiankun.umijs.org/guide/tutorial；
5. window.**POWERED_BY_QIANKUN** 可以用来判断是否作为子页面在其他系统里面打开 6.已接入系统
   （1）btadmin nana： https://btadmin.bnqoa.com btadmin token
   （2）小居家装 oa： https://jia.bnq.com.cn 芝麻 sessionToken
   (3) 零售家装 oa：https://btorder-test.bnq.com.cn 芝麻 sessionToken 7.本地启动
   登录 https://z.bnq.com.cn 对应的 dev 或者 test 环境，在任意请求头里面复制出 sessionToken，再通过http://localhost.bnq.com.cn:8009?accessToken=token 来打开页面

注：目前统一待办的接口支持 btadmin 的 token 以及芝麻的 sessionToken

### 线上构建

- 线上开发环境： `npm run dev`
- 线上测试环境： `npm run test`
- 线上生产环境： `npm run prod`

### 目录结构

```bash
├── build                    # webpack及devserver配置
├── config
│   ├── config.js            # 全局参数配置
│   ├── routers.js           # 路由及菜单配置
│   ├── url.js               # 各环境地址配置
├── public                   # 打包文件目录
├── src
│   ├── app                  # 业务页面入口和常用模板
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── layouts              # 通用布局
│   ├── models               # 全局 model 和入口
│   ├── router               # 路由
│   ├── service              # 全局请求service
│   ├── utils                # 工具库
│   └── index.js             # 全局 JS
├── static                   # 静态文件目录
├── .babelrc                 # babel配置文件
├── .eslintignore            # eslint过滤配置文件
├── .eslintrc                # eslint配置文件
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc              # prettier配置文件
├── index.template.html      # index模板入口
├── jsconfig.json            # VSCode
├── package.json
├── postcss.config.js        # postcss配置文件
└── README.md
```
