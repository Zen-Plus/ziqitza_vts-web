export const fieldNames = {
  CLUSTER_NAME: 'name',
  RECEIVER_PORT: 'receiverPort',
  PROTOCOLS: 'protocols',
};

function handleChange(event, preValues) {
  const { name, value } = event.target || {};
  return { ...preValues, [name]: value };
}

function handleSelect(event, preValues) {
  const { name, value } = event || {};
  return { ...preValues, [name]: value };
}

export const fields = {
  [fieldNames.CLUSTER_NAME]: {
    handleChange,
  },
  [fieldNames.RECEIVER_PORT]: {
    handleChange,
  },
  [fieldNames.PROTOCOLS]: {
    handleSelect,
  },
};
