import moment from 'moment';

export function createNonAvailabilityOfMedicinesPayload(values) {
  const _values = {};

  if (values.dateRange) {
    _values.fromDate = values.dateRange[0].startOf('day').valueOf();
    _values.toDate = values.dateRange[1].endOf('day').valueOf();
  }

  return _values;
}

export default {
  createNonAvailabilityOfMedicinesPayload,
};
