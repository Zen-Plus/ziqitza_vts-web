import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchStates, fetchGeographicalRestrictedStates } from '../../api/states';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const StatesContext = React.createContext({ ...initialState });

// Hook
const useStates = (
  initialStates = { ...initialState }
) => {
  const [states, setStates] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchStatesStart = () => {
    setStates({ isFetching: true, isError: false });
  }

  const fetchStatesSuccess = (states) => {
    setStates({ isFetching: false, info: { data: states.data } });
  }

  const fetchStatesError = (error) => {
    notifications.pushNotification(error);
    setStates({ isFetching: false, isError: true });
  }

  const getStatesList = (queryParams, userConfig) => {
    fetchStatesStart();
    fetchStates(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchStatesSuccess(res.body);
      })
      .catch((err) => {
        fetchStatesError(err);
      });
  }
  const getGeographicalRestrictedStatesList = (queryParams, userConfig) => {
    fetchStatesStart();
    fetchGeographicalRestrictedStates(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchStatesSuccess(res.body);
      })
      .catch((err) => {
        fetchStatesError(err);
      });
  }
  const fetchStatesLoadMoreStart = () => {
    setStates({ isFetching: true, isError: false });
  }
  const fetchStatesLoadMoreSuccess = (state) => {
    setStates({
      ...states,
      isFetching: false,
      info: {
        ...states.info,
        data: {
          ...states.info.data,
          content: [...states.info.data.content, ...state.data.content],
        },
      },
    });
  }

  const fetchStatesLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setStates({ isFetching: false, isError: true });
  }

  const getStatesListLoadMore = (queryParams, userConfig) => {
    fetchStatesLoadMoreStart();
    fetchStates(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchStatesLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchStatesLoadMoreError(err);
      });
  }
  const getGeographicalRestrictedStatesListLoadMore = (queryParams, userConfig) => {
    fetchStatesLoadMoreStart();
    fetchGeographicalRestrictedStates(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchStatesLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchStatesLoadMoreError(err);
      });
  }

  return {
    states,
    setStates,
    getStatesList,
    getStatesListLoadMore,
    getGeographicalRestrictedStatesList,
    getGeographicalRestrictedStatesListLoadMore,
  };
};

// Provider
function withStatesProvider(Component) {
  function StatesProvider(props) {
    const states = useStates();

    return (
      <StatesContext.Provider value={states}>
        <Component
          {...props}
        />
      </StatesContext.Provider>
    );
  }

  return StatesProvider;
};

export { StatesContext, withStatesProvider };