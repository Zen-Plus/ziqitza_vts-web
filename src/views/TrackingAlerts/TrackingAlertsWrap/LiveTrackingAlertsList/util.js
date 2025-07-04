export const createAlertPayload = (values) => {
  const _values = {};
  if (values.exceptionReason) {
    _values.exceptionReasonId = values.exceptionReason.id;
    _values.exceptionReason = values.exceptionReason.name;
  }
  if (values.grantExtensionTime) {
    _values.extensionPeriod = values.grantExtensionTime * 60 * 1000;
  }
  if (values.note) {
    _values.note = values.note;
  }
  if (values.alertId) {
    _values.id = values.alertId;
  }
  return _values;
};

export default {
  createAlertPayload,
};
