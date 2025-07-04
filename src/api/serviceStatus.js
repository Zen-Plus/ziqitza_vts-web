import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

function getSettingsData(setting) {
  const _setting = {};
  _setting.serviceStatusTimeInterval = setting.fetchStats
    && setting.fetchStats.id;
  return _setting;
}

function fetchServiceStatus(listState, userConfig) {
  let query = {};
  const { setting } = listState;

  if (setting) {
    const updatedSettings = getSettingsData(setting);
    query = { ...query, ...updatedSettings }
  }
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.serviceStatus}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}



export {
  fetchServiceStatus,
};
