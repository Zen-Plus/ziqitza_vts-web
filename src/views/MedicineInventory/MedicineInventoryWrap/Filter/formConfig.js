export const fieldNames = {
    FROM_DATE: 'fromDate',
    DISTRICT: 'district',
    VEHICLE_REGISTRATION_NO: 'vehicleRegistrationNo',
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
    [fieldNames.VEHICLE_REGISTRATION_NO]: {
      handleSelect,
    },
  };
  