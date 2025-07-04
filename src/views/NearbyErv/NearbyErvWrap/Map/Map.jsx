import React from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  Marker,
  Circle,
  ZoomControl,
  FeatureGroup,
  LayersControl,
  Tooltip,
} from 'react-leaflet';
import TileConfigLayer from '../../../../components/TileConfigLayer';
import { Icon, divIcon, latLngBounds } from 'leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import Control from 'react-leaflet-control';
import Legend from './Legend';
import { getVehicleMarkerPath, getLatLong } from '../../../../common/helpers/vehicles';
import { fullScreenIcon, locationMarkerIcon, parkingLocationIcon } from '../../../../common/constants/map';
import { convertMeter } from '../../../../common/helpers/commonUtils';


// TODO: Remove hardcoded center after integrating api.
const indiaNorthBounds = [34.430817, 77.203744];
const indiaSouthBounds = [24.268441, 77.541453];
const center = [28.464905, 77.055902];

const getIcon = (vehicleDetails) => {
  const iconUrl = getVehicleMarkerPath(vehicleDetails);

  const vehicleMarker = new divIcon({
    className: 'vehicle-marker',
    html: `<img 
    style="transform: rotate(${vehicleDetails.angle}deg);"
    height="30" 
    width="20" 
    src='${iconUrl}'>`,
  });

  return vehicleMarker;
};


const parkingIcon = new Icon({
  iconUrl: parkingLocationIcon,
  iconSize: [30, 30],
  iconAnchor: [10, 15],
  tooltipAnchor: [-5, 0],
});

const markerIcon = new Icon({
  iconUrl: locationMarkerIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 24],
});

function VehiclesMap({
  listDetails,
  searchLatLng,
  parkingBayDetails,
  distanceRange,
  mapTile,
}) {
  const mapProps = {};
  const renderMarkers = () => {
    let markers = [];
    markers = listDetails.map((listDetail) => (
      <Marker
        position={getLatLong(listDetail.vehicleLatLong && listDetail.vehicleLatLong.latitude, listDetail.vehicleLatLong && listDetail.vehicleLatLong.longitude) || [0, 0]}
        icon={getIcon(listDetail)}
        key={listDetail.id}
      >
        <Tooltip className="NearbyErv-Marker-Popup">
          <div>
            {listDetail.registrationNumber}
            {' | '}
            {' '}
            {listDetail.aerialDistance && convertMeter(listDetail.aerialDistance, 'km', 0)}
            {' '}
            {' / '}
            {' '}
            {listDetail.roadDistance && convertMeter(listDetail.roadDistance, 'km', 0)}
          </div>
        </Tooltip>
      </Marker>
    ));
    return markers;
  };

  const renderParkingLocations = () => {
    const _parkingMarkers = parkingBayDetails.map((detail) => (
      <Marker
        position={getLatLong(detail.latitude, detail.longitude)}
        icon={parkingIcon}
        key={detail.id}
        onMouseOver={(e) => {
          e.target.openPopup();
        }}
        onMouseOut={(e) => {
          e.target.closePopup();
        }}
      >
        <Tooltip className="NearbyErv-Marker-Popup">
          <div>
            {detail.name}
          </div>
        </Tooltip>
      </Marker>
    ));
    return _parkingMarkers;
  };

  if (!searchLatLng) {
    mapProps.bounds = latLngBounds(indiaNorthBounds, indiaSouthBounds);
  } else {
    mapProps.center = searchLatLng;
  }

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <Map zoom={12} zoomControl={false} className="map-z-index" center={center} {...mapProps}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map Tile">
          <TileConfigLayer
            layerType={mapTile}
          />
          </LayersControl.BaseLayer>
          <ZoomControl position="topright" />
          <LayersControl.Overlay checked={searchLatLng && !!searchLatLng.length} name="Marker with popup">
            <FeatureGroup>
              {renderMarkers()}
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Parking Locations">
            <FeatureGroup>
              {renderParkingLocations()}
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked={searchLatLng && !!searchLatLng.length} name="search center">
            <FeatureGroup color="purple">
              <Circle center={searchLatLng || [0, 0]} radius={distanceRange} />
              <Marker zIndexOffset={5} position={searchLatLng || [0, 0]} icon={markerIcon} />
            </FeatureGroup>
          </LayersControl.Overlay>
          <FullscreenControl
            position="topright"
            content={fullScreenIcon}
            forceSeparateButton
          />
          <Control position="topright">
            <Legend />
          </Control>
        </LayersControl>
      </Map>
    </div>
  );
}

VehiclesMap.defaultProps = {
  searchLatLng: false,
  isFetching: false,
  parkingBayDetails: [],
  distanceRange: 0,
  mapTile: '',
};

VehiclesMap.propTypes = {
  listDetails: PropTypes.array.isRequired,
  searchLatLng: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  isFetching: PropTypes.bool,
  parkingBayDetails: PropTypes.array,
  distanceRange: PropTypes.number,
  mapTile: PropTypes.string,
};

export default VehiclesMap;
