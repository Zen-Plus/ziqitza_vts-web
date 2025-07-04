import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import {
  Map,
  Marker,
  Circle,
  ZoomControl,
  FeatureGroup,
  LayersControl,
  Popup,
} from 'react-leaflet';
import { withMapConfigProvider } from '../../../../providers/withMapConfigProvider';
import TileConfigLayer from '../../../../components/TileConfigLayer';
import { Icon, divIcon, latLngBounds, latLng } from 'leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import Control from 'react-leaflet-control';
import Icons from '../../../../components/Icon';
import Legend from './Legend';
import { getVehicleMarkerPath, getLatLong } from '../../../../common/helpers/vehicles';
import { fullScreenIcon, locationMarkerIcon, mapTilePoints, mapApiType } from '../../../../common/constants/map';
import { isNullOrUndefined } from '../../../../common/helpers/commonUtils';

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

const markerIcon = new Icon({
  iconUrl: locationMarkerIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 24],
});

const getBounds = (vehicleList) => {
  let bounds;
  let _latlongArray;
  _latlongArray = vehicleList.filter((vehicle) => (
    !isNullOrUndefined(vehicle.lat)
    && !isNullOrUndefined(vehicle.lon)))
    .map((vehicle) => latLng(vehicle.lat, vehicle.lon));
  if (_latlongArray.length === 0) {
    bounds = latLngBounds(indiaNorthBounds, indiaSouthBounds);
  } else {
    bounds = latLngBounds(_latlongArray);
  }
  return bounds;
};

function VehiclesMap({
  setVehicleConfig,
  listDetails, 
  searchCenter, 
  isFetching, 
  vehicleConfig,
  mapConfigData,
  intl,
}) {
  const [mapBounds, setMapBounds] = useState();
  const mapProps = {};
  const dashboardMapTileObject = mapConfigData && mapConfigData.find((item) => item.touchPoint === mapTilePoints.VTS_DASHBOARD_MAP);
  const dashboardMapTile = dashboardMapTileObject && dashboardMapTileObject.mapApiProvider;
  const renderMarkers = () => {
    let markers = [];
    markers = listDetails.map((listDetail) => (
      <Marker
        position={getLatLong(listDetail.lat, listDetail.lon) || [0, 0]}
        icon={getIcon(listDetail)}
        onclick={() => { setVehicleConfig({ selectedVehicleToView: listDetail }); }}
        key={listDetail.id}
        onMouseOver={e => {
          e.target.openPopup();
        }}
        onMouseOut={e => {
          e.target.closePopup();
        }}
      >
        <Popup style={{ padding: '5px' }} closeButton={false}>
          <div>
            {intl.formatMessage({ id: 'label.registrationNoWithNumber' }, { number: listDetail.registrationNumber })}
          </div>
          <div>
            {intl.formatMessage({ id: 'label.vehicleTypeWithType' }, { type: listDetail.vehicleType })}
          </div>
        </Popup>
      </Marker>
    ));
    return markers;
  };
  useEffect(() => {
    if (listDetails.length && !vehicleConfig.mapClicked) {
      const _mapBounds = getBounds(listDetails);
      setMapBounds(_mapBounds);
    } else if (listDetails.length === 0 && !vehicleConfig.mapClicked) {
      setMapBounds(latLngBounds(indiaNorthBounds, indiaSouthBounds));
    }
  }, [listDetails]);

  if (!vehicleConfig.mapClicked) {
    mapProps.bounds = mapBounds;
  }
  if (searchCenter) {
    mapProps.center = searchCenter;
  }
  const handleMapClick = () => {
    if (!vehicleConfig.mapClicked) {
      setVehicleConfig({ mapClicked: true });
    }
  };
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <Map onmouseup={handleMapClick} zoom={10} zoomControl={false} className="map-z-index" center={center} {...mapProps}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map Tile">
          <TileConfigLayer
            layerType={dashboardMapTile}
          />
          </LayersControl.BaseLayer>
          <ZoomControl position="topright" />
          <LayersControl.Overlay checked name="Marker with popup">
            <FeatureGroup>
              {renderMarkers()}
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked={searchCenter && !!searchCenter.length} name="search center">
            <FeatureGroup color="purple">
              <Circle center={searchCenter || [0, 0]} radius={vehicleConfig.distanceRange} />
              <Marker zIndexOffset={5} position={searchCenter || [0, 0]} icon={markerIcon} />
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
      {
        !listDetails.length && !searchCenter && !isFetching
        && (
        <div style={{
          position: 'absolute', zIndex: '2', top: '45%', left: '40%', width: '20%',
        }}
        >
          <div style={{ textAlign: 'center' }}>
            <Icons name="search-not-found-bg-white" />
          </div>
          <div
            className="Box--Shadow BorderRadius--Base"
            style={{
              marginTop: '15px', padding: '5px', textAlign: 'center', backgroundColor: 'white',
            }}
          >
            {intl.formatMessage({ id: 'label.noRecordsFound' })}
          </div>
        </div>
        )
      }
    </div>
  );
}

VehiclesMap.defaultProps = {
  searchCenter: false,
  isFetching: false,
  mapConfigData: [],
};

VehiclesMap.propTypes = {
  intl: PropTypes.object.isRequired,
  setVehicleConfig: PropTypes.func.isRequired,
  listDetails: PropTypes.array.isRequired,
  vehicleConfig: PropTypes.object.isRequired,
  searchCenter: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  isFetching: PropTypes.bool,
  mapConfigData: PropTypes.array,
};

export default injectIntl(withMapConfigProvider(VehiclesMap, [
  {
    "mapApi": mapApiType.MAP_TILE,
    "touchPoint": mapTilePoints.VTS_DASHBOARD_MAP,
  },
]));
