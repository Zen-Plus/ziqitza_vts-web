import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function exportReport(payload = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}${endPoints.reports}/inventory`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    responseType: 'blob',
    payload,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export default {
  exportReport,
};
