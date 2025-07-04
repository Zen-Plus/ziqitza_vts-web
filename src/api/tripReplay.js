import apiCall from "./apiRequest";
import endPoints from "./endPoints";
import version from "./apiVersion";

function fetchJobData(query, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.auditUrl}${version.v1}${endPoints.audit}${endPoints.jobData}/`,
    query,
    method: 'post',
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchDistancePacket(query, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.vtsMatrixUrl}${version.v1}${endPoints.distanceEvaluation}${endPoints.packetInfo}/`,
    query,
    method: 'get',
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function exportJobData(query, userConfig) {

  return apiCall({
    url: `${userConfig.config.api.auditUrl}${version.v1}${endPoints.audit}${endPoints.jobData}/export`,
    webApiKey: userConfig.config.webApiKey,
    query,
    responseType: "blob",
    method: "post",
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function exportGpsPacketData(query, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.vtsMatrixUrl}${version.v1}${endPoints.distanceEvaluation}${endPoints.packetInfo}/export`,
    webApiKey: userConfig.config.webApiKey,
    query,
    responseType: "blob",
    method: "post",
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchJobMilestone(query, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.tripReplay}${endPoints.jobs}/milestone`,
    query,
    method: 'get',
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchStMilestone(query, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.tripReplay}${endPoints.supportTickets}/milestone`,
    query,
    method: 'get',
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchTripReplayJobData(query, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.tripReplay}${endPoints.jobs}/validate`,
    query,
    method: 'get',
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchTripReplayStData(query, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.tripReplay}${endPoints.supportTickets}/validate`,
    query,
    method: 'get',
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchTripReplayVehicleData(query, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.tripReplay}${endPoints.vehicles}/validate`,
    query,
    method: 'get',
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function fetchTripReplayPacketDataInfo(query, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.vtsMatrixUrl}${version.v1}${endPoints.vehicleTripReplay}${endPoints.packetInfo}`,
    query,
    method: 'get',
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function exportVehicleGpsPacketInfoData(query, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.vtsMatrixUrl}${version.v1}${endPoints.vehicleTripReplay}${endPoints.packetInfo}/export`,
    webApiKey: userConfig.config.webApiKey,
    query,
    responseType: "blob",
    method: "post",
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export { 
    fetchJobData,
    fetchDistancePacket,
    exportJobData,
    exportGpsPacketData,
    fetchJobMilestone,
    fetchStMilestone,
    fetchTripReplayJobData,
    fetchTripReplayStData,
    fetchTripReplayVehicleData,
    fetchTripReplayPacketDataInfo,
    exportVehicleGpsPacketInfoData,
};
