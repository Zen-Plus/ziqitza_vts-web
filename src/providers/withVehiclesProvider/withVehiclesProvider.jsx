import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchVehicles, fetchVehiclesForMap } from '../../api/vehicles';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const VehiclesContext = React.createContext({ ...initialState });

// Hook
const useVehicles = (
  initialVehicles = { ...initialState }
) => {
  const [vehicles, setVehicles] = useCustomState(initialVehicles);

  const notifications = React.useContext(NotificationContext);

  const fetchVehiclesStart = () => {
    setVehicles({ isFetching: true, isError: false, info: null });
  }

  const fetchVehiclesSuccess = (vehicles) => {
    setVehicles({ isFetching: false, info: vehicles });
  }

  const fetchVehiclesError = (error) => {
    notifications.pushNotification(error);
    setVehicles({ isFetching: false, isError: true });
  }
  const fetchVehiclesLoadMoreStart = () => {
    setVehicles({ isFetching: true, isError: false });
  }

  const fetchVehiclesLoadMoreSuccess = (vehicle) => {
    setVehicles({
      ...vehicles,
      isFetching: false,
      info: {
        ...vehicles.info,
        data: {
          ...vehicles.info.data,
          content: [...vehicles.info.data.content, ...vehicle.data.content],
          pageable: { ...vehicle.data.pageable}
        },
      },
    });
  }
  const fetchVehiclesLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setVehicles({ isFetching: false, isError: true });
  }

  const getVehiclesForMapViewLoadMore = (queryParams, userConfig) => {
    fetchVehiclesLoadMoreStart();
    fetchVehiclesForMap(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchVehiclesLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchVehiclesLoadMoreError(err);
      });
  }

  const getVehiclesForMapView = (queryParams, userConfig) => {
    fetchVehiclesStart();
    fetchVehiclesForMap(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchVehiclesSuccess(res.body);
      })
      .catch((err) => {
        fetchVehiclesError(err);
      });
  }

  const getVehiclesForListView = (queryParams, userConfig) => {
    fetchVehiclesStart();
    fetchVehicles(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchVehiclesSuccess(res.body);
      })
      .catch((err) => {
        fetchVehiclesError(err);
      });
  }

  const getVehiclesList = (queryParams, userConfig, isListView) => {
    if (isListView) {
      getVehiclesForListView(queryParams, userConfig);
    } else {
      getVehiclesForMapView(queryParams, userConfig);
    }
  }

  return {
    vehicles,
    setVehicles,
    getVehiclesList,
    getVehiclesForMapViewLoadMore,
  };
};

// Provider
function withVehiclesProvider(Component) {
  function VehiclesProvider(props) {
    const vehicles = useVehicles();

    return (
      <VehiclesContext.Provider value={vehicles}>
        <Component
          {...props}
        />
      </VehiclesContext.Provider>
    );
  }

  return VehiclesProvider;
};

export { VehiclesContext, withVehiclesProvider };