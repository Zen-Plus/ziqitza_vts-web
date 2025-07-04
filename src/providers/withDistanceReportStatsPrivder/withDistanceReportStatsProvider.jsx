import React, { useContext } from 'react';
import FileSaver from 'file-saver';
import useCustomState from '../../common/hooks/useCustomState';
import {
  fetchStatsForVehicleWise as fetchStatsForVehicleWiseApi,
  fetchStatsForVendorWise as fetchStatsForVendorWiseApi,
  fetchStatsForDriverWise as fetchStatsForDriverWiseApi,
  fetchStatsForMileage as fetchStatsForMileageApi
} from '../../api/distanceReport';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: {},
};

// Context
const DistanceReportStatsContext = React.createContext({ ...initialState });

// Hook
const useDistanceReportStats = (
  initialStates = { ...initialState }
) => {
  const [distanceReportStats, setDistanceReportStats] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchDistanceReportStatsStart = () => {
    setDistanceReportStats({ isFetching: true, isError: false });
  }

  const fetchDistanceReportStatsSuccess = (states) => {
    setDistanceReportStats({ isFetching: false, info: { data: states.data } });
  }

  const fetchDistanceReportStatsError = (error) => {
    notifications.pushNotification(error);
    setDistanceReportStats({ isFetching: false, isError: true });
  }

  const getDistanceReportStatsForVehicleWise = (queryParams, userConfig) => {
    fetchDistanceReportStatsStart();
    fetchStatsForVehicleWiseApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchDistanceReportStatsSuccess(res.body);
      })
      .catch((err) => {
        fetchDistanceReportStatsError(err);
      });
  };

  const getDistanceReportStatsForVendorWise = (queryParams, userConfig) => {
    fetchDistanceReportStatsStart();
    fetchStatsForVendorWiseApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchDistanceReportStatsSuccess(res.body);
      })
      .catch((err) => {
        fetchDistanceReportStatsError(err);
      });
  };
  const getDistanceReportStatsForDriverWise = (queryParams, userConfig) => {
    fetchDistanceReportStatsStart();
    fetchStatsForDriverWiseApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchDistanceReportStatsSuccess(res.body);
      })
      .catch((err) => {
        fetchDistanceReportStatsError(err);
      });
  };
  const getDistanceReportStatsForMileage = (queryParams, userConfig) => {
    fetchDistanceReportStatsStart();
    fetchStatsForMileageApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchDistanceReportStatsSuccess(res.body);
      })
      .catch((err) => {
        fetchDistanceReportStatsError(err);
      });
  };

  const getDistanceReportStats = (queryParams, userConfig, key) => {
    if (key === 'VEHICLE_WISE') {
      getDistanceReportStatsForVehicleWise(queryParams, userConfig);
    } else if( key === 'VENDOR_WISE') {
      getDistanceReportStatsForVendorWise(queryParams, userConfig);
    } else if ( key === 'DRIVER_WISE' ) {
      getDistanceReportStatsForDriverWise(queryParams, userConfig);
    } else {
      getDistanceReportStatsForMileage(queryParams, userConfig);
    }
  };

  const resetDistanceReportStats = () => {
    setDistanceReportStats({ info: {} })
  }
  return {
    distanceReportStats,
    setDistanceReportStats,
    getDistanceReportStats,
    resetDistanceReportStats,
  };
};

// Provider
function withDistanceReportStatsProvider(Component) {
  function DistanceReportProvider(props) {
    const distanceReportStats = useDistanceReportStats();

    return (
      <DistanceReportStatsContext.Provider value={distanceReportStats}>
        <Component
          {...props}
        />
      </DistanceReportStatsContext.Provider>
    );
  }

  return DistanceReportProvider;
};

export { DistanceReportStatsContext, withDistanceReportStatsProvider };