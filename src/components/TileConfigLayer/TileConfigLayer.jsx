import React, { useContext } from 'react';
import {
  TileLayer,
} from 'react-leaflet';
import GoogleLayer from 'react-leaflet-google-layer';
import PropTypes from 'prop-types';
import { getHereMapTileLayerUrl, getMapMyIndiaTileLayerUrl } from '../../common/helpers/vehicles';
import { UserConfigContext } from '../../providers/withUserConfigProvider';

function TileConfigLayer({ layerType }) {
  const userContext = useContext(UserConfigContext);
  const { userConfig: { config: { mapMyIndiaKey, hereMapKey, googleMapKey } } } = userContext;
  let tileLayer = <TileLayer url="" />;

  if (layerType === 'MAPMYINDIA') {
    tileLayer = (
      <TileLayer
        attribution="&copy; Map My india"
        url={getMapMyIndiaTileLayerUrl(mapMyIndiaKey)}
        minZoom={4}
        maxZoom={18}
      />
    );
  }

  if (layerType === 'HERE') {
    tileLayer = (
      <TileLayer
        attribution="&copy; Here Map"
        url={getHereMapTileLayerUrl(hereMapKey)}
        minZoom={4}
        maxZoom={20}
      />
    );
  }
  if (layerType === 'GOOGLE') {
    tileLayer = (
      <GoogleLayer
        googleMapsLoaderConf={{ KEY: googleMapKey }} type={'roadmap'}
        minZoom={4}
        maxZoom={18} />
    );
  }
  return (
    <>
      {tileLayer}
    </>
  );
}

TileConfigLayer.propTypes = {
  layerType: PropTypes.string.isRequired,
  apiToken: PropTypes.string.isRequired,
};

export default TileConfigLayer;
