import apiCall from "./apiRequest";
import endPoints from "./endPoints";
import version from "./apiVersion";
import moment from "moment";

function getFiltersData(filter) {
  const _filter = {};
  _filter.vendorIds =
    filter.vendor && filter.vendor.id ? [filter.vendor.id] : [];
  _filter.stateIds = filter.state && filter.state.id ? [filter.state.id] : [];
  _filter.districtIds =
    filter.district && filter.district.id ? [filter.district.id] : [];
  _filter.parkingIds =
    filter.parking && filter.parking.id ? [filter.parking.id] : [];
  _filter.fromDate = filter.dateRange && moment(filter.dateRange[0]).valueOf();
  _filter.toDate = filter.dateRange && moment(filter.dateRange[1]).valueOf();
  return _filter;
}

function getExportDataPayload(filter) {
  const _payload = {};
  _payload.vendor = filter.vendor && filter.vendor.name;
  _payload.state = filter.state && filter.state.name;
  _payload.district = filter.district && filter.district.name;
  _payload.parkingBay = filter.parking && filter.parking.name;
  _payload.generatedOn = filter.generatedOn && moment(filter.generatedOn).valueOf();
  return _payload;
}

function fetchGPSQualityReport(listState, userConfig) {
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
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.gpsReport}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function exportGPSQualityReport(listState, userConfig) {
  const { filter } = listState;
  let payload = {
    vehicleIds: listState.selectedGPSQualityReports,
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
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.gpsReportExport}`,
    webApiKey: userConfig.config.webApiKey,
    payload,
    query,
    responseType: "blob",
    method: "post",
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchAllGPSQualityReport(listState, userConfig) {
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
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.printGpsReport}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchStatsForPacketLoss(listState, userConfig) {
  let query = {};
  query.fromDate = listState.dateRange && moment(listState.dateRange[0]).valueOf();
  query.toDate = listState.dateRange && moment(listState.dateRange[1]).valueOf();

  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.gpsReport}graphs/packet-loss`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchStatsForPacketDisrepancy(listState, userConfig) {
  let query = {};
  query.fromDate = listState.dateRange && moment(listState.dateRange[0]).valueOf();
  query.toDate = listState.dateRange && moment(listState.dateRange[1]).valueOf();

  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.gpsReport}graphs/packet-discrepancy`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export {
  fetchGPSQualityReport,
  exportGPSQualityReport,
  fetchAllGPSQualityReport,
  fetchStatsForPacketLoss,
  fetchStatsForPacketDisrepancy,
};
