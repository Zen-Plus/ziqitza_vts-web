import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';


function fetchNearbyErvVehicles(listState, userConfig) {
  const query = {};
  const payload = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.nearByVehicleStatus = listState.nearByVehicleStatus && listState.nearByVehicleStatus.id;

  if (listState.searchText && listState.searchText.length) {
    payload.latitude = listState.searchText[0];
    payload.longitude = listState.searchText[1];
  }
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.vehicles}${endPoints.nearBy}/map`,
    webApiKey: userConfig.config.webApiKey,
    query,
    payload,
    token: userConfig.token,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchNearbyEvrsList(listState, userConfig) {
  const payload = listState.payload;

  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.vehicles}${endPoints.nearBy}`,
    webApiKey: userConfig.config.webApiKey,
    payload,
    token: userConfig.token,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}
export { fetchNearbyErvVehicles, fetchNearbyEvrsList };
