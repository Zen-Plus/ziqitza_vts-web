export const fieldNames = {
  SERVICE_REQUEST_NUMBER: 'serviceRequestNumber',
  SERVICE_REQUEST_STATUS: 'serviceRequestStatus',
  JOB_NUMBER: 'jobNumber',
  JOB_STATUS: 'jobStatus',
  VEHICLE_REGISTRATION_NUMBER: 'vehicleNumber',
  PARKING_LOCATION: 'parkingLocation',
  MILESTONE_TYPE: 'milestoneReportedType',
  VENDOR_LOCATION: 'vendorLocation',
  JOB_CLOSURE_RESOLUTION: 'jobClosureResolution',
  JOB_CLOSURE_RESOLUTION_REASON: 'jobClosureResolutionReason',
  JOB_CLOSURE_RESOLUTION_REMARK: 'jobClosureResolutionRemark',
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
  [fieldNames.SERVICE_REQUEST_NUMBER]: {
    handleChange,
  },
  [fieldNames.SERVICE_REQUEST_STATUS]: {
    handleChange,
  },
  [fieldNames.JOB_NUMBER]: {
    handleChange,
  },
  [fieldNames.JOB_STATUS]: {
    handleChange,
  },
  [fieldNames.VEHICLE_REGISTRATION_NUMBER]: {
    handleChange,
  },
  [fieldNames.PARKING_LOCATION]: {
    handleChange,
  },
  [fieldNames.MILESTONE_TYPE]: {
    handleSelect,
  },
  [fieldNames.VENDOR_LOCATION]: {
    handleChange,
  },
};
