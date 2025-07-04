import apiCall from './apiRequest';
import endPoints from './endPoints';
import version from './apiVersion';

export function fetchNhmDashboardTiles(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}data-tiles`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchVehicleEquipmentCount(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}/${endPoints.equipmentAccessories}vehicle-equipment-count`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchVehicleEquipmentStatus(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}/${endPoints.equipmentAccessories}vehicle-equipment-status`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchMedicineInventory(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}${endPoints.reports}/inventory`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchAlsSummaryData(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}als-summary`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    method: 'post',
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchAlsSummaryExportData(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}als-summary-export`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    method: 'post',
    responseType: 'blob',
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchAlsDetailExportData(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}als-detail-export`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    method: 'post',
    responseType: 'blob',
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchVehicleDailyEquipmentStatus(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}/${endPoints.equipmentAccessories}vehicle-daily-equipment-status/${query.vehicleId}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query: {
      fromDate: query.fromDate,
      toDate: query.toDate,
    },
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function exportEquipmentAccessoriesStatus(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}/${endPoints.equipmentAccessories}vehicle-equipment-export`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    responseType: 'blob',
    query,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function exportDailyEquipmentAccessoriesStatus(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.baseUrl}${version.v1}/${endPoints.equipmentAccessories}vehicle-equipment-export/${query.vehicleId}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    responseType: 'blob',
    query: {
      fileType: query.fileType,
      fromDate: query.fromDate,
      toDate: query.toDate,
    },
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}
export function fetchAlsDailyDetail(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}als-detail`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    method: 'post',
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchOffRoadCountDetail(payload = {}, userConfig = {}, query = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}off-road`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    payload,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    method: 'post'
  });
}

export function exportOffRoadCountDetail(query = {}, userConfig = {}, payload = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}off-road-export`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    responseType: 'blob',
    method: 'post',
    payload
  });
}

export function fetchMonthlyOffroadDetail(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}monthly-off-road`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function exportMonthlyOffroadDetail(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}monthly-off-road-export`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    responseType: 'blob',
    query,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function exportOffRoadDetails(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}monthly-off-road-detail-export`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    responseType: 'blob',
    query,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchOffRoadDetails(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}monthly-off-road-detail`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function exportNonAvailabilityOfMedicines(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}${endPoints.reports}/not-available-medicines-export`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    responseType: 'blob',
    query,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchNonAvailabilityOfMedicines(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}${endPoints.reports}/not-available-medicines`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchJobWiseEquipmentData(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.edsUrl}${version.v1}/${endPoints.pcf}job-wise-equipments-used`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchJobWiseEquipmentExportData(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.edsUrl}${version.v1}/${endPoints.pcf}equipments-used-export`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    method: 'post',
    responseType: 'blob',
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function getPcfHafData(jobId, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.edsUrl}${version.v1}${endPoints.jobs}/${jobId}/pcf-documents`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function getOffroadSummaryDocument(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.edsUrl}${version.v1}/support-tickets/offroad-summary-document`,
    query,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchTotalFeedbackTakenData(payload = {}, userConfig = {}, token = "") {
  return apiCall({
    url: `${userConfig.config.api.zenplusUrl}/${endPoints.getCallDetailData}`,
    method: 'post',
    authToken: token,
    payload
  });
}

export function fetchTotalFeedbackTakenExportData(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.feedbackDetailExport}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    method: 'post',
    responseType: 'blob',
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchTotalPregnancyCasesServedSummary(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.pregnantLadyCaseServed}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchMonthlyCaseServedDetail(query = {}, userConfig = {}, payload = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.monthlyCaseServedDetail}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    payload,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    method: 'post', 
  });
}

export function totalCasesServedFilter(payload = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.totalDashboardVehicleDetail}`,
    payload,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    method: 'post'
  });
}

export function fetchAverageKmsPerTripSummary(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.averageKmAverageResponse}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchAverageResponseTimeUrbanRuralSummary(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.averageKmAverageResponse}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchAmbulanceSummary(query = {}, userConfig = {}, payload = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.ambulanceSummary}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    payload,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    method: 'post',
  });
}

