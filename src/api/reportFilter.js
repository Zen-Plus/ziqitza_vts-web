import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function fetchReportFilter(listState, userConfig) {
  let query = {};
  let payload = {};
  query.pageSize = listState.pageSize;
  query.pageNo = listState.pageNo;
  query.vehicleSearchText = listState.searchText;
  query.isPicklist = listState.isPicklist;
  payload.baseLocationId = listState.baseLocationId;
  payload.clusterLeaderId = listState.clusterLeaderId;
  payload.districtId = listState.districtId;
  payload.vehicleId = listState.vehicleId;


  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}${endPoints.inventory}/report-filter`,
    webApiKey: userConfig.config.webApiKey,
    method: 'post',
    query,
    payload,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export default {
  fetchReportFilter,
};
