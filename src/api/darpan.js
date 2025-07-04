import getConfig from 'next/config';
import apiCall from './apiRequest';
import version from './apiVersion';

const { publicRuntimeConfig } = getConfig();
const { api } = publicRuntimeConfig;

export function fetchDashboardTilesData(query = {}, userConfig = {}) {
  return apiCall({
    url: `${api.reportUrl}${version.v1}/darpan/data-tiles`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchDashboardAvgTripsData(query = {}, userConfig = {}) {
  return apiCall({
    url: `${api.reportUrl}${version.v1}/darpan/avg-trips`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}
export function fetchDashboardAvgResponseTimeData(query = {}, userConfig = {}) {
  return apiCall({
    url: `${api.reportUrl}${version.v1}/darpan/avg-response-time`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,

  });
}
export function fetchDashboardChiefComplaintData(query = {}, userConfig = {}) {
  return apiCall({
    url: `${api.reportUrl}${version.v1}/darpan/chief-complaint`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}
export function fetchDashboardDailyResponseTimeData(query) {
  return apiCall({
    url: `${api.reportUrl}${version.v1}/darpan/daily-response-time`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}
export function fetchDashboardDistrictWiseDetails({ query }) {
  return apiCall({
    url: `${api.reportUrl}${version.v1}/darpan/district-wise-details`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export default {
  fetchDashboardTilesData,
  fetchDashboardAvgTripsData,
  fetchDashboardAvgResponseTimeData,
  fetchDashboardChiefComplaintData,
  fetchDashboardDailyResponseTimeData,
  fetchDashboardDistrictWiseDetails,
};
