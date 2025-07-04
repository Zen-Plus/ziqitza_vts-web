import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchServiceStatus } from '../../api/serviceStatus';
import { NotificationContext } from '../withNotificationProvider';
import { cloneDeep } from '../../common/helpers/collectionUtils';
import { convertMilliseconds, compareValues } from '../../common/helpers/commonUtils';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  services: null,
  displayServices: null,
};

// Context
const ServiceStatusContext = React.createContext({ ...initialState });


// updating list
function updateList(list, listState) {
  const _values = cloneDeep(list);
  const { setting } = listState;
  _values.dataArray = _values.data;
  _values.data = {};
  if (listState.searchText) {
    _values.dataArray = _values.dataArray.filter(
      (val) => val.clusterName.toLocaleLowerCase().trim()
        .includes(listState.searchText.toLocaleLowerCase().trim()),
    );
  }
  if (listState.sortDirection) {
    _values.dataArray.sort(compareValues(listState.sortBy, listState.sortDirection));
  }
  if (setting) {
    _values.dataArray = _values.dataArray.map((val) => {
      const _val = cloneDeep(val);
      const format = setting.displayTime && setting.displayTime.id;
      _val.networkDelay = convertMilliseconds(val.networkDelay, format);
      _val.processingDelay = convertMilliseconds(val.processingDelay, format);
      return _val;
    });
  }
  const startIndex = listState.pageNo * listState.pageSize;
  const totalElements = _values.dataArray.length;
  _values.data.content = _values.dataArray.splice(startIndex, listState.pageSize);
  _values.data.totalElements = totalElements;
  _values.data.numberOfElements = _values.data.content.length;
  _values.data.first = listState.pageNo === 0;
  _values.data.size = listState.pageSize;
  _values.data.last = Math.floor(_values.data.totalElements / _values.data.size)
    === listState.pageNo || _values.data.totalElements === _values.data.size;
  _values.data.number = listState.pageNo;
  return _values;
}
// Hook
const useServiceStatus = (
  initialServiceStatus = { ...initialState },
) => {
  const [serviceStatus, setServiceStatus] = useCustomState(initialServiceStatus);
  const notifications = React.useContext(NotificationContext);

  const fetchServiceStatusStart = () => {
    setServiceStatus({ isFetching: true, isError: false, services: null });
  };

  const fetchServiceStatusSuccess = (payload) => {
    setServiceStatus({ isFetching: false, services: payload });
  };

  const fetchServiceStatusError = (error) => {
    notifications.pushNotification(error);
    setServiceStatus({ isFetching: false, isError: true });
  };

  const getServiceStatusList = (queryParams, userConfig) => {
    fetchServiceStatusStart();
    fetchServiceStatus(queryParams, userConfig.userConfig) // TO BE CHANGED
      .then((res) => {
        fetchServiceStatusSuccess(res.body);
      })
      .catch((err) => {
        fetchServiceStatusError(err);
      });
  };
  const getDisplayServicesList = (listState, isApi = false, userConfig) => {
    if(isApi){
      getServiceStatusList(listState, userConfig);
    }else{
      if (serviceStatus.services) {
        const _values = updateList(serviceStatus.services, listState);
        setServiceStatus({ displayServices: _values });
      }
    }
  };
  return {
    serviceStatus,
    setServiceStatus,
    getDisplayServicesList,
  };
};

// Provider
function withServiceStatusProvider(Component) {
  function ServiceStatusProvider(props) {
    const serviceStatus = useServiceStatus();

    return (
      <ServiceStatusContext.Provider value={serviceStatus}>
        <Component
          {...props}
        />
      </ServiceStatusContext.Provider>
    );
  }

  return ServiceStatusProvider;
}

export { ServiceStatusContext, withServiceStatusProvider };
