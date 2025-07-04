import dayjs from "dayjs";
import { isNullOrUndefined } from "../../../common/helpers/commonUtils";

const fieldNames = {
  DEVICE_IMEI: "DEVICE_IMEI",
  DROP_LOCATION: "DROP_LOCATION",
  DROP_LOCATION_TYPE: "DROP_LOCATION_TYPE",
  EMERGENCY_LOCATION: "EMERGENCY_LOCATION",
  JOB_ID: "JOB_ID",
  JOB_NUMBER: "JOB_NUMBER",
  PARKING_BAY: "PARKING_BAY",
  PARKING_BAY_LOCATION: "PARKING_BAY_LOCATION",
  SERVICE_REQUEST: "SERVICE_REQUEST",
  TRIP_END_LOCATION: "TRIP_END_LOCATION",
  TRIP_END_LOCATION_TYPE: "TRIP_END_LOCATION_TYPE",
  TRIP_END_SOURCE: "TRIP_END_SOURCE",
  TRIP_END_TIME: "TRIP_END_TIME",
  TRIP_START_LOCATION: "TRIP_START_LOCATION",
  TRIP_START_LOCATION_TYPE: "TRIP_START_LOCATION_TYPE",
  TRIP_START_TIME: "TRIP_START_TIME",
  VEHICLE_NUMBER: "VEHICLE_NUMBER",
  TRIP_DISTANCE_CALCULATION_TIME: "TRIP_DISTANCE_CALCULATION_TIME",
  DISPATCH: "DISPATCH",
  JOB_START: "JOB_START",
  ON_SCENE: "ON_SCENE",
  ON_BOARD: "ON_BOARD",
  REACHED_DROP_LOCATION: "REACHED_DROP_LOCATION",
  PATIENT_DROPPED: "PATIENT_DROPPED",
  MILESTONE: "MILESTONE",
  TRIP_COMPLETE: 'TRIP_COMPLETE',
};

//emeregency drop, parking
export function getInitialJobData(values) {
  const _values = {};
  const { jobBasicDetailsList = [], jobMilestoneDetail = [] } = values;

  jobBasicDetailsList.map((item) => {
    if (item.jobAuditParameter) {
      _values[item.jobAuditParameter] = item.value;
    }
  });
  jobMilestoneDetail.map((item) => {
    if (item.jobAuditParameter) {
      _values[item.jobAuditParameter] = { ...item };
    }
  });
  return _values;
}

export function createTripReplayPacketPayload(values) {
  const _values = {};
  _values.deviceImei = !isNullOrUndefined(values[fieldNames.DEVICE_IMEI])
    ? values[fieldNames.DEVICE_IMEI]
    : null;
  _values.distanceCalculationTime = !isNullOrUndefined(
    values[fieldNames.TRIP_DISTANCE_CALCULATION_TIME]
  )
    ? values[fieldNames.TRIP_DISTANCE_CALCULATION_TIME]
    : null;
  _values.endTime = !isNullOrUndefined(values[fieldNames.TRIP_END_TIME])
    ? values[fieldNames.TRIP_END_TIME]
    : null;
  _values.jobId = !isNullOrUndefined(values[fieldNames.JOB_ID])
    ? values[fieldNames.JOB_ID]
    : null;
  _values.startTime = !isNullOrUndefined(values[fieldNames.TRIP_START_TIME])
    ? values[fieldNames.TRIP_START_TIME]
    : null;

  _values.sortBy = "ts";
  _values.sortDirection = "ASC";
  _values.pageSize = 200;
  _values.pageNo = 0;
  return _values;
}

export function convertPacketsIntoLatLng(values = []) {
  const _values = [];
  if (Array.isArray(values)) {
    values.map((item) => {
      if (
        !isNullOrUndefined(item.latitude) &&
        !isNullOrUndefined(item.longitude)
      ) {
        _values.push([item.latitude, item.longitude]);
      }
    });
  }
  return _values;
}

function convertStringToLatLng(string) {
  if (string && string !== 'null,null') {
    const _splitString = string.split(",");
    return { lat: _splitString[0], lng: _splitString[1] };
  }
  return false;
}

