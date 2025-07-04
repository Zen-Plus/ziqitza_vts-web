import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function fetchClusterLeaders(listState, userConfig) {
  let query = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.isPicklist = listState.isPicklist;
  query.parkingBayStateIds = listState.parkingBayStateIds; 
  query.parkingBayDistrictIds = listState.parkingBayDistrictIds;

  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v2}${endPoints.pickLists}${endPoints.clusterLeads}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export default {
  fetchClusterLeaders,
};

