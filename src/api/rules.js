import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function fetchRules(listState, userConfig) {
  let query = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.isPicklist = listState.isPicklist;

  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v2}${endPoints.pickLists}rules`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export default {
  fetchRules,
};
