import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import {fetchClusters as fetchClustersApi}  from '../../api/clusters';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const ClustersContext = React.createContext({ ...initialState });

// Hook
const useClusters = (
  initialClusters = { ...initialState }
) => {
  const [clusters, setClusters] = useCustomState(initialClusters);

  const notifications = React.useContext(NotificationContext);

  const fetchClustersStart = () => {
    setClusters({ isFetching: true, isError: false, info: null });
  }

  const fetchClustersSuccess = (cluster) => {
    setClusters({ isFetching: false, info: cluster });
  }

  const fetchClustersError = (error) => {
    notifications.pushNotification(error);
    setClusters({ isFetching: false, isError: true });
  }

  const getClustersList = (queryParams, userConfig) => {
    fetchClustersStart();
    fetchClustersApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchClustersSuccess(res.body);
      })
      .catch((err) => {
        fetchClustersError(err);
      });
  }

  return {
    clusters,
    setClusters,
    getClustersList,
  };
};

// Provider
function withClustersProvider(Component) {
  function ClustersProvider(props) {
    const clusters = useClusters();

    return (
      <ClustersContext.Provider value={clusters}>
        <Component
          {...props}
        />
      </ClustersContext.Provider>
    );
  }

  return ClustersProvider;
};

export { ClustersContext, withClustersProvider };