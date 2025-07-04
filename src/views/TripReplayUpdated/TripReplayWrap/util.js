import dayjs from "dayjs";
import { isNullOrUndefined } from "../../../common/helpers/commonUtils";


export const searchParameter = {
  JOB_ID : "JOB_ID",
  OFF_ROAD_TICKET_ID : "OFF_ROAD_TICKET_ID",
  FUEL_TICKET_ID : "FUEL_TICKET_ID",
  VEHICLE_REGISTRATION_NUMBER : "VEHICLE_REGISTRATION_NUMBER",
}


export const tripMilestoneValues = {
  JOB_START: 'Trip Start',
  ON_SCENE: 'Pickup',
  PATIENT_DROPPED: 'Drop Off',
  TRIP_COMPLETE: 'Trip Complete',
  START: 'Start',
  END: 'End',
};


export function createTripReplayPacketPayload(tripSummary, searchData = {}, locationRequired) {
  let _values = { };
  const { searchParameter: searchParameterValue, dateRange = [], imei = '', packetFrequency = null} = searchData;
  if(searchParameterValue && searchParameterValue.id === searchParameter.VEHICLE_REGISTRATION_NUMBER) {
    _values.startTime = dateRange && dateRange[0] && dayjs(dateRange[0]).valueOf();
    _values.endTime = dateRange && dateRange[0] && dayjs(dateRange[1]).valueOf();
    _values.deviceImei = imei;
    _values.packetFrequency = packetFrequency;
    _values.isLocationRequired = locationRequired;
  } else {
    _values = { ...tripSummary };
    _values.startTime = tripSummary.startedOn;
    _values.endTime = tripSummary.endedOn;
    _values.isTripReplayReport = true;
  }  

  _values.sortBy = "ts";
  _values.sortDirection = "ASC";
  _values.pageSize = 200;
  _values.pageNumber = 0;
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

export function createSearchJobPayload(values, isLocationRequired) {
  const _values = {};
  _values.jobNumber = values.searchValue;
  _values.isLocationRequired = isLocationRequired;

  return _values;
}

export function createSearchStPayload(values, isLocationRequired) {
  const _values = {};
  _values.supportTicketNumber = values.searchValue;
  _values.tripReplayParameter = values.searchParameter && values.searchParameter.id; 
  _values.isLocationRequired = isLocationRequired;


  return _values;
}

export function createSearchVehiclePayload(values) {
  const _values = {};
  _values.vehicleRegistrationNumber = values.searchValue;
  
  return _values;
}