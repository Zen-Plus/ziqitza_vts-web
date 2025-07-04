import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import {
  fetchLiveTrackingAlerts as fetchLiveTrackingAlertsApi,
  fetchHistoryTrackingAlerts as fetchHistoryTrackingAlertsApi
} from '../../api/trackingAlerts';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const TrackingAlertsContext = React.createContext({ ...initialState });

// Hook
const useTrackingAlerts = (
  initialClusters = { ...initialState }
) => {
  const [trackingAlerts, setTrackingAlerts] = useCustomState(initialClusters);

  const notifications = React.useContext(NotificationContext);

  const fetchTrackingAlertsStart = () => {
    setTrackingAlerts({ isFetching: true, isError: false, info: null });
  }

  const fetchTrackingAlertsSuccess = (state) => {
    setTrackingAlerts({ isFetching: false, info: state });
  }

  const fetchTrackingAlertsError = (error) => {
    notifications.pushNotification(error);
    setTrackingAlerts({ isFetching: false, isError: true });
  }

  const getLiveTrackingAlertsList = (queryParams, userConfig) => {
    fetchTrackingAlertsStart();
    fetchLiveTrackingAlertsApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchTrackingAlertsSuccess(res.body);
      })
      .catch((err) => {
        fetchTrackingAlertsError(err);
      });
  }

  const getHistoryTrackingAlertsList = (queryParams, userConfig) => {
    fetchTrackingAlertsStart();
    fetchHistoryTrackingAlertsApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchTrackingAlertsSuccess(res.body);
      })
      .catch((err) => {
        fetchTrackingAlertsError(err);
      });
  }

  const getTrackingAlertsList = (queryParams, userConfig, view = 'live') => {
    if (view === 'live') {
      getLiveTrackingAlertsList(queryParams, userConfig);
    } else if (view === 'history') {
      getHistoryTrackingAlertsList(queryParams, userConfig);
    }
  }

  return {
    trackingAlerts,
    setTrackingAlerts,
    getTrackingAlertsList,
  };
};

// Provider
function withTrackingAlertsProvider(Component) {
  function TrackingAlertsProvider(props) {
    const trackingAlerts = useTrackingAlerts();

    return (
      <TrackingAlertsContext.Provider value={trackingAlerts}>
        <Component
          {...props}
        />
      </TrackingAlertsContext.Provider>
    );
  }

  return TrackingAlertsProvider;
};

export { TrackingAlertsContext, withTrackingAlertsProvider };