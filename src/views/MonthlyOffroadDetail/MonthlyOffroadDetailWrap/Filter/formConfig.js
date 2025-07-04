export const fieldNames = {
  MONTH: 'month',
};

function handleSelect(event, preValues) {
  const { name, value } = event || {};
  return { ...preValues, [name]: value };
}

export const fields = {
  [fieldNames.MONTH]: {
    handleSelect,
  },
};
