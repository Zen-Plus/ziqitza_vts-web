export const fieldNames = {
  DATE_RANGE: 'dateRange',
};

function handleSelect(event, preValues) {
  const { name, value } = event || {};
  return { ...preValues, [name]: value };
}

export const fields = {
  [fieldNames.DATE_RANGE]: {
    handleSelect,
  },
};
