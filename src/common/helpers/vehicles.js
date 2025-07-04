import { convertMilliSeconds } from './transformers';
import { trackingStatusEnums } from '../constants/vehicleStatuses';
import { imagesBaseUrl } from '../constants/urls';
import { validateLatitude, validateLongitude } from './validators';
import { isNullOrUndefined } from './commonUtils'

const getTimeDifference = (startDate, endDate) => {
  return (endDate.getTime() - startDate.getTime());
}

const checkIfPlural = (value) => (value > 1);

const getTimeToDisplay = (date, intl) => {
  let timeToDisplay = '';

  const startDate = new Date(date);
  const endDate = new Date();

  const milliSeconds = getTimeDifference(startDate, endDate);
  const {
    day,
    hour,
    minute,
    seconds,
  } = convertMilliSeconds(milliSeconds);

  if (day && !hour) {
    timeToDisplay = intl.formatMessage({ id: `label.day${checkIfPlural(day) ? 's' : ''}` }, { day });
  } else if (day && hour) {
    timeToDisplay = intl.formatMessage({ id: `label.day${checkIfPlural(day) ? 's' : ''}Hour${checkIfPlural(hour) ? 's' : ''}` }, { day, hour });
  } else if (hour && !minute) {
    timeToDisplay = intl.formatMessage({ id: `label.hour${checkIfPlural(hour) ? 's' : ''}` }, { hour });
  } else if (hour && minute) {
    timeToDisplay = intl.formatMessage({ id: `label.hour${checkIfPlural(hour) ? 's' : ''}Minute${checkIfPlural(minute) ? 's' : ''}` }, { hour, minute });
  } else if (minute && !seconds) {
    timeToDisplay = intl.formatMessage({ id: `label.minute${checkIfPlural(minute) ? 's' : ''}` }, { minute });
  } else if (minute && seconds) {
    timeToDisplay = intl.formatMessage({ id: `label.minute${checkIfPlural(minute) ? 's' : ''}Second${checkIfPlural(seconds) ? 's' : ''}` }, { minute, seconds });
  } else if (!minute && seconds) {
    timeToDisplay = intl.formatMessage({ id: `label.second${checkIfPlural(seconds) ? 's' : ''}` }, { seconds });
  }

  return timeToDisplay;
}

const getHighestPriorityTab = (vehiclesCountPerTab) => {
  const {
    deviceMalfunctioningCount,
    movingCount,
    parkedCount,
    unauthorizedCount,
    noResponseCount,
    offRoadCount,
  } = vehiclesCountPerTab;

  let highestPriorityTabAvailable = '';

  if (unauthorizedCount) {
    highestPriorityTabAvailable = trackingStatusEnums.UNAUTHORIZED;
  } else if (deviceMalfunctioningCount) {
    highestPriorityTabAvailable = trackingStatusEnums.DEVICE_MALFUNCTIONING;
  } else if (noResponseCount) {
    highestPriorityTabAvailable = trackingStatusEnums.NO_RESPONSE;
  } else if (parkedCount) {
    highestPriorityTabAvailable = trackingStatusEnums.PARKED;
  } else if (movingCount) {
    highestPriorityTabAvailable = trackingStatusEnums.MOVING;
  } else {
    highestPriorityTabAvailable = trackingStatusEnums.ALL;
  }

  return highestPriorityTabAvailable;
}

const fieldNames = {
  'vehicalRegNo|IMEINo': ' Vehical Reg. No. | IMEI No.',
  'make|model': 'Make | Model',
  'vehicleOwner|number': ' Vehicle Owner | Number',
  'clusterLeader1|number1': 'Cluster Leader 1 | Number 1',
  'clusterLeader2|number2': 'Cluster Leader 2 | Number 2',
  'district|parkingLoc': ' District | Parking Loc',
  'pilotContact1|contact2': ' Pilot Contact 1 | Contact 2',
  'lastReportedLocation': 'Last Reported Location',
  'offRoadreason': 'Off-Road Reason',
  'speedGps': 'Speed(GPS)',
  'speedObd': 'Speed(OBD)',
  'odometerReadingGps': 'Odometer Reading(GPS)',
  'odometerReadingObd': 'Odometer Reading(OBD)',
  'gpsBatteryLevel': 'GPS Battery Level',
  'fuelSensorReading': 'Fuel Sensor Reading',
  'acceleratorSensor': 'Accelerator Sensor',
  'tyreAirPressure': 'Tyre Air Pressure (FL|FR|RL|RR)',
  'engineControlUnit': 'Engine Control Unit',
  'safetyBelt': 'Safety Belt',
}

