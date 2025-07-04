import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchClients } from '../../api/clients';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const ClientsContext = React.createContext({ ...initialState });

// Hook
const useClients = (
  initialStates = { ...initialState }
) => {
  const [clients, setClients] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchClientsStart = () => {
    setClients({ isFetching: true, isError: false });
  }

  const fetchClientsSuccess = (states) => {
    setClients({ isFetching: false, info: { data: states.data } });
  }

  const fetchClientsError = (error) => {
    notifications.pushNotification(error);
    setClients({ isFetching: false, isError: true });
  }

  const getClientsList = (queryParams, userConfig) => {
    fetchClientsStart();
    fetchClients(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchClientsSuccess(res.body);
      })
      .catch((err) => {
        fetchClientsError(err);
      });
  }
  const fetchClientsLoadMoreStart = () => {
    setClients({ isFetching: true, isError: false });
  }
  const fetchClientsLoadMoreSuccess = (states) => {
    setClients({
      ...clients,
      isFetching: false,
      info: {
        ...clients.info,
        data: {
          ...clients.info.data,
          content: [...clients.info.data.content, ...states.data.content],
        },
      },
    });
  }

  const fetchClientsLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setClients({ isFetching: false, isError: true });
  }

  const getClientsListLoadMore = (queryParams, userConfig) => {
    fetchClientsLoadMoreStart();
    fetchClients(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchClientsLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchClientsLoadMoreError(err);
      });
  }

  return {
    clients,
    setClients,
    getClientsList,
    getClientsListLoadMore
  };
};

// Provider
function withClientsProvider(Component) {
  function ClientsProvider(props) {
    const clients = useClients();

    return (
      <ClientsContext.Provider value={clients}>
        <Component
          {...props}
        />
      </ClientsContext.Provider>
    );
  }

  return ClientsProvider;
};

export { ClientsContext, withClientsProvider };