import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  Marker,
  ZoomControl,
  FeatureGroup,
  LayersControl,
  Tooltip,
} from 'react-leaflet';
import TileConfigLayer from '../../components/TileConfigLayer';
import { Icon as Icons, divIcon as DivIcon, latLngBounds } from 'leaflet';
import Control from 'react-leaflet-control';
import Modal from '../Modal';
import Legend from './Legend';
import { getLatLong } from '../../common/helpers/vehicles';
import { getVehicleMarkerPath } from '../../common/helpers/map';
import {
  callerLocationMarkerIcon,
  indiaNorthBounds,
  indiaSouthBounds,
  center,
  mapTilePoints,
} from '../../common/constants/map';
import Icon from '../../components/Icon';
import { getTimeToDisplay, getDistance } from '../../common/helpers/commonUtils';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { withNotificationProvider, NotificationContext } from '../../providers/withNotificationProvider';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { prepareErrorMessage } from '../../common/helpers/notification';



const getIcon = (vehicleDetails) => {
  const iconUrl = getVehicleMarkerPath(vehicleDetails);
  const vehicleMarker = new DivIcon({
    className: 'vehicle-marker',
    html: `<img 
    style="transform: rotate(${vehicleDetails.vehicleAngle}deg);"
    height="30" 
    width="20" 
    src='${iconUrl}'>`,
  });

  return vehicleMarker;
};


const markerIcon = new Icons({
  iconUrl: callerLocationMarkerIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 32],
});

function ErvOnMap({
  isVisible,
  listDetails,
  callerLocation,
  onCancel,
  addressDetail,
  intl,
  mapType,
  dateRef,
  mapConfigData,
}) {
  const mapProps = {};
  const notifications = useContext(NotificationContext);
  const mapTileObject = mapConfigData && mapConfigData.find((item) => item.touchPoint === mapTilePoints.DISPATCH_NEARBY_ERV_MAP);
  const mapTile = mapTileObject && mapTileObject.mapApiProvider;
  const renderMarkers = () => {
    let markers = [];
    markers = listDetails && listDetails.map((listDetail) => (
      <Marker
        position={getLatLong(listDetail.vehicleLat,
          listDetail.vehicleLon)
                    || [0, 0]}
        icon={getIcon(listDetail)}
        key={listDetail.id}
      >
        <Tooltip className="ErvOnMap-Marker-TootlTip">
          <div>
            {listDetail.registrationNumber}
            {' | '}
            {listDetail.roadDistance ? getDistance(listDetail.roadDistance) : 'NA'}
            {' | '}
            {listDetail.status}
            {' | '}
            {listDetail.timeSinceLastJob ? getTimeToDisplay(listDetail.timeSinceLastJob, dateRef && dateRef.current, intl) : 'NA' }
          </div>
        </Tooltip>
      </Marker>
    ));
    return markers;
  };

  if (!callerLocation) {
    mapProps.bounds = latLngBounds(indiaNorthBounds, indiaSouthBounds);
  } else {
    mapProps.center = callerLocation;
  }

  useEffect(() => {
      if (isVisible && !mapTile) {
        notifications.pushNotification(prepareErrorMessage({ code: 'SERVICE_NOT_AVAILABLE' }));
      }
  }, [isVisible]);

  return (
    <Modal
      width={1060}
      visible={isVisible}
      footer={false}
      maskClosable={false}
      centered
      onCancel={onCancel}
      wrapClassName="Dispatch-ErvOnMap"
    >
      <div className="Ml-20 Font--S20 Font--WB" style={{ paddingTop: '20px' }}>
        {addressDetail}
      </div>
      <Notification
        components={{ Icon }}
        notifications={notifications.notifications}
        removeNotification={notifications.removeNotification}
      />
      <Map zoom={10} zoomControl={false} className="Map-Height Mt-20" center={center} {...mapProps}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map Tile">
            <TileConfigLayer
              layerType={mapTile}
            />
          </LayersControl.BaseLayer>
          <ZoomControl position="topright" />
          <LayersControl.Overlay checked name="Marker with popup">
            <FeatureGroup>
              {renderMarkers()}
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked={callerLocation && !!callerLocation.length} name="search center">
            <FeatureGroup color="purple">
              <Marker zIndexOffset={5} position={callerLocation || center} icon={markerIcon} />
            </FeatureGroup>
          </LayersControl.Overlay>
          <Control position="topright">
            <Legend />
          </Control>
        </LayersControl>
      </Map>
    </Modal>
  );
}

ErvOnMap.defaultProps = {
  callerLocation: false,
  isFetching: false,
  addressDetail: 'N/A',
  mapType: 'MAPMYINDIA',
  mapConfigData: [],
};

ErvOnMap.propTypes = {
  listDetails: PropTypes.array.isRequired,
  callerLocation: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  isFetching: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  addressDetail: PropTypes.string,
  intl: PropTypes.object.isRequired,
  dateRef: PropTypes.object.isRequired,
  mapType: PropTypes.string,
  mapConfigData: PropTypes.object,
};

export default withNotificationProvider(withUserConfigProvider(withIntlProvider(ErvOnMap)));
