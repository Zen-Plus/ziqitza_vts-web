import React, { useEffect } from 'react';
import ContentWrap from '../../components/ContentWrap';
import { fetchMapConfig } from '../../api/mapConfig';
import useCustomState from '../../common/hooks/useCustomState';
import { prepareErrorMessage } from '../../common/helpers/notification'
import { UserConfigContext } from '../withUserConfigProvider';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  info: [],
  isError: false,
  version: '',
};

// Context
const MapConfigContext = React.createContext({ ...initialState });

// Hook
const useMapConfig = (
  initialMapConfig = { ...initialState }
) => {
  const [mapConfig, setMapConfig] = useCustomState(initialMapConfig);

  const notifications = React.useContext(NotificationContext);
  const userConfig = React.useContext(UserConfigContext);

  const fetchMapConfigStart = () => {
    setMapConfig({ isFetching: true, isError: false });
  }

  const fetchMapConfigSuccess = (mapConfigData) => {
    setMapConfig({ isFetching: false, info: mapConfigData });
  }

  const fetchMapConfigError = (error) => {
    notifications.pushNotification(error);
    setMapConfig({ isFetching: false, isError: true });
  }

  const getMapConfig = (query, payload) => {
    fetchMapConfigStart();
    fetchMapConfig({ query, payload, userConfig: userConfig.userConfig })
      .then((res) => {
        const { body: { data } } = res || {};
        const mapApiProviderNotFound = data && data.some((item) => item.mapApiProvider === null );
        if (mapApiProviderNotFound) {
          notifications.pushNotification(prepareErrorMessage({ code: 'SERVICE_NOT_AVAILABLE' }));
        }
        fetchMapConfigSuccess(res.body);
      })
      .catch((err) => {
        fetchMapConfigError(err);
      });
  }

  return {
    mapConfig,
    setMapConfig,
    getMapConfig,
  };
};

// Provider
function withMapConfigProvider(Component, config = []) {
  function ComponentWithMapConfigProvider(props) {
    const { mapConfig, getMapConfig } = useMapConfig();
    const mapConfigData = (mapConfig && mapConfig.info && mapConfig.info.data) || [];

    useEffect(() => {
      if (!(mapConfigData && mapConfigData.length)) {
        const query = {
          dateTime: Date.now(),
        }
        getMapConfig(query, config);
      }
    }, []);
    return (
      <ContentWrap isFetching={mapConfig.isFetching || !(mapConfigData && mapConfigData.length)}>
        <Component
          {...props}
          mapConfigData={mapConfigData}
        />
      </ContentWrap>
    );
  }

  return ComponentWithMapConfigProvider;
}

export { MapConfigContext, withMapConfigProvider };