export function exportAverageKmsPerTripSummary(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.exportAverageKm}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    responseType: 'blob',
    query,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function exportAverageResponseTimeUrbanRuralSummary(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.exportAverageResponseTime}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    responseType: 'blob',
    query,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function exportAmbulanceSummary(query = {}, userConfig = {}, payload = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.exportAmbulanceSummary}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    responseType: 'blob',
    query,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    payload
  });
}

export function exportMonthlyCaseServedDetail(query = {}, userConfig = {}, payload = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.exportMonthlyCaseServedDetail}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    responseType: 'blob',
    query,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
    payload
  });
}

export function fetchTodayBookedCaseDetail(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.todayBookedCaseDetail}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function exportTodayBookedCaseDetail(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.exportTodayBookedCaseDetail}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    responseType: 'blob',
    query,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchCallsLandedOn102(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.callsLanded102}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query: query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchDailyAcStatus(payload = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.plexitechUrl}/${endPoints.zhlEds}${endPoints.jobTrip}${endPoints.bhAmbulanceAcStatusDetails}`,
    token: userConfig.token,
    payload,
    method: 'post'
  });
}

export function exportDailyAcStatus(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.exportDailyAcStatus}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    responseType: 'blob',
    query,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchSeniorCitizenCaseServedDetail(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.seniorCitizenCaseServedDetail}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchSickNewBornCaseServedDetail(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.sickNewBornCaseServedDetail}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    query,
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export function fetchBHAcStatusCount(payload = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.plexitechUrl}/${endPoints.zhlEds}${endPoints.jobTrip}${endPoints.bhAmbulanceAcStatusCount}`,
    payload,
    method: 'post'
  });
}

export function fetchAbandonedCallSummaryData(payload = {}, userConfig = {}, token = "") {
  return apiCall({
    url: `${userConfig.config.api.zenplusUrl}/${endPoints.abandonedCallSummaryData}`,
    authToken: token,
    payload,
    method: 'post'
  });
}

export function fetchFeedbackCallSummaryData(token = "", userConfig = {}) {  
  return apiCall({
    url: `${userConfig.config.api.zenplusUrl}/${endPoints.feedbackCallSummaryData}`,
    method: 'post',
    authToken: token
  });
}

export function exportDetailExcel(query = {}, userConfig = {}) {
  return apiCall({
    url: `${userConfig.config.api.reportUrl}${version.v1}/${endPoints.nhmDashboard}${endPoints.dashboardReports}`,
    webApiKey: userConfig.config.webApiKey,
    token: userConfig.token,
    responseType: 'blob',
    query,
    method: 'post',
    handleVtsInvalidToken: userConfig.handleVtsInvalidToken,
  });
}

export default {
  fetchMedicineInventory,
  fetchVehicleDailyEquipmentStatus,
  exportEquipmentAccessoriesStatus,
  exportDailyEquipmentAccessoriesStatus,
  fetchAlsSummaryData,
  fetchAlsSummaryExportData,
  fetchAlsDailyDetail,
  fetchOffRoadCountDetail,
  exportOffRoadCountDetail,
  fetchMonthlyOffroadDetail,
  exportMonthlyOffroadDetail,
  exportOffRoadDetails,
  fetchOffRoadDetails,
  exportNonAvailabilityOfMedicines,
  fetchNonAvailabilityOfMedicines,
  fetchJobWiseEquipmentData,
  fetchJobWiseEquipmentExportData,
  getPcfHafData,
  fetchTotalFeedbackTakenData,
  fetchTotalFeedbackTakenExportData,
  getOffroadSummaryDocument,
  fetchTotalPregnancyCasesServedSummary,
  fetchMonthlyCaseServedDetail,
  fetchAverageKmsPerTripSummary,
  fetchAverageResponseTimeUrbanRuralSummary,
  fetchAmbulanceSummary,
  exportAverageKmsPerTripSummary,
  exportAverageResponseTimeUrbanRuralSummary,
  exportAmbulanceSummary,
  exportMonthlyCaseServedDetail,
  fetchTodayBookedCaseDetail,
  exportTodayBookedCaseDetail,
  fetchCallsLandedOn102,
  fetchDailyAcStatus,
  exportDailyAcStatus,
  fetchSickNewBornCaseServedDetail,
  fetchSeniorCitizenCaseServedDetail,
};
