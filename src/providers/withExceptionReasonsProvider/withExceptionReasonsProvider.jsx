import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchExceptionReasons } from '../../api/exceptionReasons';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const ExceptionReasonsContext = React.createContext({ ...initialState });

// Hook
const useExceptionReasons = (
  initialStates = { ...initialState }
) => {
  const [exceptionReasons, setExceptionReasons] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchExceptionReasonsStart = () => {
    setExceptionReasons({ isFetching: true, isError: false });
  }

  const fetchExceptionReasonsSuccess = (states) => {
    setExceptionReasons({ isFetching: false, info: { data: states.data } });
  }

  const fetchExceptionReasonsError = (error) => {
    notifications.pushNotification(error);
    setExceptionReasons({ isFetching: false, isError: true });
  }

  const getExceptionReasonsList = (queryParams, userConfig) => {
    fetchExceptionReasonsStart();
    fetchExceptionReasons(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchExceptionReasonsSuccess(res.body);
      })
      .catch((err) => {
        fetchExceptionReasonsError(err);
      });
  }
  const fetchExceptionReasonsLoadMoreStart = () => {
    setExceptionReasons({ isFetching: true, isError: false });
  }
  const fetchExceptionReasonsLoadMoreSuccess = (states) => {
    setExceptionReasons({
      ...exceptionReasons,
      isFetching: false,
      info: {
        ...exceptionReasons.info,
        data: {
          ...exceptionReasons.info.data,
          content: [...exceptionReasons.info.data.content, ...states.data.content],
        },
      },
    });
  }

  const fetchExceptionReasonsLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setExceptionReasons({ isFetching: false, isError: true });
  }

  const getExceptionReasonsListLoadMore = (queryParams, userConfig) => {
    fetchExceptionReasonsLoadMoreStart();
    fetchExceptionReasons(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchExceptionReasonsLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchExceptionReasonsLoadMoreError(err);
      });
  }

  return {
    exceptionReasons,
    setExceptionReasons,
    getExceptionReasonsList,
    getExceptionReasonsListLoadMore
  };
};

// Provider
function withExceptionReasonsProvider(Component) {
  function ExceptionReasonsProvider(props) {
    const exceptionReasons = useExceptionReasons();

    return (
      <ExceptionReasonsContext.Provider value={exceptionReasons}>
        <Component
          {...props}
        />
      </ExceptionReasonsContext.Provider>
    );
  }

  return ExceptionReasonsProvider;
};

export { ExceptionReasonsContext, withExceptionReasonsProvider };