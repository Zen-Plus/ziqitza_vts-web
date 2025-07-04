import { cloneDeep } from '../../../../common/helpers/collectionUtils';

export function createClusterPayload(values = {}) {
  const _values = cloneDeep(values)

  if (_values.receiverPort) {
    _values.receiverPort = parseFloat(_values.receiverPort);
  }

  return _values;
}

export function getInitialValues(values = {}) {
  const _values = cloneDeep(values);

  if (_values.receiverPort) {
    _values.receiverPort = _values.receiverPort.toString();
  }

  return _values;
}

export default {
  createClusterPayload,
  getInitialValues,
};
