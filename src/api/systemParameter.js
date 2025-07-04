import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

function fetchSystemParameterConfig({ query, userConfig }) {
  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}/${endPoints.systemParameter}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export {
  fetchSystemParameterConfig,
};
