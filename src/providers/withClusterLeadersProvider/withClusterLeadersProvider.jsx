import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchClusterLeaders } from '../../api/clusterLeaders';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const ClusterLeadersContext = React.createContext({ ...initialState });

// Hook
const useClusterLeaders = (
  initialStates = { ...initialState }
) => {
  const [clusterLeaders, setClusterLeaders] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchClusterLeadersStart = () => {
    setClusterLeaders({ isFetching: true, isError: false });
  }

  const fetchClusterLeadersSuccess = (states) => {
    setClusterLeaders({ isFetching: false, info: { data: states.data } });
  }

  const fetchClusterLeadersError = (error) => {
    notifications.pushNotification(error);
    setClusterLeaders({ isFetching: false, isError: true });
  }

  const getClusterLeadersList = (queryParams, userConfig) => {
    fetchClusterLeadersStart();
    fetchClusterLeaders(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchClusterLeadersSuccess(res.body);
      })
      .catch((err) => {
        fetchClusterLeadersError(err);
      });
  }
  const fetchClusterLeadersLoadMoreStart = () => {
    setClusterLeaders({ isFetching: true, isError: false });
  }
  const fetchClusterLeadersLoadMoreSuccess = (states) => {
    setClusterLeaders({
      ...clusterLeaders,
      isFetching: false,
      info: {
        ...clusterLeaders.info,
        data: {
          ...clusterLeaders.info.data,
          content: [...clusterLeaders.info.data.content, ...states.data.content],
        },
      },
    });
  }

  const fetchClusterLeadersLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setClusterLeaders({ isFetching: false, isError: true });
  }

  const getClusterLeadersListLoadMore = (queryParams, userConfig) => {
    fetchClusterLeadersLoadMoreStart();
    fetchClusterLeaders(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchClusterLeadersLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchClusterLeadersLoadMoreError(err);
      });
  }

  return {
    clusterLeaders,
    setClusterLeaders,
    getClusterLeadersList,
    getClusterLeadersListLoadMore
  };
};

// Provider
function withClusterLeadersProvider(Component) {
  function ClusterLeadersProvider(props) {
    const clusterLeaders = useClusterLeaders();

    return (
      <ClusterLeadersContext.Provider value={clusterLeaders}>
        <Component
          {...props}
        />
      </ClusterLeadersContext.Provider>
    );
  }

  return ClusterLeadersProvider;
};

export { ClusterLeadersContext, withClusterLeadersProvider };