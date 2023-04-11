import moment from 'moment';

export default {
  今天: [moment().startOf('day'), moment().endOf('day')],
  昨天: [moment().startOf('day').subtract(1, 'day'), moment().endOf('day').subtract(1, 'day')],
  本周: [moment().startOf('week'), moment().endOf('day')],
  上周: [moment().startOf('week').subtract(1, 'week'), moment().endOf('week').subtract(1, 'week')],
  本月: [moment().startOf('month'), moment().endOf('day')],
  上月: [moment().startOf('month').subtract(1, 'month'), moment().endOf('month').subtract(1, 'month')],
  今年: [moment().startOf('year'), moment().endOf('day')],
  去年: [moment().startOf('year').subtract(1, 'year'), moment().endOf('year').subtract(1, 'year')],
  过去7天: [moment().startOf('day').subtract(6, 'day'), moment().endOf('day')],
  过去14天: [moment().startOf('day').subtract(13, 'day'), moment().endOf('day')],
  过去30天: [moment().startOf('day').subtract(29, 'day'), moment().endOf('day')],
  过去90天: [moment().startOf('day').subtract(89, 'day'), moment().endOf('day')],
};
