import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchProtocols, fetchProtocolsMasterList } from '../../api/protocols';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const ProtocolsContext = React.createContext({ ...initialState });

// Hook
const useProtocols = (
  initialStates = { ...initialState }
) => {
  const [protocols, setProtocols] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchProtocolsStart = () => {
    setProtocols({ isFetching: true, isError: false });
  }

  const fetchProtocolsSuccess = (states) => {
    setProtocols({ isFetching: false, info: { data: states.data } });
  }

  const fetchProtocolsError = (error) => {
    notifications.pushNotification(error);
    setProtocols({ isFetching: false, isError: true });
  }

  const getProtocolsList = (queryParams, userConfig) => {
    fetchProtocolsStart();
    fetchProtocols(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchProtocolsSuccess(res.body);
      })
      .catch((err) => {
        fetchProtocolsError(err);
      });
  }

  const getProtocolsMasterList = (queryParams, userConfig) => {
    fetchProtocolsStart();
    fetchProtocolsMasterList(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchProtocolsSuccess(res.body);
      })
      .catch((err) => {
        fetchProtocolsError(err);
      });
  }
  
  const fetchProtocolsLoadMoreStart = () => {
    setProtocols({ isFetching: true, isError: false });
  }
  const fetchProtocolsLoadMoreSuccess = (states) => {
    setProtocols({
      ...protocols,
      isFetching: false,
      info: {
        ...protocols.info,
        data: {
          ...protocols.info.data,
          content: [...protocols.info.data.content, ...states.data.content],
        },
      },
    });
  }

  const fetchProtocolsLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setProtocols({ isFetching: false, isError: true });
  }

  const getProtocolsListLoadMore = (queryParams, userConfig) => {
    fetchProtocolsLoadMoreStart();
    fetchProtocols(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchProtocolsLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchProtocolsLoadMoreError(err);
      });
  }

  return {
    protocols,
    setProtocols,
    getProtocolsList,
    getProtocolsListLoadMore,
    getProtocolsMasterList,
  };
};

// Provider
function withProtocolsProvider(Component) {
  function ProtocolsProvider(props) {
    const protocols = useProtocols();

    return (
      <ProtocolsContext.Provider value={protocols}>
        <Component
          {...props}
        />
      </ProtocolsContext.Provider>
    );
  }

  return ProtocolsProvider;
};

export { ProtocolsContext, withProtocolsProvider };