export function createLocationMarkerList(values = {}) {
  const _values = [];
  if (values[fieldNames.EMERGENCY_LOCATION]) {
    const { lat, lng } = convertStringToLatLng(values[fieldNames.EMERGENCY_LOCATION]);
    _values.push({
      lat,
      lng,
      id: fieldNames.EMERGENCY_LOCATION,
      zIndex: 2,
    });
  }
  if (values[fieldNames.DROP_LOCATION]) {
    const { lat, lng } = convertStringToLatLng(values[fieldNames.DROP_LOCATION]);
    _values.push({
      lat,
      lng,
      id: fieldNames.DROP_LOCATION,
    });
  }
  if (values[fieldNames.PARKING_BAY_LOCATION]) {
    const { lat, lng } = convertStringToLatLng(values[fieldNames.PARKING_BAY_LOCATION]);
    _values.push({
      lat,
      lng,
      id: fieldNames.PARKING_BAY_LOCATION,
      name: values[fieldNames.PARKING_BAY],
      zIndex: 3,
    });
  }
  if (values[fieldNames.JOB_START] && values[fieldNames.JOB_START].crewLocation) {
    const { lat, lng } = convertStringToLatLng(values[fieldNames.JOB_START].crewLocation);
    _values.push({
      lat,
      lng,
      id: fieldNames.JOB_START,
      iconName: fieldNames.MILESTONE,
      dateTime: values[fieldNames.JOB_START].crewReportedTime ? dayjs(values[fieldNames.JOB_START].crewReportedTime).format('DD MMM YYYY / hh:mm:ss') : null,
      zIndex: 1,
    });
  }
  if (values[fieldNames.ON_BOARD]) {
    const { lat, lng } = convertStringToLatLng(values[fieldNames.ON_BOARD] && values[fieldNames.ON_BOARD].crewLocation);
    _values.push({
      lat,
      lng,
      id: fieldNames.ON_BOARD,
      dateTime: values[fieldNames.ON_BOARD].crewReportedTime ? dayjs(values[fieldNames.ON_BOARD].crewReportedTime).format('DD MMM YYYY / hh:mm:ss') : null,
      iconName: fieldNames.MILESTONE,
    });
  }
  if (values[fieldNames.REACHED_DROP_LOCATION]) {
    const { lat, lng } = convertStringToLatLng(values[fieldNames.REACHED_DROP_LOCATION] && values[fieldNames.REACHED_DROP_LOCATION].crewLocation);
    _values.push({
      lat,
      lng,
      id: fieldNames.REACHED_DROP_LOCATION,
      dateTime: values[fieldNames.REACHED_DROP_LOCATION].crewReportedTime ? dayjs(values[fieldNames.REACHED_DROP_LOCATION].crewReportedTime).format('DD MMM YYYY / hh:mm:ss') : null,
      iconName: fieldNames.MILESTONE,
    });
  }
  if (values[fieldNames.TRIP_COMPLETE]) {
    const { lat, lng } = convertStringToLatLng(values[fieldNames.TRIP_COMPLETE] && values[fieldNames.TRIP_COMPLETE].crewLocation);
    _values.push({
      lat,
      lng,
      id: fieldNames.TRIP_COMPLETE,
      dateTime: values[fieldNames.TRIP_COMPLETE].crewReportedTime ? dayjs(values[fieldNames.TRIP_COMPLETE].crewReportedTime).format('DD MMM YYYY / hh:mm:ss') : null,
      iconName: fieldNames.MILESTONE,
    });
  }
  return _values;
}

export function getMarkerProps(milestone) {
  let _props = {
    iconAnchor: [7, 15],
    popupAnchor: [0, -15],
    iconSize: [15, 15],
    shadowSize: [15, 15],
    shadowAnchor: [15, 15],
  };
  if (milestone && milestone.id) {
    if (milestone.id === fieldNames.JOB_START) {
      _props = {
        iconAnchor: [12, 25],
        popupAnchor: [0, -25],
        iconSize: [25, 25],
        shadowSize: [25, 25],
        shadowAnchor: [25, 25],
      };
    } else if (milestone.id === fieldNames.EMERGENCY_LOCATION) {
      _props = {
        iconAnchor: [10, 21],
        popupAnchor: [0, -21],
        iconSize: [21, 21],
        shadowSize: [21, 21],
        shadowAnchor: [21, 21],
      };
    } else if (milestone.id === fieldNames.PARKING_BAY) {
      _props = {
        iconAnchor: [8, 17],
        popupAnchor: [0, -17],
        iconSize: [17, 17],
        shadowSize: [17, 17],
        shadowAnchor: [17, 17],
      };
    }
  }
  return _props;
};