import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

function getFiltersData(filter) {
  const _filter = {};
  _filter.clientIds = filter.clientName
    && filter.clientName.id ? [filter.clientName.id] : [];
  _filter.vendorIds = filter.vendor
    && filter.vendor.id ? [filter.vendor.id] : [];
  _filter.stateIds = filter.state
    && filter.state.id ? [filter.state.id] : [];
  _filter.districtIds = filter.district
    && filter.district.id ? [filter.district.id] : [];
  _filter.clusterLeaderIds = filter.clusterLeader
    && filter.clusterLeader.id ? [filter.clusterLeader.id] : [];
  _filter.parkingBayIds = filter.parkingLocation
    && filter.parkingLocation.id ? [filter.parkingLocation.id] : [];
  _filter.types = filter.vehicleType
    && filter.vehicleType.id ? [filter.vehicleType.id] : [];
  _filter.vehicleStatus = filter.vehicleStatus
    && filter.vehicleStatus.id ? [filter.vehicleStatus.id] : [];
  return _filter;
}

function fetchVehicles(listState, userConfig) {
  let query = {};
  const { filter } = listState;
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.sortBy = listState.sortBy;
  query.sortDirection = listState.sortDirection;
  query.trackingStatus = listState.trackingStatus;

  if (filter) {
    const updatedFilter = getFiltersData(filter);
    query = { ...query, ...updatedFilter }
  }
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.dashboardVehicles}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchVehiclesForMap(listState, userConfig) {
  let query = {};
  const { filter } = listState;
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.trackingStatus = listState.trackingStatus;
  query.vehicleIds = listState.selectedVehicles;

  if (filter) {
    const updatedFilter = getFiltersData(filter);
    query = { ...query, ...updatedFilter }
  }

  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.mapVehicles}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken
  });
}

function fetchVehicleDetails({ vehicleId, userConfig }) {
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.dashboardVehicles}${vehicleId}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken
  });
}

function fetchVehicleCount({ userConfig }) {
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.dashboardVehicleCount}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchVehicleDistanceAndLocation({ vehicleId, userConfig }) {
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.dashboardVehicles}${vehicleId}/info`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export {
  fetchVehicles,
  fetchVehiclesForMap,
  fetchVehicleDetails,
  fetchVehicleCount,
  fetchVehicleDistanceAndLocation
};
