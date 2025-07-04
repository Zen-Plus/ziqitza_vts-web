import moment from 'moment';

export function getActualData(values) {
  return values;
}

export function getGraphDateRangePayload() {
  const _values = {};

  _values.fromDate = moment().startOf('month').valueOf();

  _values.toDate = moment().valueOf();
  return _values;
}

export default {
  getActualData,
  getGraphDateRangePayload,
};
