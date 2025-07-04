import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchNearbyErvVehicles } from '../../api/nearbyErv';
import { NotificationContext } from '../withNotificationProvider';
import { cloneDeep } from '../../common/helpers/collectionUtils';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  nearbyErvVehicles: null,
  displayNearbyErvVehicle: null,
};

// Context
const NearbyErvContext = React.createContext({ ...initialState });

// updating list
function updateList(list, listState) {
  const _values = cloneDeep(list);
  if (_values.data && _values.data.content && _values.data.content.length && listState.sliderValue) {
    _values.data.content = _values.data.content.filter((data) => data.aerialDistance < listState.sliderValue)
  }
  return _values;
}

// Hook
const useNearbyErv = (
  initialNearbyErv = { ...initialState },
) => {
  const [nearbyErv, setNearbyErv] = useCustomState(initialNearbyErv);
  const notifications = React.useContext(NotificationContext);

  const fetchNearbyErvStart = () => {
    setNearbyErv({ isFetching: true, isError: false, nearbyErvVehicles: null });
  };

  const fetchNearbyErvSuccess = (payload) => {
    setNearbyErv({ isFetching: false, nearbyErvVehicles: payload });
  };

  const fetchNearbyErvError = (error) => {
    notifications.pushNotification(error);
    setNearbyErv({ isFetching: false, isError: true });
  };

  const getNearbyErvVehicles = (queryParams, userConfig) => {
    fetchNearbyErvStart();
    fetchNearbyErvVehicles(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchNearbyErvSuccess(res.body);
      })
      .catch((err) => {
        fetchNearbyErvError(err);
      });
  };

  const fetchNearbyErvVehiclesLoadMoreStart = () => {
    setNearbyErv({ isFetching: true, isError: false });
  }

  const fetchNearbyErvVehiclesLoadMoreSuccess = (payload) => {
    setNearbyErv({
      ...nearbyErv,
      isFetching: false,
      nearbyErvVehicles: {
        ...nearbyErv.nearbyErvVehicles,
        data: {
          ...nearbyErv.nearbyErvVehicles.data,
          content: [...nearbyErv.nearbyErvVehicles.data.content, ...payload.data.content],
          pageable: { ...payload.data.pageable }
        },
      },
    });
  }
  const fetchNearbyErvVehiclesLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setNearbyErv({ isFetching: false, isError: true });
  }

  const getNearbyErvVehiclesLoadMore = (queryParams, userConfig) => {
    fetchNearbyErvVehiclesLoadMoreStart();
    fetchNearbyErvVehicles(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchNearbyErvVehiclesLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchNearbyErvVehiclesLoadMoreError(err);
      });
  }

  const getDisplayNearbyErvVehicles = (listState, isApi = false, userConfig) => {
    if (isApi) {
      getNearbyErvVehicles(listState, userConfig);
    } else if (nearbyErv.nearbyErvVehicles) {
      const _values = updateList(nearbyErv.nearbyErvVehicles, listState);
      setNearbyErv({ displayNearbyErvVehicle: _values });
    }

  };
  return {
    nearbyErv,
    setNearbyErv,
    getDisplayNearbyErvVehicles,
    getNearbyErvVehiclesLoadMore,
  };
};

// Provider
function withNearbyErvProvider(Component) {
  function NearbyErvProvider(props) {
    const nearbyErv = useNearbyErv();

    return (
      <NearbyErvContext.Provider value={nearbyErv}>
        <Component
          {...props}
        />
      </NearbyErvContext.Provider>
    );
  }

  return NearbyErvProvider;
}

export { NearbyErvContext, withNearbyErvProvider };
