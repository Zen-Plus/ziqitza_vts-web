import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchRules } from '../../api/rules';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const RulesContext = React.createContext({ ...initialState });

// Hook
const useRules = (
  initialStates = { ...initialState }
) => {
  const [rules, setRules] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchRulesStart = () => {
    setRules({ isFetching: true, isError: false });
  }

  const fetchRulesSuccess = (states) => {
    setRules({ isFetching: false, info: { data: states.data } });
  }

  const fetchRulesError = (error) => {
    notifications.pushNotification(error);
    setRules({ isFetching: false, isError: true });
  }

  const getRulesList = (queryParams, userConfig) => {
    fetchRulesStart();
    fetchRules(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchRulesSuccess(res.body);
      })
      .catch((err) => {
        fetchRulesError(err);
      });
  }
  const fetchRulesLoadMoreStart = () => {
    setRules({ isFetching: true, isError: false });
  }
  const fetchRulesLoadMoreSuccess = (states) => {
    setRules({
      ...rules,
      isFetching: false,
      info: {
        ...rules.info,
        data: {
          ...rules.info.data,
          content: [...rules.info.data.content, ...states.data.content],
        },
      },
    });
  }

  const fetchRulesLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setRules({ isFetching: false, isError: true });
  }

  const getRulesListLoadMore = (queryParams, userConfig) => {
    fetchRulesLoadMoreStart();
    fetchRules(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchRulesLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchRulesLoadMoreError(err);
      });
  }

  return {
    rules,
    setRules,
    getRulesList,
    getRulesListLoadMore
  };
};

// Provider
function withRulesProvider(Component) {
  function RulesProvider(props) {
    const rules = useRules();

    return (
      <RulesContext.Provider value={rules}>
        <Component
          {...props}
        />
      </RulesContext.Provider>
    );
  }

  return RulesProvider;
};

export { RulesContext, withRulesProvider };