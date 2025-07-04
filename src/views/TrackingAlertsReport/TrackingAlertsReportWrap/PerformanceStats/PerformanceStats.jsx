import React, { useEffect, useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Tabs from '../../../../components/Tabs';
import moment from 'moment';
import {
  getDataSetForGraph, getArrayOfKeyFromObjects, tabKeys, trackingAlertsReportPerformanceConfig,
} from './util';
import { TrackingAlertReportAlertStatsContext } from '../../../../providers/withTrackingAlertReportAlertStats';
import { TrackingAlertReportTimeStatsContext } from '../../../../providers/withTrackingAlertReportTimeStats';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';
import { BarGraph } from './Graphs';
import { ButtonWithIcon } from '../../../../components/Button';
import LoaderWithOverLay from '../../../../components/Loader/LoaderWithOverLay';
import useCustomState from '../../../../common/hooks/useCustomState';


const { TabPane } = Tabs;


function PerformanceStats({
  intl,
  filter,
  setTrackingAlertsReportView,
}) {
  const [activeTabKey, setActiveTabKey] = useState(tabKeys.TOP_PERFORMING);
  const [barGraphAlertData, setBarGraphAlertData] = useCustomState({});
  const [barGraphTimeData, setBarGraphTimeData] = useCustomState({});
  const trackingAlertReportAlertStatsInfo = useContext(TrackingAlertReportAlertStatsContext);
  const trackingAlertReportTimeStatsInfo = useContext(TrackingAlertReportTimeStatsContext);
  const userConfig = useContext(UserConfigContext);
  const {
    alertInfo, isFetchingAlert,
  } = trackingAlertReportAlertStatsInfo.trackingAlertReportAlertStats;
  const {
    timeInfo, isFetchingTime,
  } = trackingAlertReportTimeStatsInfo.trackingAlertReportTimeStats;

  const _alertData = (alertInfo && alertInfo.data) || {};
  const alertDetails = (_alertData && _alertData.trackingAlertReportResources) || [];
  const fromDate = (_alertData.fromDate && moment(_alertData.fromDate).format('DD MMM YYYY hh:mm A')) || 'NA';
  const toDate = (_alertData.toDate && moment(_alertData.toDate).format('DD MMM YYYY hh:mm A')) || 'NA';
  const _timeData = (timeInfo && timeInfo.data) || {};
  const timeDetails = (_timeData && _timeData.trackingAlertReportResources) || [];

  useEffect(() => {
    if (alertDetails) {
      const _data = {};
      _data.datasets = getDataSetForGraph(
        alertDetails, trackingAlertsReportPerformanceConfig.alert.dataKeys,
      );
      _data.labels = getArrayOfKeyFromObjects(
        alertDetails, trackingAlertsReportPerformanceConfig.alert.xAxisKey,
      );
      _data.legend = [...trackingAlertsReportPerformanceConfig.alert.legend[activeTabKey]].reverse();
      _data.options = trackingAlertsReportPerformanceConfig.alert.options;
      setBarGraphAlertData(_data);
    }
  }, [alertInfo]);

  useEffect(() => {
    if (timeDetails) {
      const _data = {};
      _data.datasets = getDataSetForGraph(
        timeDetails, trackingAlertsReportPerformanceConfig.time.dataKeys, trackingAlertsReportPerformanceConfig.time.formatValues,
      );
      _data.labels = getArrayOfKeyFromObjects(
        timeDetails, trackingAlertsReportPerformanceConfig.time.xAxisKey,
      );
      _data.legend = [...trackingAlertsReportPerformanceConfig.time.legend[activeTabKey]].reverse();
      _data.options = trackingAlertsReportPerformanceConfig.time.options;
      setBarGraphTimeData(_data);
    }
  }, [timeInfo]);

  useEffect(() => {
    if (activeTabKey) {
      trackingAlertReportAlertStatsInfo.getTrackingAlertReportAlertStats(
        {
          performanceType: activeTabKey,
          ...filter,
        },
        userConfig,
      );
      trackingAlertReportTimeStatsInfo.getTrackingAlertReportTimeStats(
        {
          performanceType: activeTabKey,
          ...filter,
        },
        userConfig,
      );
    }
    return () => {
      setBarGraphAlertData({});
      setBarGraphTimeData({});
      trackingAlertReportAlertStatsInfo.resetTrackingAlertReportAlertStats();
      trackingAlertReportTimeStatsInfo.resetTrackingAlertReportTimeStats();
    };
  }, [activeTabKey]);

  function handleTabChange(key) {
    setActiveTabKey(key);
  }
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
    }}
    >
      <div
        className="Flex Font--S24 Font--WB"
        style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 28 }}
      >
        <div>
          {intl.formatMessage({ id: 'view.trackingAlertReport.title.trackingAlertReport' })}
        </div>
        <div className="Font--S12" style={{ textTransform: 'uppercase' }}>
          {intl.formatMessage({ id: 'label.reportDateRange' }, { fromDate, toDate })}
        </div>
      </div>
      <div
        style={{
          backgroundColor: 'white',
          maxWidth: '1200px',
          height: 'calc(100% - 80px)',
          marginTop: 28,
        }}
        className="BorderRadius--Base"
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {(isFetchingAlert || isFetchingTime) && <LoaderWithOverLay />}
          <div className="DistanceReports__PerformanceStats" style={{ padding: 20, position: 'relative' }}>
            <Tabs activeKey={activeTabKey} onChange={handleTabChange}>
              <TabPane
                className="TabPane"
                tab={intl.formatMessage({ id: 'label.topPerforming' })}
                key={tabKeys.TOP_PERFORMING}
              >
                <BarGraph
                  graphAlertData={barGraphAlertData}
                  graphTimeData={barGraphTimeData}
                />
              </TabPane>
              <TabPane
                className="TabPane"
                tab={intl.formatMessage({ id: 'label.bottomPerforming' })}
                key={tabKeys.BOTTOM_PERFORMING}
              >
                <BarGraph
                  graphAlertData={barGraphAlertData}
                  graphTimeData={barGraphTimeData}
                />
              </TabPane>
            </Tabs>
            <div style={{ position: 'absolute', right: 20, top: 13 }}>
              <ButtonWithIcon
                labelText={intl.formatMessage({ id: 'label.viewList' })}
                iconName="view-list"
                className="Font--S14"
                onClick={() => { setTrackingAlertsReportView({ type: '' }); }}
                iconStyle={{ verticalAlign: 'middle', marginRight: 12 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PerformanceStats.defaultProps = {
  filter: {},
};

PerformanceStats.propTypes = {
  intl: PropTypes.object.isRequired,
  setTrackingAlertsReportView: PropTypes.func.isRequired,
  filter: PropTypes.object,
};

export default injectIntl(PerformanceStats);
