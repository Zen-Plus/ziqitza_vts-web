import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function fetchStates(listState, userConfig) {
  let query = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.isPicklist = listState.isPicklist;

  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}${endPoints.states}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}
export function fetchGeographicalRestrictedStates(listState, userConfig) {
  let query = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.isPicklist = listState.isPicklist;

  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}${endPoints.geographicalRestrictedPicklists}/states`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}
export default {
  fetchStates,
  fetchGeographicalRestrictedStates,
};