const getFieldValue = (fieldName, vehicleDetails) => {
  let fieldValue = '';
  const {
    accelerationSensor,
    gpsbatteryLevel,
    clusterLeaderName1,
    clusterLeaderNumber1,
    clusterLeaderName2,
    clusterLeaderNumber2,
    district,
    engineControlUnit,
    fuelSensorReading,
    imeiNumber,
    isBackup,
    lat,
    lon,
    make,
    model,
    odometerReadingGps,
    odometerReadingObd,
    offRoadReason,
    parkingBay,
    pilotContact1,
    pilotContact2,
    registrationNumber,
    safetyBelt,
    speedGps,
    speedObd,
    tyreAirPressure,
    vendorName,
    vendorNumber,
    vehicleType,
  } = vehicleDetails;

  switch (fieldName) {
    case fieldNames['vehicalRegNo|IMEINo']:
      fieldValue = `${registrationNumber || 'NA'} | ${imeiNumber || 'NA'}`;
      break;
    case fieldNames['make|model']:
      fieldValue = `${make || 'NA'} | ${model || 'NA'} ${vehicleType ? `- (${vehicleType}${isBackup ? ' | Backup' : ''})` : ''}`;
      break;
    case fieldNames['vehicleOwner|number']:
      fieldValue = `${vendorName || 'NA'} | ${vendorNumber || 'NA'}`;
      break;
    case fieldNames['clusterLeader1|number1']:
      fieldValue = `${clusterLeaderName1 || 'NA'} | ${clusterLeaderNumber1 || 'NA'}`;
      break;
    case fieldNames['clusterLeader2|number2']:
      fieldValue = `${clusterLeaderName2 || 'NA'} | ${clusterLeaderNumber2 || 'NA'}`;
      break;
    case fieldNames['district|parkingLoc']:
      fieldValue = `${district || 'NA'} | ${parkingBay || 'NA'}`;
      break;
    case fieldNames['pilotContact1|contact2']:
      fieldValue = `${pilotContact1 || 'NA'} | ${pilotContact2 || 'NA'}`;
      break;
    case fieldNames['lastReportedLocation']:
      fieldValue = !(isNullOrUndefined(lat) && isNullOrUndefined(lon)) ? `${lat}, ${lon}` : 'NA';
      break;
    case fieldNames['offRoadreason']:
      fieldValue = `${offRoadReason || 'NA'}`;
      break;
    case fieldNames['speedGps']:
      fieldValue = !isNullOrUndefined(speedGps) ? `${speedGps} km/h`: 'NA';
      break;
    case fieldNames['speedObd']:
      fieldValue = !isNullOrUndefined(speedObd) ?`${speedObd} km/h` : 'NA';
      break;
    case fieldNames['odometerReadingGps']:
      fieldValue = !isNullOrUndefined(odometerReadingGps) ? odometerReadingGps : 'NA';
      break;
    case fieldNames['odometerReadingObd']:
      fieldValue = !isNullOrUndefined(odometerReadingObd) ? odometerReadingObd : 'NA';
      break;
    case fieldNames['gpsBatteryLevel']:
      fieldValue = (gpsbatteryLevel) ? `${gpsbatteryLevel}%` : 'NA';
      break;
    case fieldNames['fuelSensorReading']:
      fieldValue = `${fuelSensorReading || 'NA'}`;
      break;
    case fieldNames['acceleratorSensor']:
      fieldValue = !isNullOrUndefined(accelerationSensor) ? accelerationSensor : 'NA';
      break;
    case fieldNames['tyreAirPressure']:
      fieldValue = `${tyreAirPressure || 'NA'}`;
      break;
    case fieldNames['engineControlUnit']:
      fieldValue = `${engineControlUnit || 'NA'}`;
      break;
    case fieldNames['safetyBelt']:
      fieldValue = `${safetyBelt || 'NA'}`;
      break;
    default:
      fieldValue = '';
      break;
  }
  return fieldValue;
}

