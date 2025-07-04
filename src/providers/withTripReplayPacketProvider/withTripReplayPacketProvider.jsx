import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchDistancePacket as fetchDistancePacketApi,
        fetchTripReplayPacketDataInfo as fetchTripReplayPacketApi } from '../../api/tripReplay';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isFetchingLoadMore: false,
  isError: false,
  info: {},
};

// Context
const TripReplayPacketContext = React.createContext({ ...initialState });

// Hook
const useTripReplayPacket = (
  initialStates = { ...initialState },
) => {
  const [tripReplayPacket, setTripReplayPacket] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchTripReplayPacketStart = () => {
    setTripReplayPacket({ isFetching: true, isError: false });
  };

  const fetchTripReplayPacketSuccess = (states) => {
    setTripReplayPacket({ isFetching: false, info: { data: states.data } });
  };

  const fetchTripReplayPacketError = (error) => {
    notifications.pushNotification(error);
    setTripReplayPacket({ isFetching: false, isError: true });
  };

  const getTripReplayPacket = (queryParams, userConfig) => {
    fetchTripReplayPacketStart();
    fetchDistancePacketApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchTripReplayPacketSuccess(res.body);
      })
      .catch((err) => {
        fetchTripReplayPacketError(err);
      });
  };

  const getTripReplayPacketInfo = (queryParams, userConfig) => {
    fetchTripReplayPacketStart();
    fetchTripReplayPacketApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchTripReplayPacketSuccess(res.body);
      })
      .catch((err) => {
        fetchTripReplayPacketError(err);
      });
  };

  const fetchTripReplayPacketLoadMoreStart = () => {
    setTripReplayPacket({ isFetchingLoadMore: true, isError: false });
  }

  const fetchTripReplayPacketLoadMoreSuccess = (payload) => {
    setTripReplayPacket({
      ...tripReplayPacket,
      isFetchingLoadMore: !payload.data.last,
      info: {
        ...tripReplayPacket.info,
        data: {
          ...tripReplayPacket.info.data,
          content: [...tripReplayPacket.info.data.content, ...payload.data.content],
          pageable: { ...payload.data.pageable }
        },
      },
    });
  }
  const fetchTripReplayPacketLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setTripReplayPacket({ isFetchingLoadMore: false, isError: true });
  }

  const getTripReplayPacketLoadMore = (queryParams, userConfig) => {
    fetchTripReplayPacketLoadMoreStart();
    fetchDistancePacketApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchTripReplayPacketLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchTripReplayPacketLoadMoreError(err);
      });
  };

  const getTripReplayPacketInfoLoadMore = (queryParams, userConfig) => {
    fetchTripReplayPacketLoadMoreStart();
    fetchTripReplayPacketApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchTripReplayPacketLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchTripReplayPacketLoadMoreError(err);
      });
  };

  function resetTripReplayPacket() {
    setTripReplayPacket(initialStates);
  }

  return {
    tripReplayPacket,
    setTripReplayPacket,
    getTripReplayPacket,
    getTripReplayPacketLoadMore,
    resetTripReplayPacket,
    getTripReplayPacketInfoLoadMore,
    getTripReplayPacketInfo,
  };
};

// Provider
function withTripsReplayPacketProvider(Component) {
  function TripReplayPacketProvider(props) {
    const tripReplayPacket = useTripReplayPacket();

    return (
      <TripReplayPacketContext.Provider value={tripReplayPacket}>
        <Component
          {...props}
        />
      </TripReplayPacketContext.Provider>
    );
  }

  return TripReplayPacketProvider;
}

export { TripReplayPacketContext, withTripsReplayPacketProvider };
