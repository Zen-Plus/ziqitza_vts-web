import getConfig from 'next/config';
import { imagesBaseUrl, mapMyIndiaUrl } from '../constants/urls';

export const getMapMyIndiaTileLayerUrl = () => {
  const { publicRuntimeConfig } = getConfig();
  const { mapMyIndiaKey } = publicRuntimeConfig;
  return `${mapMyIndiaUrl}${mapMyIndiaKey}/still_map/{z}/{x}/{y}.png`;
};

export const getVehicleMarkerPath = (vehicleDetails) => {
  let _iconUrl = '';
  const vehicleType = vehicleDetails
    && vehicleDetails.type
    && vehicleDetails.type.toLowerCase();

  let vehicleStatus = vehicleDetails
    && vehicleDetails.trackingStatus
    && vehicleDetails.trackingStatus.toLowerCase().replace(/ /g, '_');
  
  if(['halt', 'stop', 'idle'].includes(vehicleStatus)) {
    vehicleStatus = 'parked';
  }
  if(['out_of_service'].includes(vehicleStatus)) {
    vehicleStatus = 'no_response';
  }

  const isBackup = vehicleDetails && vehicleDetails.isBackup;

  if (isBackup) {
    _iconUrl = `${imagesBaseUrl}${vehicleType}-backup.svg`;
  } else {
    _iconUrl = `${imagesBaseUrl}${vehicleType}-${vehicleStatus}.svg`;
  }
  return _iconUrl;
};


export default {
  getMapMyIndiaTileLayerUrl,
  getVehicleMarkerPath,
};
