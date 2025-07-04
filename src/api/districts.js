import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function fetchDistricts(listState, userConfig) {
  let query = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.isPicklist = listState.isPicklist;
  query.stateId = listState.stateId;

  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}${endPoints.districts}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchGeographicalRestrictedDistricts(listState, userConfig) {
  let query = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.isPicklist = listState.isPicklist;
  query.stateId = listState.stateId;

  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}${endPoints.geographicalRestrictedPicklists}/districts`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchProjectDistricts(listState, userConfig) {
  let query = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.isPicklist = listState.isPicklist;
  query.stateId = listState.stateId;

  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}${endPoints.projects}/district-picklist`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export default {
  fetchDistricts,
  fetchGeographicalRestrictedDistricts,
  fetchProjectDistricts,
};
