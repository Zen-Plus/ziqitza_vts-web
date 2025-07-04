import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

function fetchPickList({ query, version: _version, userConfig }) {
  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version[_version]}${endPoints.pickLists}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export {
  fetchPickList,
};
