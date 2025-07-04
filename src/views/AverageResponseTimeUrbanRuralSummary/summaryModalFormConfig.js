export const fieldNames = {
    MONTH: 'month',
    FILE_DATA: 'fileData'
  };

  function handleSelect(event, preValues) {
    const { name, value } = event || {};
    return { ...preValues, [name]: value };
  }

  function handleMonthSelect(event, preValues) {
    const { name, value } = event || {};
    const _preValues = { ...preValues };

    if (_preValues[fieldNames.FILE_DATA]) {
      _preValues[fieldNames.FILE_DATA] = undefined;
    }

    return { ..._preValues, [name]: value };
  }

  export const fields = {
    [fieldNames.MONTH]: {
      handleSelect: handleMonthSelect,
    },
    [fieldNames.FILE_DATA]: {
      handleSelect,
    },
  };
