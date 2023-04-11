import Service from './Service';

export default {
  state: {
    initData: {},
  },

  reducers: {
    save(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },

    clear() {
      return {
        initData: {},
      };
    },
  },

  effects: {
    async getHomeData(params) {
      const { data } = await Service.getHomeData(params);
      return data;
    },
  },
};
