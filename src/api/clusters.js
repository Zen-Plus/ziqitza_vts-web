import apiCall from "./apiRequest";
import endPoints from "./endPoints";
import version from "./apiVersion";

function fetchClusters(listState, userConfig) {
  let query = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.searchText = listState.searchText;
  query.sortBy = listState.sortBy;
  query.sortDirection = listState.sortDirection;

  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.clusters}`,
    webApiKey: userConfig.config.webApiKey,
    query,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function saveCluster({ payload }, userConfig) {
  let query = {};
  query.reason = payload.note;
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.clusters}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    payload,
    query,
    method: "post",
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function updateCluster({ payload }, userConfig) {
  const { id } = payload;
  let query = {};
  query.reason = payload.reason;
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.clusters}${id}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    payload,
    method: "put",
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function deleteCluster({ payload }, userConfig) {
  const { reason, id } = payload;

  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.clusters}${id}`,
    webApiKey: userConfig.config.webApiKey,
    query: { reason },
    method: "delete",
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

function getCluster({ payload }, userConfig) {
  return apiCall({
    url: `${userConfig.config.api.vtsUrl}${version.v1}${endPoints.clusters}${payload.id}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export {
  fetchClusters,
  deleteCluster,
  saveCluster,
  getCluster,
  updateCluster,
};
