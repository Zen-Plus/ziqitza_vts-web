import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Map,
  ZoomControl,
  LayersControl,
  Marker,
  Popup,
} from 'react-leaflet';
import TileConfigLayer from '../../components/TileConfigLayer';
import { latLngBounds, Icon as Icons } from 'leaflet';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import Icon from '../Icon';
import { fetchLatLngFromAddress } from '../../api/map';
import {
  callerLocationMarkerIcon,
  indiaNorthBounds,
  indiaSouthBounds,
  center,
  mapTilePoints,
  mapApiType
} from '../../common/constants/map';
import { LoaderWithOverLay } from '../Loader/LoaderWithOverLay';
import { UserConfigContext, withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';
import NotificationComponent from '../Notification/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { prepareErrorMessage } from '../../common/helpers/notification';


const markerIcon = new Icons({
  iconUrl: callerLocationMarkerIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 32],
  popupAnchor:  [0, -30]
});

function getLatLngArray(value) {
  if (value && value.length) {
    return [value[0].latitude, value[0].longitude];
  }
  return false;
}
function getLatLngAddress(value) {
  if (value && value.length) {
    return value[0].address;
  }
  return false;
}

function CallerOnMap({
  isVisible,
  addressDetail,
  onCancel,
  mapType,
  pickupLatLng,
  mapConfigData,
}) {
  const [searchValue, setSearchValue] = useState(addressDetail);
  const [searchLatLng, setSearchLatLng] = useState(false);
  const [searchLatLngAddress, setSeacrchLatLogAddress] = useState(false);
  const [latLngDetails, setlatLngDetails] = useState({
    isFetching: false,
    isError: false,
    info: [],
  });
  const searchLatlngRef = useRef(null);
  const markerRef = useRef(null);
  const userContext = useContext(UserConfigContext);
  const notifications = React.useContext(NotificationContext);
  const mapProps = {};
  let text;
  const mapTileObject = mapConfigData && mapConfigData.find((item) => item.touchPoint === mapTilePoints.LOCATE_CALLER && item.mapApi === mapApiType.MAP_TILE);
  const mapTile = mapTileObject && mapTileObject.mapApiProvider;
  const mapGeocodingObject = mapConfigData && mapConfigData.find((item) => item.touchPoint === mapTilePoints.LOCATE_CALLER && item.mapApi === mapApiType.GEOCODING);
  const mapReverseGeocoding = mapGeocodingObject && mapGeocodingObject.mapApiProvider;
  function fetchLatLngDetailsStart() {
    setlatLngDetails({ ...latLngDetails, isFetching: true });
  }

  function fetchLatLnfDetailsSuccess(res) {
    const _data = getLatLngArray(res);
    const _address = getLatLngAddress(res);
    setlatLngDetails({ ...latLngDetails, isFetching: false, info: _data });
    setSearchLatLng(_data);
    searchLatlngRef.current = false;
    setSeacrchLatLogAddress(_address);
  }

  function fetchLatLngDetailsError(error) {
    setSearchLatLng(false);
    searchLatlngRef.current = false;
    setlatLngDetails({ ...latLngDetails, isFetching: false });
    notifications.pushNotification(error);
  }

  function fetchLatLngDetails(query) {
    fetchLatLngDetailsStart();
    fetchLatLngFromAddress(query, userContext.userConfig)
      .then((res) => {
        const { data } = res.body;
        fetchLatLnfDetailsSuccess(data);
      }).catch((error) => {
        fetchLatLngDetailsError(error);
      });
  }
  function handleMarkerDragged(event) {
    const { target: { _latlng = {} } } = event;
    if(_latlng.lat && _latlng.lng) {
      const _lat = parseFloat(_latlng.lat.toFixed(7));
      const _lng = parseFloat(_latlng.lng.toFixed(7));
      searchLatlngRef.current = [_lat, _lng]; 
    }
  }

  function handleKeyUp(event) {
    const keyCode = event.which || event.keyCode;
    if (text !== searchValue) {
      if ((keyCode === 46 && !searchValue) || keyCode === 13 || (keyCode === 8 && !searchValue)) {
        handleSearchText();
        text = searchValue;
      }
    }
  }
  function handleChange(event) {
    setSearchValue(event.target.value);
  }

  function handleSearchText() {
    if (searchValue && mapReverseGeocoding) {
      fetchLatLngDetails({ apiProvider: mapReverseGeocoding, geocodingRequest: searchValue });
    }
  }
  function handleCallerOnMapClose() {
    if(searchLatlngRef.current && searchLatlngRef.current.length) {
      onCancel(searchLatlngRef.current)
    } else if (searchLatLng && searchLatLng.length) {
      onCancel(searchLatLng);
    } else {
      onCancel(pickupLatLng);
    }
  }
  function openPopup(marker) {
    if (marker && marker.leafletElement) {
      markerRef.current = marker;
      window.setTimeout(() => {
        marker.leafletElement.openPopup();
      });
    }
  }

  useEffect(() => {
    if (isVisible) {
      if (!mapTile || !mapReverseGeocoding) {
        notifications.pushNotification(prepareErrorMessage({ code: 'SERVICE_NOT_AVAILABLE' }));
        return;
      }
      if (addressDetail && !(pickupLatLng && pickupLatLng.length)) {
        fetchLatLngDetails({ apiProvider: mapReverseGeocoding, geocodingRequest: addressDetail });
      } else {
        setSearchLatLng(pickupLatLng);
      }
    }
  }, [isVisible]);

  if (!searchLatLng) {
    mapProps.bounds = latLngBounds(indiaNorthBounds, indiaSouthBounds);
  } else {
    mapProps.center = searchLatLng;
  }
  return (
    <>
      <NotificationComponent
        components={{ Icon }}
        notifications={notifications.notifications}
        removeNotification={notifications.removeNotification}
      />
      <Modal
        width={1060}
        visible={isVisible}
        footer={false}
        maskClosable={false}
        centered
        onCancel={handleCallerOnMapClose}
        wrapClassName="Dispatch-CallerOnMap"
      >
        <div className="ZiqitzaVTS">
          {latLngDetails.isFetching && <LoaderWithOverLay />}
          <div className="Ml-20" style={{ position: 'relative', width: '651px' }}>
            <Input
              style={{ width: '651px' }}
              value={searchValue}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              maxLength={1000}
            />
            <div style={{ position: 'absolute', right: '0px', top: '15px' }}>
              <Button
                onClick={handleSearchText}
                style={{
                  background: 'transparent',
                  height: '100%',
                  zIndex: 1,
                }}
              >
                <Icon name="search" />
              </Button>
            </div>
          </div>
          <Map
            zoom={10}
            onclick={() => openPopup(markerRef.current)}
            zoomControl={false}
            className="Map-Height Mt-20"
            center={center}
            {...mapProps}
          >
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Map Tile">
              <TileConfigLayer
                layerType={mapTile}
              />
              </LayersControl.BaseLayer>
              <ZoomControl position="topright" />
              <LayersControl.Overlay
                checked={searchLatLng && !!searchLatLng.length}
                name="search Lat Lng"
              >
                <Marker
                  zIndexOffset={5}
                  position={searchLatLng || [0, 0]}
                  icon={markerIcon}
                  draggable
                  ondragend={handleMarkerDragged}
                  ref={openPopup}
                  onMouseOver={e => {
                    e.target.openPopup();
                  }}
                  onMouseOut={e => {
                    e.target.openPopup();
                  }}
                  onclick={(e) => {
                    e.target.openPopup();
                  }}
                > { searchLatLngAddress 
                  ? 
                  <Popup style={{ padding: '5px' }} closeButton={false}>
                    <div>
                     {searchLatLngAddress}
                    </div>
                  </Popup>
                  : null
                  }
                </Marker>
              </LayersControl.Overlay>
            </LayersControl>
          </Map>
        </div>
      </Modal>
    </>
  );
}

CallerOnMap.defaultProps = {
  addressDetail: '',
  pickupLatLng: false,
  mapType: 'MAPMYINDIA',
  mapConfigData: [],
};

CallerOnMap.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  addressDetail: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  pickupLatLng: PropTypes.array,
  mapType: PropTypes.string,
  mapConfigData: PropTypes.object,
};

export default withUserConfigProvider(withIntlProvider(withNotificationProvider(CallerOnMap)));
