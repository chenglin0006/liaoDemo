/* eslint-disable no-param-reassign */
import { Remote } from '../util';

class CommonService {
  getCurrentUser = (params) => {
    return Remote.get('/user/getCurrentUser', params);
  };
}

export default CommonService;
