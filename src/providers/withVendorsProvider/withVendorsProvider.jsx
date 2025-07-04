import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchVendors, fetchGeographicalRestrictedVendors } from '../../api/vendors';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const VendorsContext = React.createContext({ ...initialState });

// Hook
const useVendors = (
  initialStates = { ...initialState }
) => {
  const [vendors, setVendors] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchVendorsStart = () => {
    setVendors({ isFetching: true, isError: false });
  }

  const fetchVendorsSuccess = (states) => {
    setVendors({ isFetching: false, info: { data: states.data } });
  }

  const fetchVendorsError = (error) => {
    notifications.pushNotification(error);
    setVendors({ isFetching: false, isError: true });
  }

  const getVendorsList = (queryParams, userConfig) => {
    fetchVendorsStart();
    fetchVendors(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchVendorsSuccess(res.body);
      })
      .catch((err) => {
        fetchVendorsError(err);
      });
  }

  const getGeographicalRestrictedVendorsList = (queryParams, userConfig) => {
    fetchVendorsStart();
    fetchGeographicalRestrictedVendors(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchVendorsSuccess(res.body);
      })
      .catch((err) => {
        fetchVendorsError(err);
      });
  }

  const fetchVendorsLoadMoreStart = () => {
    setVendors({ isFetching: true, isError: false });
  }
  const fetchVendorsLoadMoreSuccess = (states) => {
    setVendors({
      ...vendors,
      isFetching: false,
      info: {
        ...vendors.info,
        data: {
          ...vendors.info.data,
          content: [...vendors.info.data.content, ...states.data.content],
        },
      },
    });
  }

  const fetchVendorsLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setVendors({ isFetching: false, isError: true });
  }

  const getVendorsListLoadMore = (queryParams, userConfig) => {
    fetchVendorsLoadMoreStart();
    fetchVendors(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchVendorsLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchVendorsLoadMoreError(err);
      });
  }
  const getGeographicalRestrictedVendorsListLoadMore = (queryParams, userConfig) => {
    fetchVendorsLoadMoreStart();
    fetchGeographicalRestrictedVendors(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchVendorsLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchVendorsLoadMoreError(err);
      });
  }

  return {
    vendors,
    setVendors,
    getVendorsList,
    getGeographicalRestrictedVendorsList,
    getVendorsListLoadMore,
    getGeographicalRestrictedVendorsListLoadMore,
  };
};

// Provider
function withVendorsProvider(Component) {
  function VendorsProvider(props) {
    const vendors = useVendors();

    return (
      <VendorsContext.Provider value={vendors}>
        <Component
          {...props}
        />
      </VendorsContext.Provider>
    );
  }

  return VendorsProvider;
};

export { VendorsContext, withVendorsProvider };