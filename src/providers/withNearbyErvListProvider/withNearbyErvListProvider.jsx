import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchNearbyEvrsList } from '../../api/nearbyErv';
import { NotificationContext } from '../withNotificationProvider';
import { cloneDeep } from '../../common/helpers/collectionUtils';
import { compareValues } from '../../common/helpers/commonUtils';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  nearbyErvsList: null,
  displayNearbyErvsList: null,
};

// Context
const NearbyEvrsListContext = React.createContext({ ...initialState });

// updating list
function updateList(list, listState = {}) {
  const _values = cloneDeep(list);
  if (_values.data && _values.data.length && listState.sortDirection) {
    _values.data.sort(compareValues(listState.sortBy, listState.sortDirection));
  }

  return _values;
}
// Hook
const useNearbyEvrsList = (
  initialNearbyEvrsList = { ...initialState },
) => {
  const [nearbyEvrsList, setNearbyEvrsList] = useCustomState(initialNearbyEvrsList);
  const notifications = React.useContext(NotificationContext);

  const fetchNearbyEvrsListStart = () => {
    setNearbyEvrsList({ isFetching: true, isError: false, nearbyErvsList: null });
  };

  const fetchNearbyEvrsListSuccess = (payload) => {
    setNearbyEvrsList({ isFetching: false, nearbyErvsList: payload });
  };

  const fetchNearbyEvrsListError = (error) => {
    notifications.pushNotification(error);
    setNearbyEvrsList({ isFetching: false, isError: true });
  };

  const getNearbyEvrsListList = (queryParams, userConfig) => {
    fetchNearbyEvrsListStart();
    fetchNearbyEvrsList(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchNearbyEvrsListSuccess(res.body);
      })
      .catch((err) => {
        fetchNearbyEvrsListError(err);
      });
  };

  const getDisplayNearbyErvLists = (listState, isApi = false, userConfig) => {
    if (isApi) {
      getNearbyEvrsListList(listState, userConfig);
    } else if (nearbyEvrsList.nearbyErvsList) {
      const _values = updateList(nearbyEvrsList.nearbyErvsList, listState);
      setNearbyEvrsList({ displayNearbyErvsList: _values });
    }
  };
  return {
    nearbyEvrsList,
    setNearbyEvrsList,
    getDisplayNearbyErvLists,
  };
};

// Provider
function withNearbyEvrsListProvider(Component) {
  function NearbyEvrsListProvider(props) {
    const nearbyEvrsList = useNearbyEvrsList();

    return (
      <NearbyEvrsListContext.Provider value={nearbyEvrsList}>
        <Component
          {...props}
        />
      </NearbyEvrsListContext.Provider>
    );
  }

  return NearbyEvrsListProvider;
}

export { NearbyEvrsListContext, withNearbyEvrsListProvider };
