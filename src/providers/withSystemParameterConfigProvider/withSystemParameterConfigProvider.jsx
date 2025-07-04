import React, { useEffect } from 'react';
import ContentWrap from '../../components/ContentWrap';
import { fetchSystemParameterConfig } from '../../api/systemParameter';
import useCustomState from '../../common/hooks/useCustomState';
import { UserConfigContext } from '../withUserConfigProvider';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  info: [],
  isError: false,
};

// Context
const SystemParameterConfigContext = React.createContext({ ...initialState });

// Hook
const useSystemParameterConfig = (
  initialSystemParameterConfig = { ...initialState },
) => {
  const [systemParameterConfig, setSystemParameterConfig] = useCustomState(
    initialSystemParameterConfig,
  );

  const notifications = React.useContext(NotificationContext);
  const userConfig = React.useContext(UserConfigContext);

  const fetchSystemParameterConfigStart = () => {
    setSystemParameterConfig({ isFetching: true, isError: false });
  };

  const fetchSystemParameterConfigSuccess = (systemParameterConfigData) => {
    setSystemParameterConfig({ isFetching: false, info: systemParameterConfigData });
  };

  const fetchSystemParameterConfigError = (error) => {
    notifications.pushNotification(error);
    setSystemParameterConfig({ isFetching: false, isError: true });
  };

  const getSystemParameterConfig = (query, version) => {
    fetchSystemParameterConfigStart();
    fetchSystemParameterConfig({ query, version, userConfig: userConfig.userConfig })
      .then((res) => {
        fetchSystemParameterConfigSuccess(res.body);
      })
      .catch((err) => {
        fetchSystemParameterConfigError(err);
      });
  };

  return {
    systemParameterConfig,
    setSystemParameterConfig,
    getSystemParameterConfig,
  };
};

// Provider
function withSystemParameterConfigProvider(Component) {
  function ComponentWithSystemParameterConfigProvider(props) {
    const { systemParameterConfig, getSystemParameterConfig } = useSystemParameterConfig();
    const systemParameterConfigData = (systemParameterConfig
      && systemParameterConfig.info && systemParameterConfig.info.data) || [];

    useEffect(() => {
      if (systemParameterConfigData && !systemParameterConfigData.length) {
        getSystemParameterConfig();
      }
    }, []);

    return (
      <ContentWrap
        isFetching={systemParameterConfig.isFetching
      || !Object.keys(systemParameterConfigData).length}
      >
        <Component
          {...props}
          systemParameterConfigData={systemParameterConfigData}
        />
      </ContentWrap>
    );
  }

  return ComponentWithSystemParameterConfigProvider;
}

export { SystemParameterConfigContext, withSystemParameterConfigProvider };
