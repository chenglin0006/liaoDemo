export default [
  {
    path: '/error',
    page: () => {
      return import('../../src/components/Exception/403');
    },
  },
  {
    path: '/home',
    exact: true,
    text: '仪表盘',
    page: () => {
      return import('@/app/Home');
    },
  },
];
