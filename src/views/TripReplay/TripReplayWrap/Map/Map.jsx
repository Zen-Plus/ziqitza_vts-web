import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import L, { Icon, latLngBounds, latLng } from "leaflet";
import { Map, Marker, LayersControl, TileLayer, Popup } from "react-leaflet";
import { mapMyIndiaTileUrl } from "../../../../common/constants/map";
import { getLatLong } from "../../../../common/helpers/vehicles";
import { getLocationMarketPath } from "../../../../common/helpers/tripReplay";
import PolylineDecorator from "../../../../components/PolyLineDecorator/PolyLineDecorator";
import Control from 'react-leaflet-control';
import Legend from './Legend';
import { getMarkerProps } from '../util';

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
    offset: "0.1%",
    repeat: 40,
    symbol: L.Symbol.arrowHead({
      pixelSize: 10,
      polygon: false,
      pathOptions: { stroke: true },
    }),
  },
];

function TripReplayMap({ packetDataList, locationsMarker }) {
  const [mapBounds, setMapBounds] = useState();
  const renderMarkers = () => {
    let markers = [];
    markers =
      locationsMarker &&
      locationsMarker.map((listDetail) => (
        <Marker
          position={getLatLong(listDetail.lat, listDetail.lng) || [0, 0]}
          icon={getIcon(listDetail)}
          key={listDetail.id}
          zIndexOffset={listDetail.zIndex}
          onMouseOver={(e) => {
            e.target.openPopup();
          }}
          onMouseOut={(e) => {
            e.target.closePopup();
          }}
        >
          <Popup style={{ padding: "5px" }} closeButton={false}>
            <div>
              {`${listDetail.id.replaceAll("_", " ")}`}
              {listDetail.name ? `( ${listDetail.name} )` : ''}
            </div>
            <div>
              {listDetail.lat && listDetail.lng ? `${listDetail.lat},${listDetail.lng} `: ''}
              {listDetail.dateTime ? `(${listDetail.dateTime})` : ''}
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

  return (
    <div className="TripReplayModal" style={{ width: "100%", height: "100%" }}>
      <Map
        bounds={mapBounds}
        center={getLatLong(null, null) || center}
        zoom={14}
        zoomControl={false}
        className="Map-Height"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map my india">
            <TileLayer
              attribution="&copy; Map My india"
              url={mapMyIndiaTileUrl}
              minZoom={4}
              maxZoom={18}
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay checked name="Marker with popup">
            {renderMarkers()}
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="polyline popup">
            <PolylineDecorator patterns={arrow} positions={packetDataList} />
          </LayersControl.Overlay>
          <Control position="topright">
            <Legend />
          </Control>
        </LayersControl>
      </Map>
    </div>
  );
}

TripReplayMap.defaultProps = {
  packetDataList: [],
  locationsMarker: [],
};

TripReplayMap.propTypes = {
  packetDataList: PropTypes.array,
  locationsMarker: PropTypes.array,
};

export default injectIntl(TripReplayMap);
