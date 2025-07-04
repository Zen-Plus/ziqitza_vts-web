export const fieldNames = {
    FROM_DATE: 'date',
    DISTRICT: 'district',
  };
  
  function handleSelect(event, preValues) {
    const { name, value } = event || {};
    return { ...preValues, [name]: value };
  }
  
  export const fields = {
    [fieldNames.FROM_DATE]: {
      handleSelect,
    },
    [fieldNames.DISTRICT]: {
      handleSelect,
    },
  };
  