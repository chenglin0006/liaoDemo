import CommonService from '@/service/CommonService';
// import { message } from 'antd';

const Services = new CommonService();

export default {
  state: {
    currentUser: {},
    isInQiankun: !!window.__POWERED_BY_QIANKUN__,
    systemEnum: [],
    handleStatusEnum: [],
    instanceStatusEnum: [], // 审批状态枚举
    taskStatusEnum: [], // 任务状态枚举
    isShop: false, // 是否为店铺管理页面
  },
  reducers: {
    save(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    // 获取用户信息
    async getCurrentUser() {
      const { data } = await Services.getCurrentUser();
      const { userInfo } = data;
      console.log(data, 11111111);
      this.save({
        currentUser: {
          realName: userInfo.realName,
          username: userInfo.username,
          userNo: userInfo.user,
        },
      });
      return data;
    },
  },
};
