import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchDistricts, fetchGeographicalRestrictedDistricts, fetchProjectDistricts } from '../../api/districts';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const DistrictsContext = React.createContext({ ...initialState });

// Hook
const useDistricts = (
  initialStates = { ...initialState }
) => {
  const [districts, setDistricts] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchDistrictsStart = () => {
    setDistricts({ isFetching: true, isError: false });
  }

  const fetchDistrictsSuccess = (states) => {
    setDistricts({ isFetching: false, info: { data: states.data } });
  }

  const fetchDistrictsError = (error) => {
    notifications.pushNotification(error);
    setDistricts({ isFetching: false, isError: true });
  }

  const getDistrictsList = (queryParams, userConfig) => {
    fetchDistrictsStart();
    fetchDistricts(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchDistrictsSuccess(res.body);
      })
      .catch((err) => {
        fetchDistrictsError(err);
      });
  }
  const getGeographicalRestrictedDistrictsList = (queryParams, userConfig) => {
    fetchDistrictsStart();
    fetchGeographicalRestrictedDistricts(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchDistrictsSuccess(res.body);
      })
      .catch((err) => {
        fetchDistrictsError(err);
      });
  }
  const getProjectDistrictsList = (queryParams, userConfig) => {
    fetchDistrictsStart();
    fetchProjectDistricts(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchDistrictsSuccess(res.body);
      })
      .catch((err) => {
        fetchDistrictsError(err);
      });
  }
  const fetchDistrictsLoadMoreStart = () => {
    setDistricts({ isFetching: true, isError: false });
  }
  const fetchDistrictsLoadMoreSuccess = (states) => {
    setDistricts({
      ...districts,
      isFetching: false,
      info: {
        ...districts.info,
        data: {
          ...districts.info.data,
          content: [...districts.info.data.content, ...states.data.content],
        },
      },
    });
  }

  const fetchDistrictsLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setDistricts({ isFetching: false, isError: true });
  }

  const getDistrictsListLoadMore = (queryParams, userConfig) => {
    fetchDistrictsLoadMoreStart();
    fetchDistricts(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchDistrictsLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchDistrictsLoadMoreError(err);
      });
  }
  const getGeographicalRestrictedDistrictsListLoadMore = (queryParams, userConfig) => {
    fetchDistrictsLoadMoreStart();
    fetchGeographicalRestrictedDistricts(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchDistrictsLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchDistrictsLoadMoreError(err);
      });
  }

  const getProjectDistrictsListLoadMore = (queryParams, userConfig) => {
    fetchDistrictsLoadMoreStart();
    fetchProjectDistricts(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchDistrictsLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchDistrictsLoadMoreError(err);
      });
  }

  return {
    districts,
    setDistricts,
    getDistrictsList,
    getDistrictsListLoadMore,
    getGeographicalRestrictedDistrictsList,
    getGeographicalRestrictedDistrictsListLoadMore,
    getProjectDistrictsListLoadMore,
    getProjectDistrictsList
  };
};

// Provider
function withDistrictsProvider(Component) {
  function DistrictsProvider(props) {
    const districts = useDistricts();

    return (
      <DistrictsContext.Provider value={districts}>
        <Component
          {...props}
        />
      </DistrictsContext.Provider>
    );
  }

  return DistrictsProvider;
};

export { DistrictsContext, withDistrictsProvider };