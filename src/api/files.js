import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function downloadFile(id, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}${endPoints.documents}`,
    webApiKey: userConfig.config.webApiKey,
    query: { uuid: id },
    responseType: 'blob',
    method: 'get',    
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export default {
  downloadFile,
};
