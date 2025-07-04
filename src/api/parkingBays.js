import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function fetchParkingBays(listState, userConfig) {
  let query = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.isPicklist = listState.isPicklist;
  query.districtIds = listState.districtIds;
  query.stateIds = listState.stateIds; 
  query.isNearbyErv = listState.isNearbyErv;
  
  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}${endPoints.parkingBays}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export default {
  fetchParkingBays,
};
