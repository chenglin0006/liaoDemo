/* eslint-disable no-case-declarations */
import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
  getHomeData(params) {
    const { type, ...restParams } = params;
    // const periodParams = {};
    let url = '/dashboard/waitDistributeInfo';
    switch (type) {
      case 1:
        url = '/dashboard/waitDistributeInfo';
        break;
      case 2:
        url = '/dashboard/distributeTimeInfo';
        break;
      case 3:
        restParams.period = 0;
        url = '/dashboard/groupHandleInfo';
        break;
      case 4:
        url = '/dashboard/groupCompleteInfo';
        break;
      case 5:
        url = '/dashboard/groupCallInfo';
        break;
      case 6:
        url = '/dashboard/handleInfo';
        break;
      case 7:
        url = '/dashboard/completeInfo';
        break;
      case 8:
        url = '/dashboard/callInfo';
        break;
      default:
        break;
    }
    // console.log(periodParams, 'periodParamsperiodParams');
    return Remote.post(url, restParams);
  }
}

export default new Service();
