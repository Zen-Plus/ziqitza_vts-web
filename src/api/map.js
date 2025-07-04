import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function fetchLatLngFromAddress(listState, userConfig) {
  const query = {};
  const payload = {};
  query.apiProvider = listState.apiProvider;
  if (listState.geocodingRequest) {
    payload.address = listState.geocodingRequest;
  }
  return apiCall({
    method: 'post',
    url: `${userConfig.config.api.mapUrl}${version.v1}${endPoints.map}/geocoding`,
    webApiKey: userConfig.config.webApiKey,
    query,
    payload,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export default {
  fetchLatLngFromAddress,
};
