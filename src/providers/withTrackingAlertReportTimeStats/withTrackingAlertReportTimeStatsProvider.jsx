import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import {
  fetchStatsForAlert as fetchStatsForAlertApi,
  fetchStatsForTime as fetchStatsForTimeApi,
} from '../../api/trackingAlertsReport';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetchingTime: false,
  isError: false,
  timeInfo: [],
};

// Context
const TrackingAlertReportTimeStatsContext = React.createContext({ ...initialState });

// Hook
const useTrackingAlertReportTimeStats = (
  initialStates = { ...initialState }
) => {
  const [trackingAlertReportTimeStats, setTrackingAlertReportTimeStats] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchTrackingAlertReportTimeStatsStart = () => {
    setTrackingAlertReportTimeStats({ isFetchingTime: true, isError: false });
  }

  const fetchTrackingAlertReportTimeStatsSuccess = (response) => {
    setTrackingAlertReportTimeStats({ isFetchingTime: false, timeInfo: { data: response.data } });
  }

  const fetchTrackingAlertReportTimeStatsError = (error) => {
    notifications.pushNotification(error);
    setTrackingAlertReportTimeStats({ isFetchingTime: false, isError: true });
  }
  const getTrackingAlertReportTimeStats = (queryParams, userConfig) => {
    fetchTrackingAlertReportTimeStatsStart();
    fetchStatsForTimeApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchTrackingAlertReportTimeStatsSuccess(res.body);
      })
      .catch((err) => {
        fetchTrackingAlertReportTimeStatsError(err);
      });
  };


  const resetTrackingAlertReportTimeStats = () => {
    setTrackingAlertReportTimeStats({ ...initialState })
  }
  return {
    trackingAlertReportTimeStats,
    setTrackingAlertReportTimeStats,
    getTrackingAlertReportTimeStats,
    resetTrackingAlertReportTimeStats,
  };
};

// Provider
function withTrackingAlertReportTimeStatsProvider(Component) {
  function TrackingAlertReportTimeStatsProvider(props) {
    const trackingAlertReportTimeStats = useTrackingAlertReportTimeStats();

    return (
      <TrackingAlertReportTimeStatsContext.Provider value={trackingAlertReportTimeStats}>
        <Component
          {...props}
        />
      </TrackingAlertReportTimeStatsContext.Provider>
    );
  }

  return TrackingAlertReportTimeStatsProvider;
};

export { TrackingAlertReportTimeStatsContext, withTrackingAlertReportTimeStatsProvider };