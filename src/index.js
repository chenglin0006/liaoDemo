import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import BasicLayout from './layouts/BasicLayout';
import store from './store/index';
import './style/common.css';
import './index.less';

dayjs.locale('zh-cn');

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <BasicLayout />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
);