const vehicleStatus = {
  ALL: 'all',
  DEVICE_MALFUNCTIONING: 'deviceMalfunctioningCount',
  MOVING: 'movingCount',
  OFF_ROAD: 'offRoadCount',
  OUT_OF_SERVICE: 'outOfServiceCount',
  PARKED: 'parkedCount',
  UNAUTHORIZED: 'unauthorizedCount',
  NO_RESPONSE: 'noResponseCount',
};

const getVehicleMarkerPath = (vehicleDetails) => {
  let _iconUrl = "";
  const vehicleType =
    vehicleDetails &&
    vehicleDetails.vehicleType &&
    vehicleDetails.vehicleType.toLowerCase();

  const vehicleStatus =
    vehicleDetails &&
    vehicleDetails.trackingStatus &&
    vehicleDetails.trackingStatus.toLowerCase().replace(/ /g, "_");

  const isBackup = vehicleDetails && vehicleDetails.isBackup;

  if (isBackup) {
    _iconUrl = `${imagesBaseUrl}${vehicleType}-backup.svg`;
  } else {
    _iconUrl = `${imagesBaseUrl}${vehicleType}-${vehicleStatus}.svg`;
  }
  return _iconUrl;
};

const getLatLong = (lat, long) => {
  return (!(isNullOrUndefined(lat) &&  isNullOrUndefined(long)) && [lat, long])
}

const getDistance = (distance) => {
  let meters = distance;
  let kilometers = 0;
  let _distance = '';
  if (distance > 1000) {
    kilometers = parseInt(distance / 1000);
    meters = parseInt(distance % 1000);
    _distance = `${kilometers} km ${meters} m`;
  } else {
    _distance = `${distance} m`;
  }
  return _distance;
}

const convertStringToLatLong = (value) => {
  let updatedValues = value.split(',');
  if(updatedValues.length === 2 && validateLatitude(updatedValues[0].trim()) && validateLongitude(updatedValues[1].trim())) {
    updatedValues = updatedValues.map(Number);
    return updatedValues;
  }
  return false;
}
const getDateAndTime = ({ timeStamp, locale = 'en' }) => {
  let dateAndTime = {
    date: null,
    time: null,
  };
  if (timeStamp) {
    const dateFormat = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    const timeFormat = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' });
    dateAndTime = {
      date: dateFormat.format(timeStamp),
      time: timeFormat.format(timeStamp),
    };
  }
  return dateAndTime;
}

const getColorClassForBatteryLevel = (number) => {
  let batteryColor = '';
  if(!isNaN(number) && number){
    if (number < 25) {
      batteryColor = 'Red';
    } else if (number < 75) {
      batteryColor = 'Orange';
    } else {
      batteryColor = 'Green';
    }
  }
  return batteryColor;
};

const getMapMyIndiaTileLayerUrl = (apiKey) => {
  return `https://mt2.mapmyindia.com/advancedmaps/v1/${apiKey}/still_map/{z}/{x}/{y}.png`
}

const getHereMapTileLayerUrl = (apiKey) => {
  return `https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/pedestrian.day/{z}/{x}/{y}/256/png?apiKey=${apiKey}&pois`
}

export {
  getTimeDifference,
  getTimeToDisplay,
  getHighestPriorityTab,
  fieldNames,
  getFieldValue,
  vehicleStatus,
  getVehicleMarkerPath,
  getLatLong,
  getDistance,
  convertStringToLatLong,
  getDateAndTime,
  getColorClassForBatteryLevel,
  getMapMyIndiaTileLayerUrl,
  getHereMapTileLayerUrl,
};