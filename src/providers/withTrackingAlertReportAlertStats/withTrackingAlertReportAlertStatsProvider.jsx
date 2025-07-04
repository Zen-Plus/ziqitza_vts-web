import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import {
  fetchStatsForAlert as fetchStatsForAlertApi,
} from '../../api/trackingAlertsReport';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetchingAlert: false,
  isError: false,
  alertInfo: [],
};

// Context
const TrackingAlertReportAlertStatsContext = React.createContext({ ...initialState });

// Hook
const useTrackingAlertReportAlertStats = (
  initialStates = { ...initialState }
) => {
  const [trackingAlertReportAlertStats, setTrackingAlertReportAlertStats] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchTrackingAlertReportAlertStatsStart = () => {
    setTrackingAlertReportAlertStats({ isFetchingAlert: true, isError: false });
  }

  const fetchTrackingAlertReportAlertStatsSuccess = (response) => {
    setTrackingAlertReportAlertStats({ isFetchingAlert: false, alertInfo: { data: response.data } });
  }

  const fetchTrackingAlertReportAlertStatsError = (error) => {
    notifications.pushNotification(error);
    setTrackingAlertReportAlertStats({ isFetchingAlert: false, isError: true });
  }

  const getTrackingAlertReportAlertStats = (queryParams, userConfig) => {
    fetchTrackingAlertReportAlertStatsStart();
    fetchStatsForAlertApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchTrackingAlertReportAlertStatsSuccess(res.body);
      })
      .catch((err) => {
        fetchTrackingAlertReportAlertStatsError(err);
      });
  };
  
  const resetTrackingAlertReportAlertStats = () => {
    setTrackingAlertReportAlertStats({ alertInfo: [] })
  }
  return {
    trackingAlertReportAlertStats,
    setTrackingAlertReportAlertStats,
    getTrackingAlertReportAlertStats,
    resetTrackingAlertReportAlertStats,
  };
};

// Provider
function withTrackingAlertReportAlertStatsProvider(Component) {
  function TrackingAlertReportAlertStatsProvider(props) {
    const trackingAlertReportAlertStats = useTrackingAlertReportAlertStats();

    return (
      <TrackingAlertReportAlertStatsContext.Provider value={trackingAlertReportAlertStats}>
        <Component
          {...props}
        />
      </TrackingAlertReportAlertStatsContext.Provider>
    );
  }

  return TrackingAlertReportAlertStatsProvider;
};

export { TrackingAlertReportAlertStatsContext, withTrackingAlertReportAlertStatsProvider };