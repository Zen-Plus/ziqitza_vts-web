import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function fetchProtocols(listState, userConfig) {
  let query = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.isPicklist = listState.isPicklist;

  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v2}${endPoints.pickLists}protocols`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchProtocolsMasterList(listState, userConfig) {
  let query = {};

  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.sortBy = listState.sortBy;
  query.sortDirection = listState.sortDirection;

  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}${endPoints.protocols}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}


export default {
  fetchProtocols,
  fetchProtocolsMasterList,
};
