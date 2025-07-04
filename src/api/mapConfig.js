import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

function fetchMapConfig({ query, payload, userConfig }) {
  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}${endPoints.mapConfig}provider/`,
    webApiKey: userConfig.config.webApiKey,
    query,
    payload: payload,
    method: "post",
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export {
  fetchMapConfig,
};
