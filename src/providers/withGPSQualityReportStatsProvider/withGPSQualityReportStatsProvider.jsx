import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import {
  fetchStatsForPacketLoss as fetchStatsForPacketLossApi,
  fetchStatsForPacketDisrepancy as fetchStatsForPacketDisrepancyApi,
} from '../../api/gpsQualityReport';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: {},
};

// Context
const GPSQualityReportStatsContext = React.createContext({ ...initialState });

// Hook
const useGPSQualityReportStats = (
  initialStates = { ...initialState }
) => {
  const [gpsQualityReportStats, setGPSQualityReportStats] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchGPSQualityReportStatsStart = () => {
    setGPSQualityReportStats({ isFetching: true, isError: false });
  }

  const fetchGPSQualityReportStatsSuccess = (states) => {
    setGPSQualityReportStats({ isFetching: false, info: { data: states.data } });
  }

  const fetchGPSQualityReportStatsError = (error) => {
    notifications.pushNotification(error);
    setGPSQualityReportStats({ isFetching: false, isError: true });
  }

  const getGPSQualityReportStatsForPacketLoss = (queryParams, userConfig) => {
    fetchGPSQualityReportStatsStart();
    fetchStatsForPacketLossApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchGPSQualityReportStatsSuccess(res.body);
      })
      .catch((err) => {
        fetchGPSQualityReportStatsError(err);
      });
  };

  const getGPSQualityReportStatsForPacketDisrepancy = (queryParams, userConfig) => {
    fetchGPSQualityReportStatsStart();
    fetchStatsForPacketDisrepancyApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchGPSQualityReportStatsSuccess(res.body);
      })
      .catch((err) => {
        fetchGPSQualityReportStatsError(err);
      });
  };

  const getGPSQualityReportStats = (queryParams, userConfig, key) => {
    if (key === 'PACKET_LOSS') {
      getGPSQualityReportStatsForPacketLoss(queryParams, userConfig);
    } else if( key === 'PACKET_DISREPANCIES') {
      getGPSQualityReportStatsForPacketDisrepancy(queryParams, userConfig);
    }
  };

  const resetGPSQualityReportStats = () => {
    setGPSQualityReportStats({ info: {} })
  }
  return {
    gpsQualityReportStats,
    setGPSQualityReportStats,
    getGPSQualityReportStats,
    resetGPSQualityReportStats,
  };
};

// Provider
function withGPSQualityReportStatsProvider(Component) {
  function GPSQualityReportProvider(props) {
    const gpsQualityReportStats = useGPSQualityReportStats();

    return (
      <GPSQualityReportStatsContext.Provider value={gpsQualityReportStats}>
        <Component
          {...props}
        />
      </GPSQualityReportStatsContext.Provider>
    );
  }

  return GPSQualityReportProvider;
};

export { GPSQualityReportStatsContext, withGPSQualityReportStatsProvider };