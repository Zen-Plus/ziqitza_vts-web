import moment from 'moment';

export function createMonthlyOffRoadDetailsPayload(values) {
  const _values = {};

  if (values.month) {
    _values.fromDate = moment(values.month).startOf('month').valueOf();
    if (moment(values.month).month() !== moment().month()) {
      _values.toDate = moment(values.month).endOf('month').valueOf();
    } else {
      _values.toDate = moment(values.month).endOf('day').valueOf();    
    }
  }

  return _values;
}

export default {
  createMonthlyOffRoadDetailsPayload,
};
