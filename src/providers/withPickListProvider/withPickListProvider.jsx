import React, { useEffect } from 'react';
import ContentWrap from '../../components/ContentWrap';
import apiVersion from '../../api/apiVersion';
import { fetchPickList } from '../../api/pickList';
import useCustomState from '../../common/hooks/useCustomState';
import { UserConfigContext } from '../withUserConfigProvider';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  info: {},
  isError: false,
  version: '',
};

// Context
const PickListContext = React.createContext({ ...initialState });

// Hook
const usePickList = (
  initialPickList = { ...initialState }
) => {
  const [pickList, setPickList] = useCustomState(initialPickList);

  const notifications = React.useContext(NotificationContext);
  const userConfig = React.useContext(UserConfigContext);

  const fetchPickListStart = () => {
    setPickList({ isFetching: true, isError: false });
  }

  const fetchPickListSuccess = (pickListData) => {
    setPickList({ isFetching: false, info: pickListData });
  }

  const fetchPickListError = (error) => {
    notifications.pushNotification(error);
    setPickList({ isFetching: false, isError: true });
  }

  const getPickList = (query, version) => {
    fetchPickListStart();
    fetchPickList({ query, version, userConfig: userConfig.userConfig })
      .then((res) => {
        fetchPickListSuccess(res.body);
      })
      .catch((err) => {
        fetchPickListError(err);
      });
  }

  return {
    pickList,
    setPickList,
    getPickList,
  };
};

// Provider
function withPickListProvider(Component, config = {}) {
  function ComponentWithPickListProvider(props) {
    const { pickList, getPickList } = usePickList();
    const pickListData = (pickList && pickList.info && pickList.info.data) || {};

    useEffect(() => {
      const version = config.version || apiVersion.v2;
      if (!Object.keys(pickListData).length || version !== pickList.version) {
        getPickList(config, version);
      }
    }, []);

    return (
      <ContentWrap isFetching={pickList.isFetching || !Object.keys(pickListData).length}>
        <Component
          {...props}
          pickListData={pickListData}
        />
      </ContentWrap>
    );
  }

  return ComponentWithPickListProvider;
}

export { PickListContext, withPickListProvider };
