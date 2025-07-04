import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

function fetchServiceRequestStatus(payload, userConfig) {
  const query = {};
  query.jobId = payload.jobId ;
  query.milestoneReportedType = payload.milestoneReportedType || 'CREW';

  return apiCall({
    url: `${userConfig.config.api.edsUrl}${version.v1}${endPoints.serviceRequests}status/${payload.id}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    method: 'get',
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export { fetchServiceRequestStatus };