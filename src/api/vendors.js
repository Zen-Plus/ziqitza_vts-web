import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function fetchVendors(listState, userConfig) {
  let query = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.isPicklist = listState.isPicklist;

  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}${endPoints.vendors}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchGeographicalRestrictedVendors(listState, userConfig) {
  let query = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.isPicklist = listState.isPicklist;

  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}${endPoints.geographicalRestrictedPicklists}/vendors`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export default {
  fetchVendors,
  fetchGeographicalRestrictedVendors
};
