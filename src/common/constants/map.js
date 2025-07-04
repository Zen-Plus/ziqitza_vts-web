import { imagesBaseUrl } from './urls';

const mapMyIndiaTileUrl = 'https://mt2.mapmyindia.com/advancedmaps/v1/55nodhf7rm5ba5nfxnvorasc5xub7wgn/still_map/{z}/{x}/{y}.png';
const fullScreenIcon = `<img src='${imagesBaseUrl}maximize-2.svg' alt='Fullscreen icon'>`;
const locationMarkerIcon = `${imagesBaseUrl}location-marker.svg`;
const parkingLocationIcon = `${imagesBaseUrl}parking-location-marker.svg`;
const callerLocationMarkerIcon = `${imagesBaseUrl}caller-location-marker.svg`;
const indiaNorthBounds = [34.430817, 77.203744];
const indiaSouthBounds = [24.268441, 77.541453];
const center = [28.464905, 77.055902];

const mapTilePoints = {
  VTS_DASHBOARD_MAP: 'VTS_DASHBOARD_MAP',
  VTS_DASHBOARD_CURRENT_LOCATION: 'VTS_DASHBOARD_CURRENT_LOCATION',
  LOCATE_CALLER: 'LOCATE_CALLER',
  VTS_NEARBY_ERV_MAP: 'VTS_NEARBY_ERV_MAP',
  TRIP_REPLAY_MAP: 'TRIP_REPLAY_MAP',
  DISPATCH_NEARBY_ERV_MAP: 'DISPATCH_NEARBY_ERV_MAP',
};

const mapApiType = {
  MAP_TILE: 'MAP_TILE',
  REVERSE_GEOCODING: 'REVERSE_GEOCODING',
  GEOCODING: 'GEOCODING',
}

export {
  mapMyIndiaTileUrl,
  fullScreenIcon,
  locationMarkerIcon,
  parkingLocationIcon,
  callerLocationMarkerIcon,
  indiaNorthBounds,
  indiaSouthBounds,
  center,
  mapTilePoints,
  mapApiType,
};
