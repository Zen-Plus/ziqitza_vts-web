import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import {
  deleteCluster as deleteClusterApi,
  saveCluster as saveClusterApi,
  getCluster as getClusterApi,
  updateCluster as updateClusterApi
} from '../../api/clusters';
import { NotificationContext } from '../withNotificationProvider';
import { prepareSuccessMessage } from '../../common/helpers/notification';
import { overrideErrorCode } from '../../common/helpers/apiErrors';

// inital context state
const initialState = {
  isProcessing: false,
  isError: false,
  info: null,
};

// Context
const ClusterContext = React.createContext({ ...initialState });

// Hook
const useCluster = (
  initialCluster = { ...initialState }
) => {
  const [cluster, setCluster] = useCustomState(initialCluster);

  const notifications = React.useContext(NotificationContext);

  const deleteClusterStart = () => {
    setCluster({ isProcessing: true, isError: false });
  }

  const deleteClusterSuccess = (payload = {}) => {
    setCluster({ isProcessing: false });
  }

  const deleteCulusterError = (error) => {
    notifications.pushNotification(error);
    setCluster({ isProcessing: true, isError: false });;
  }

  const deleteCluster = (payload, userConfig, callback = () => { }) => {
    deleteClusterStart();
    deleteClusterApi({ payload }, userConfig.userConfig)
      .then((res = {}) => {
        notifications.pushNotification(prepareSuccessMessage({ code: 'CLUSTER_DELETED' }))
        deleteClusterSuccess(res.body);
        callback();
      })
      .catch((error = {}) => {
        deleteCulusterError(error);
      });
  };
  const saveClusterStart = () => {
    setCluster({ isProcessing: true, isError: false });
  }

  const saveClusterSuccess = (payload = {}) => {
    setCluster({ isProcessing: false });
  }

  const saveCulusterError = (error) => {
    notifications.pushNotification(error);
    setCluster({ isProcessing: true, isError: false });;
  }

  const saveCluster = (payload, userConfig, callback = () => { }) => {
    saveClusterStart();
    saveClusterApi({ payload }, userConfig.userConfig)
      .then((res = {}) => {
        notifications.pushNotification(prepareSuccessMessage({ code: 'CLUSTER_ADDED' }))
        saveClusterSuccess(res.body);
        callback();
      })
      .catch((error = {}) => {
        const _error = overrideErrorCode({
          error,
          toOverride: 'ZQTZA0009',
          withCodes: ['ClusterName', 'ClusterReceiverPort'],
        });
        notifications.pushNotification(_error);
        saveCulusterError(error);
      });
  };
  const updateCluster = (payload, userConfig, callback = () => { }) => {
    saveClusterStart();
    updateClusterApi({ payload }, userConfig.userConfig)
      .then((res = {}) => {
        saveClusterSuccess(res.body);
        notifications.pushNotification(prepareSuccessMessage({ code: 'CLUSTER_UPDATED' }));
        callback();
      })
      .catch((error = {}) => {
        const _error = overrideErrorCode({
          error,
          toOverride: 'ZQTZA0009',
          withCodes: ['ClusterName', 'ClusterReceiverPort'],
        });
        notifications.pushNotification(_error);
        saveCulusterError(error);
      });
  };

  const getClusterStart = () => {
    setCluster({ isProcessing: true, isError: false });
  }

  const getClusterSuccess = (payload = {}) => {
    setCluster({ isProcessing: false, info: payload });
  }

  const getCulusterError = (error) => {
    notifications.pushNotification(error);
    setCluster({ isProcessing: true, isError: false });;
  }

  const getCluster = (payload, userConfig, callback = () => { }) => {
    getClusterStart();
    getClusterApi({ payload }, userConfig.userConfig)
      .then((res = {}) => {
        getClusterSuccess(res.body);
        callback();
      })
      .catch((error = {}) => {
        getCulusterError(error);
      });
  };

  return {
    cluster,
    setCluster,
    deleteCluster,
    saveCluster,
    getCluster,
    updateCluster,
  };
};

// Provider
function withClusterProvider(Component) {
  function ClusterProvider(props) {
    const cluster = useCluster();

    return (
      <ClusterContext.Provider value={cluster}>
        <Component
          {...props}
        />
      </ClusterContext.Provider>
    );
  }

  return ClusterProvider;
};

export { ClusterContext, withClusterProvider };