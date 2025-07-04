import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchParkingBays } from '../../api/parkingBays';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const ParkingBaysContext = React.createContext({ ...initialState });

// Hook
const useParkingBays = (
  initialStates = { ...initialState }
) => {
  const [parkingBays, setParkingBays] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchParkingBaysStart = () => {
    setParkingBays({ isFetching: true, isError: false });
  }

  const fetchParkingBaysSuccess = (states) => {
    setParkingBays({ isFetching: false, info: { data: states.data } });
  }

  const fetchParkingBaysError = (error) => {
    notifications.pushNotification(error);
    setParkingBays({ isFetching: false, isError: true });
  }

  const getParkingBaysList = (queryParams, userConfig) => {
    fetchParkingBaysStart();
    fetchParkingBays(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchParkingBaysSuccess(res.body);
      })
      .catch((err) => {
        fetchParkingBaysError(err);
      });
  }
  const fetchParkingBaysLoadMoreStart = () => {
    setParkingBays({ isFetching: true, isError: false });
  }
  const fetchParkingBaysLoadMoreSuccess = (states) => {
    setParkingBays({
      ...parkingBays,
      isFetching: false,
      info: {
        ...parkingBays.info,
        data: {
          ...parkingBays.info.data,
          content: [...parkingBays.info.data.content, ...states.data.content],
        },
      },
    });
  }

  const fetchParkingBaysLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setParkingBays({ isFetching: false, isError: true });
  }

  const getParkingBaysListLoadMore = (queryParams, userConfig) => {
    fetchParkingBaysLoadMoreStart();
    fetchParkingBays(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchParkingBaysLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchParkingBaysLoadMoreError(err);
      });
  }

  return {
    parkingBays,
    setParkingBays,
    getParkingBaysList,
    getParkingBaysListLoadMore
  };
};

// Provider
function withParkingBaysProvider(Component) {
  function ParkingBaysProvider(props) {
    const parkingBays = useParkingBays();

    return (
      <ParkingBaysContext.Provider value={parkingBays}>
        <Component
          {...props}
        />
      </ParkingBaysContext.Provider>
    );
  }

  return ParkingBaysProvider;
};

export { ParkingBaysContext, withParkingBaysProvider };