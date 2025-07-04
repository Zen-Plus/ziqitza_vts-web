import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Icon } from 'leaflet';
import { Map, Marker, LayersControl } from 'react-leaflet';
import TileConfigLayer from '../../../../components/TileConfigLayer';
import { withMapConfigProvider } from '../../../../providers/withMapConfigProvider';
import Modal from '../../../../components/Modal';
import { getVehicleMarkerPath, getLatLong } from '../../../../common/helpers/vehicles';
import { mapTilePoints, mapApiType } from '../../../../common/constants/map';

// TODO: Remove hardcoded center after integrating api.
const center = [28.464905, 77.055902];

const getIcon = (vehicleDetails) => {
  const iconUrl = getVehicleMarkerPath(vehicleDetails);
  const vehicleMarker = new Icon({
    iconUrl,
    iconAnchor: [-5, 20],
    popupAnchor: [10, -44],
    iconSize: [20, 38],
    shadowSize: [20, 38],
    shadowAnchor: [20, 38],
  });
  return vehicleMarker;
}

function VehicleDetailMap({ selectedVehicleDetails, isModalVisible, setVehicleDetailMapVisiblity, setVehicleDetails, mapConfigData, intl }) {
  const {
    lat,
    lon,
  } = selectedVehicleDetails;
  const vehicleDetailsMapTileObject = mapConfigData && mapConfigData.find((item) => item.touchPoint === mapTilePoints.VTS_DASHBOARD_CURRENT_LOCATION);
  const vehicleDetailsMapTile = vehicleDetailsMapTileObject && vehicleDetailsMapTileObject.mapApiProvider;

  const onCancel = () => {
    setVehicleDetailMapVisiblity({ isSelectedVehicleMapVisible: false, selectedVehicleToView: null });
    setVehicleDetails({ vehicleDetail: {} });
  }

  const onMapCancel = () => {
    setVehicleDetailMapVisiblity({ isSelectedVehicleMapVisible: false });
  }

  return (
    <Modal
      width={590}
      visible={!!isModalVisible}
      footer={false}
      maskClosable={false}
      centered
      onCancel={onCancel}
      mask={false}
      style={{ left: '301px' }}
    >
      <div className='ZiqitzaVTS'>
        <div className='VTSDashboard' style={{ width: '100%', height: '500px' }}>
          <div className="Font--WB Font--S20 Cursor-Pointer" onClick={onMapCancel}>
            <span>
              {`>> `}
              {intl.formatMessage({ id: 'view.vtsDashboard.vehicleDetailsMapModal.title' })}
            </span>
          </div>
          <div className="Mt-20 Divider-Bottom-Gray90" />
          <Map center={getLatLong(lat, lon) || center} zoom={14} zoomControl={false} className='Map-Height'>
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Map Tile">
                <TileConfigLayer
                  layerType={vehicleDetailsMapTile}
                />
              </LayersControl.BaseLayer>
              <LayersControl.Overlay checked name="Marker with popup">
                <Marker
                  position={getLatLong(lat, lon) || [0, 0]}
                  icon={getIcon(selectedVehicleDetails)}
                />
              </LayersControl.Overlay>
            </LayersControl>
          </Map>
        </div>
      </div>
    </Modal>
  )
}

VehicleDetailMap.defaultProps = {
  mapConfigData: [],
};

VehicleDetailMap.propTypes = {
  selectedVehicleDetails: PropTypes.object,
  setVehicleDetailMapVisiblity: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
  setVehicleDetails: PropTypes.func.isRequired,
  mapConfigData: PropTypes.array,
}

export default injectIntl(withMapConfigProvider(VehicleDetailMap, [
  {
    "mapApi": mapApiType.MAP_TILE,
    "touchPoint": mapTilePoints.VTS_DASHBOARD_CURRENT_LOCATION,
  }
]));