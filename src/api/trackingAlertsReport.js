import apiCall from "./apiRequest";
import endPoints from "./endPoints";
import version from "./apiVersion";
import moment from "moment";

function getFiltersData(filter) {
  const _filter = {};
  _filter.fromDate = filter.dateRange && moment(filter.dateRange[0]).valueOf();
  _filter.toDate = filter.dateRange && moment(filter.dateRange[1]).valueOf();
  return _filter;
}

function getExportDataPayload(filter) {
  const _payload = {};
  _payload.generatedOn = filter.generatedOn && moment(filter.generatedOn).valueOf();
  return _payload;
}

function fetchTrackingAlertsReport(listState, userConfig) {
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
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.trackingAlertReport}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function exportTrackingAlertsReport(listState, userConfig) {
  const { filter } = listState;
  let payload = {
    userIds: listState.selectedTrackingAlertsReports,
  };
  let query = {};
  query.fileType = listState.fileType;
  query.pageSize = listState.pageSize;
  query.sortBy = listState.sortBy;
  query.sortDirection = listState.sortDirection;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;

  if (filter) {
    const updatedFilter = getFiltersData(filter);
    const updatedExportDataPayload = getExportDataPayload(filter);
    query = { ...query, ...updatedFilter };
    payload = { ...payload, ...updatedExportDataPayload };
  }

  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.trackingAlertReportExport}`,
    webApiKey: userConfig.config.webApiKey,
    payload,
    query,
    responseType: "blob",
    method: "post",
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchAllTrackingAlertsReport(listState, userConfig) {
  let query = {};
  const { filter } = listState;

  if (listState) {
    query.sortBy = listState.sortBy;
    query.sortDirection = listState.sortDirection;
    query.searchText = listState.searchText;
  }

  if (filter) {
    const updatedFilters = getFiltersData(filter);
    query = { ...query, ...updatedFilters };
  }

  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.printTrackingAlertReport}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchStatsForAlert(listState, userConfig) {
  let query = {};
  query.graphType = listState.performanceType;
  query.fromDate = listState.dateRange && moment(listState.dateRange[0]).valueOf();
  query.toDate = listState.dateRange && moment(listState.dateRange[1]).valueOf();

  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.trackingAlertReport}graphs/alerts`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchStatsForTime(listState, userConfig) {
  let query = {};
  query.graphType = listState.performanceType;
  query.fromDate = listState.dateRange && moment(listState.dateRange[0]).valueOf();
  query.toDate = listState.dateRange && moment(listState.dateRange[1]).valueOf();

  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.trackingAlertReport}graphs/time`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export {
  fetchTrackingAlertsReport,
  exportTrackingAlertsReport,
  fetchAllTrackingAlertsReport,
  fetchStatsForAlert,
  fetchStatsForTime,
};
