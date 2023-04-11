const config = {
  projectName: '网友科技',
  projectDesc: '待办',
  // 自定义icon地址，用于menu，使用参考：https://ant.design/components/icon-cn/#components-icon-demo-scriptUrl
  // 可以添加多个
  iconScriptUrl: ['//at.alicdn.com/t/font_2704727_ssy6wgjae0e.js'],
  // logo
  defaultLogo: 'https://www.liaoliao.com/images/toplogo.png',
  // 默认头像
  defaultAvatar: 'https://res1.bnq.com.cn/d51704b0-7aa8-4c4d-a3f1-6d576ede7a2d',
  // 百安居纯汉字logo
  defaultImg: 'https://www.liaoliao.com/images/toplogo.png',
  // 主题样式
  theme: {
    // antd for pc，参考：https://ant.design/docs/react/customize-theme-cn
    'primary-color': '#3478f6',
    'link-color': '#3478F6',
    'primary-color-hover': '#2A6DE8',
    'border-radius-base': '4px',
    // antd-mobile for，参考：https://mobile.ant.design/docs/react/customize-theme-cn
    'brand-primary': '#1890FF',
    '@ant-prefix': 'todocenter',
  },
  menus: [
    {
      name: 'home',
      icon: 'icon-yuyuedanguanli2',
      path: '/home',
    },
  ],
};

module.exports = config;
