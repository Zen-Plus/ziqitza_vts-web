import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import L, { Icon, latLngBounds, latLng } from 'leaflet';
import {
  Map, Marker, LayersControl, ZoomControl, Popup,
} from 'react-leaflet';
import TileConfigLayer from '../../../../components/TileConfigLayer';
import Control from 'react-leaflet-control';
import FullscreenControl from 'react-leaflet-fullscreen';
import { fullScreenIcon } from '../../../../common/constants/map';
import { getLatLong } from '../../../../common/helpers/vehicles';
import { getLocationMarketPath, milestonePopupTile, getMarkerProps, milestonePopupHeaderTitle } from './utils';
import PolylineDecorator from '../../../../components/PolyLineDecorator/PolyLineDecorator';
import Legend from './Legend';
import { ButtonWithIcon } from '../../../../components/Button';

import ContentWrap from '../../../../components/ContentWrap';
import { searchParameter, tripMilestoneValues } from '../util';

// TODO: Remove hardcoded center after integrating api.
const center = [28.464905, 77.055902];

const getIcon = (milestone) => {
  const iconUrl = getLocationMarketPath(milestone);
  const markerProps = getMarkerProps(milestone);
  const milestoneMarker = new Icon({
    iconUrl,
    ...markerProps,
  });
  return milestoneMarker;
};
const indiaNorthBounds = [34.430817, 77.203744];
const indiaSouthBounds = [24.268441, 77.541453];

const getBounds = (vehicleList) => {
  let bounds;
  let _latlongArray;
  _latlongArray = vehicleList.map((item) => latLng(item[0], item[1]));
  if (_latlongArray.length === 0) {
    bounds = latLngBounds(indiaNorthBounds, indiaSouthBounds);
  } else {
    bounds = latLngBounds(_latlongArray);
  }
  return bounds;
};

const arrow = [
  {
    offset: '0.1%',
    repeat: 40,
    symbol: L.Symbol.arrowHead({
      pixelSize: 10,
      polygon: false,
      pathOptions: { stroke: true, color: '#455a64' },
    }),
  },
];

function TripReplayMap({
  packetDataList,
  locationsMarker,
  intl,
  isMapVisible,
  isProcessing,
  onReplayClick,
  searchParameterValue,
  mapTile,
}) {
  const [mapBounds, setMapBounds] = useState();
  const renderMarkers = () => {
    let markers = [];
    markers = locationsMarker
      && locationsMarker.map((listDetail) => (
        <Marker
          position={getLatLong(listDetail.latitude, listDetail.longitude) || [0, 0]}
          icon={getIcon(listDetail)}
          key={listDetail.id}
          onMouseOver={(e) => {
            e.target.openPopup();
          }}
          onMouseOut={(e) => {
            e.target.closePopup();
          }}
        >
          <Popup style={{ padding: '0px' }} className="MileStonePopUp" closeButton={false}>
            {listDetail && listDetail.milestone !== null ?
                <div className="Font--WB">
                {milestonePopupHeaderTitle(listDetail)}
                </div>
            : null}
            <div>
              {milestonePopupTile(listDetail)}
            </div>
          </Popup>
        </Marker>
      ));
    return markers;
  };
  useEffect(() => {
    if (packetDataList.length) {
      const _mapBounds = getBounds(packetDataList);
      setMapBounds(_mapBounds);
    } else if (packetDataList.length === 0) {
      setMapBounds(latLngBounds(indiaNorthBounds, indiaSouthBounds));
    }
  }, [packetDataList]);

  function handleReplayButtonClick() {
    onReplayClick();
  }

  return (
    <div className="VtsTripReplayModal Box--Shadow">
      <div className="TripReaplayHeading Font--WB Font--S20">
        {' '}
        {intl.formatMessage({ id: 'label.mapView' })}
        {' '}
      </div>
      <div style={{ height: 'calc(100% - 50px)' }}>
        <ContentWrap isFetching={isProcessing}>
          {!isMapVisible
            ? (
              <div style={{
                height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#d8d8d8',
              }}
              >
                <ButtonWithIcon
                  type="plain"
                  labelText={intl.formatMessage({ id: 'label.replay' })}
                  iconName="rotate-counterClockWise"
                  onClick={handleReplayButtonClick}
                  iconStyle={{ verticalAlign: 'middle', marginRight: 12 }}
                />

              </div>
            )
            : (
              <Map
                bounds={mapBounds}
                center={center}
                zoom={14}
                zoomControl={false}
                className="Map-Height"
              >
                <LayersControl position="topright">
                  <LayersControl.BaseLayer checked name="Map Tile">
                  <TileConfigLayer
                    layerType={mapTile}
                  />
                  </LayersControl.BaseLayer>
                  <ZoomControl position="topright" />
                  {locationsMarker && locationsMarker.length && (
                  <LayersControl.Overlay checked name="Marker with popup">
                    {renderMarkers()}
                  </LayersControl.Overlay>
                  )}
                  <LayersControl.Overlay checked name="polyline popup">
                    <PolylineDecorator patterns={arrow} positions={packetDataList} color="#455a64" />
                  </LayersControl.Overlay>
                  <FullscreenControl
                    position="topright"
                    content={fullScreenIcon}
                    forceSeparateButton
                  />
                  {searchParameterValue !== searchParameter.VEHICLE_REGISTRATION_NUMBER
                    &&
                    <Control position="topright">
                    <Legend
                      isSearchFuel={searchParameterValue === searchParameter.FUEL_TICKET_ID
                        || searchParameterValue === searchParameter.OFF_ROAD_TICKET_ID}
                    />
                  </Control>}
                </LayersControl>
              </Map>
            )}
        </ContentWrap>
      </div>
    </div>
  );
}

TripReplayMap.defaultProps = {
  packetDataList: [],
  locationsMarker: [],
  isMapVisible: true,
  onReplayClick: () => {},
  mapTile: '',
};

TripReplayMap.propTypes = {
  intl: PropTypes.object.isRequired,
  packetDataList: PropTypes.array,
  locationsMarker: PropTypes.array,
  isMapVisible: PropTypes.bool,
  onReplayClick: PropTypes.func,
  mapTile: PropTypes.string,
};

export default injectIntl(TripReplayMap);
