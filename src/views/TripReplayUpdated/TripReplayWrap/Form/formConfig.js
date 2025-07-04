export const fieldNames = {
  SEARCH_PARAMETER: 'searchParameter',
  SEARCH_VALUE: 'searchValue',
  DATE_RANGE: 'dateRange',
  LOCATION_REQUIRED: 'locationRequired',
  PACKET_FREQUENCY: 'packetFrequency',
};

function handleChange(event, preValues) {
  const { name, value } = event.target || {};
  return { ...preValues, [name]: value };
}
function handleCheckBox(event, preValues) {
  const { name, checked } = event.target || {};
  return { ...preValues, [name]: checked };
}

function handleSelect(event, preValues) {
  const { name, value } = event || {};
  return { ...preValues, [name]: value };
}
function handleSeachParameterSelect(event, preValues) {
  const { name, value } = event || {};
  const _preValues = { ...preValues };
  delete _preValues[fieldNames.SEARCH_VALUE];
  delete _preValues[fieldNames.DATE_RANGE];
  delete _preValues[fieldNames.LOCATION_REQUIRED];
  delete _preValues[fieldNames.PACKET_FREQUENCY];
  return { ..._preValues, [name]: value };
}

export const fields = {
  [fieldNames.SEARCH_PARAMETER]: {
    handleSelect: handleSeachParameterSelect,
  },
  [fieldNames.SEARCH_VALUE]: {
    handleChange,
  },
  [fieldNames.DATE_RANGE]: {
    handleSelect,
  },
  [fieldNames.LOCATION_REQUIRED]: {
    handleChange: handleCheckBox,
  },
  [fieldNames.PACKET_FREQUENCY]: {
    handleChange,
  },
};
