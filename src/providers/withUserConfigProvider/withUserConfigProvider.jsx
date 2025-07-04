import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../common/helpers/commonUtils';
import useCustomState from '../../common/hooks/useCustomState';
import ContentWrap from '../../components/ContentWrap/ContentWrap';

// inital context state
const initialState = {
  token: '',
  config: {},
  handleVtsInvalidToken: () => {},
};

// Context
const UserConfigContext = React.createContext({ ...initialState });

// Hook
const useUserConfig = (
  initialUserConfig = { token: '', config: {}, handleVtsInvalidToken: () => {} }
) => {
  const [userConfig, setUserConfig] = useCustomState(initialUserConfig);

  return {
    userConfig,
    setUserConfig,
  };
};

// Provider
function withUserConfigProvider(Component) {
  function UserConfigProvider(props) {
    const userConfig = useUserConfig(props.userConfig);

    useEffect(() => {
      userConfig.setUserConfig(props.userConfig);
    }, [props.userConfig])

    const { token, config } = userConfig.userConfig;
    const isUserLoaded = !!(token && !isEmpty(config));

    return (
      <UserConfigContext.Provider value={userConfig}>
        <ContentWrap isFetching={!isUserLoaded}>
          <Component
            {...props}
          />
        </ContentWrap>
      </UserConfigContext.Provider>
    );
  }

  UserConfigProvider.propTypes = {
    userConfig: PropTypes.object.isRequired,
  };

  return UserConfigProvider;
};

export { UserConfigContext, withUserConfigProvider };