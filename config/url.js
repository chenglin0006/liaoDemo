// 公用地址
const common = {
  // 接口pathname
  apiUrlFilter: '/todoCenterSystem',
  cscUrlFilter: '/customerServiceCenterApi',
  ossFilter: '/api',
  storeFilter: '/merchantAdmin',
  areasUrlFilter: '/areas',
  hrmUrlFilter: '/organization-admin',
};

const url = {
  // 本地开发环境 - development
  development: {
    // 本地测试接口地址
    targetUrl: 'https://todo-dev.bnqoa.com',
    storeUrl: 'https://merchant-dev.bnq.com.cn',
    areasUrl: 'https://areas-dev.bnq.com.cn',
    hrmUrl: 'http://localhost.bnq.com.cn:8008',
    // 本地测试地址
    localUrl: 'http://localhost',
    authUrl: 'https://z-dev.bnq.com.cn',
    resourceUrl: 'https://authority-dev.bnq.com.cn',
    // 监听端口
    port: 6001,
    // 是否自动打开浏览器页面
    autoOpenBrowser: true,
    ...common,
    // hrmUrl: 'http://localhost.bnq.com.cn:8008',
    domain: 'http://localhost.bnq.com.cn:8009',
    aliOssUrl: 'https://oss-dev.bnq.com.cn',
    cscUrl: 'https://csc-dev.bnq.com.cn', // 'http://192.168.118.114:8081',
  },
  // 测试环境 - dev
  dev: {
    ...common,
    authUrl: 'https://z-dev.bnq.com.cn',
    areasUrl: 'https://areas-dev.bnq.com.cn',
    storeUrl: 'https://merchant-dev.bnq.com.cn',
    hrmUrl: 'https://hrm-dev.bnq.com.cn',
    resourceUrl: 'https://authority-dev.bnq.com.cn',
    domain: 'https://todo-dev.bnqoa.com',
    aliOssUrl: 'https://oss-dev.bnq.com.cn',
    cscUrl: 'https://csc-dev.bnq.com.cn',
  },
  // 测试环境 - test
  test: {
    ...common,
    authUrl: 'https://z-test.bnq.com.cn',
    areasUrl: 'https://areas-test.bnq.com.cn',
    storeUrl: 'https://merchant-test.bnq.com.cn',
    hrmUrl: 'https://hrm-test.bnq.com.cn',
    resourceUrl: 'https://authority-test.bnq.com.cn',
    domain: 'https://todo-test.bnqoa.com',
    aliOssUrl: 'https://oss-test.bnq.com.cn',
    cscUrl: 'https://csc-test.bnq.com.cn',
  },
  uat: {
    ...common,
    authUrl: 'https://z-uat.bnq.com.cn',
    resourceUrl: 'https://authority-uat.bnq.com.cn',
    domain: 'https://todo-uat.bnqoa.com',
    aliOssUrl: 'https://oss-uat.bnq.com.cn',
    cscUrl: 'https://csc-uat.bnq.com.cn',
  },
  // 生产环境 - prod
  prod: {
    ...common,
    authUrl: 'https://z.bnq.com.cn',
    areasUrl: 'https://areas.bnq.com.cn',
    storeUrl: 'https://merchant.bnq.com.cn',
    hrmUrl: 'https://hrm.bnq.com.cn',
    resourceUrl: 'https://authority.bnq.com.cn',
    domain: 'https://todo.bnqoa.com',
    aliOssUrl: 'https://oss.bnq.com.cn',
    cscUrl: 'https://csc.bnq.com.cn',
  },
};

module.exports = url;
