import apiCall from "./apiRequest";
import endPoints from "./endPoints";
import version from "./apiVersion";
import moment from 'moment';

function getFiltersData(filter) {
  const _filter = {};
  _filter.alertStatuses =
    filter.alertStatus && filter.alertStatus.id ? [filter.alertStatus.id] : [];
  _filter.readStatus = filter.readStatus && filter.readStatus.id;
  _filter.ruleIds =
    filter.ruleName && filter.ruleName.id ? [filter.ruleName.id] : [];
  _filter.fromDate = filter.dateRange && moment(filter.dateRange[0]).valueOf();
  _filter.toDate = filter.dateRange && moment(filter.dateRange[1]).valueOf();
  return _filter;
}

function fetchLiveTrackingAlerts(listState, userConfig) {
  let query = {};
  const { filter } = listState;
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.sortBy = listState.sortBy;
  query.sortDirection = listState.sortDirection;
  if (filter) {
    const updatedFilters = getFiltersData(filter);
    query = { ...query, ...updatedFilters };
  }
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.alertDashBoard}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}
function fetchHistoryTrackingAlerts(listState, userConfig) {
  let query = {};
  const { filter } = listState;
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.sortBy = listState.sortBy;
  query.sortDirection = listState.sortDirection;
  if (filter) {
    const updatedFilters = getFiltersData(filter);
    query = { ...query, ...updatedFilters };
  }
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.alertDashBoard}history/`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchAlertDetails(query, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.alerts}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchHistoryAlertDetails(query, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.alerts}history`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function checkAlertLock(payload, userConfig) {
  let query = {};
  const { id } = payload;
  query.isLocked = payload.isLocked;
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.alerts}${id}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}
function updateAlert(payload, userConfig) {
  const { id } = payload;
  let query = {};
  query.isCloseException = payload.isCloseException;
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.alerts}${id}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    payload,
    method: "put",
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export {
  fetchLiveTrackingAlerts,
  fetchHistoryTrackingAlerts,
  fetchAlertDetails,
  checkAlertLock,
  updateAlert,
  fetchHistoryAlertDetails,
};
