import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import BarChart from './BarChart/BarChart'
import TableChart from './ChiefComplaintTable/ChiefComplaintTable';
import { UserConfigContext } from '../../providers/withUserConfigProvider';
import {
  fetchDashboardAvgResponseTimeData,
  fetchDashboardAvgTripsData,
  fetchDashboardChiefComplaintData,
} from '../../api/darpan';
import useService from '../../common/hooks/useService';
import {
  averageResponseTimeGraphOptions,
  getInitialAverageTrip,
  getInitialChiefComplaintTime,

} from './util';

function UpDashboard({ intl, dateRangeFilter }) {
  const userConfig = useContext(UserConfigContext);
  const {
    data: dashboardAvgResponseData,
    request: dashboardAvgResponseDataRequest,
  } = useService({
    method: fetchDashboardAvgResponseTimeData,
    initialValuesMethod: getInitialAverageTrip,
    context: userConfig.userConfig,
    initialValues: {
      topFive: { datasets: [] },
      bottomFive: { datasets: [] },
    },
  });

  const {
    data: dashboardAvgTripsData,
    request: dashboardAvgTripsDataRequest,
  } = useService({
    method: fetchDashboardAvgTripsData,
    initialValuesMethod: getInitialAverageTrip,
    context: userConfig.userConfig,
    initialValues: {
      topFive: { datasets: [] },
      bottomFive: { datasets: [] },
    },
  });

  const {
    data: dashboardChiefComplaintData,
    request: dashboardChiefComplaintDataRequest,
  } = useService({
    method: fetchDashboardChiefComplaintData,
    initialValuesMethod: getInitialChiefComplaintTime,
    context: userConfig.userConfig,
    initialValues: {
      topFifteen: { datasets: [] },
      rowData: [],
    },
  });


  useEffect(() => {
    dashboardAvgResponseDataRequest(dateRangeFilter);
    dashboardAvgTripsDataRequest(dateRangeFilter);
    dashboardChiefComplaintDataRequest(dateRangeFilter);
  }, []);
  return (
    <div className="UpDashboard_Wrapper">

      <div className="UpDashboard">

        <div className="row Mt-20">
          <div className="col-12 col-md-6">
            <BarChart
              data={dashboardAvgTripsData && dashboardAvgTripsData.topFive}
              title={intl.formatMessage({ id: 'label.top5DistrictsAverageTripsPerDay' })}
            />
          </div>
          <div className="col-12 col-md-6 mt-2 mt-sm-0">
            <BarChart
              data={dashboardAvgTripsData && dashboardAvgTripsData.bottomFive}
              title={intl.formatMessage({ id: 'label.bottomDistrictsAverageTripsPerDay' })}
              titleBgColor="#F0F0F0"
            />
          </div>
        </div>
        <div className="row Mt-20">
          <div className="col-12 col-md-6">
            <BarChart
              data={dashboardAvgResponseData && dashboardAvgResponseData.topFive}
              title={intl.formatMessage({ id: 'label.topDistrictsAverageResponseTime' })}
              graphOptions={averageResponseTimeGraphOptions}
            />
          </div>
          <div className="col-12 col-md-6 mt-2 mt-sm-0">
            <BarChart
              data={dashboardAvgResponseData && dashboardAvgResponseData.bottomFive}
              title={intl.formatMessage({ id: 'label.bottomDistrictsAverageResponseTime' })}
              titleBgColor="#F0F0F0"
              graphOptions={averageResponseTimeGraphOptions}
            />
          </div>
        </div>
        <div className="row Mt-20">
          <div className="col-12 col-md-6">
            <TableChart
              rowData={dashboardChiefComplaintData
                && dashboardChiefComplaintData.rowData}
              title={intl.formatMessage({ id: 'label.chiefComplaints' })}
              titleBgColor="#F0F0F0"
            />
          </div>
          <div className="col-12 col-md-6 mt-2 mt-sm-0">
            <BarChart
              data={dashboardChiefComplaintData && dashboardChiefComplaintData.topFifteen}
              title={intl.formatMessage({ id: 'label.chiefComplaint' })}
              titleBgColor="#F0F0F0"
            />
          </div>
        </div>

      </div>
    </div>

  )
}

UpDashboard.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(UpDashboard)
