import React, { useEffect, useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import Tabs from '../../../../components/Tabs';
import {
  getDataSetForGraph, getArrayOfKeyFromObjects, tabKeys, gpsQualityReportPerformanceConfig,
} from './util';
import { GPSQualityReportStatsContext } from '../../../../providers/withGPSQualityReportStatsProvider';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';
import {
  PacketLoss, PacketDisrepancy
} from './Graphs';
import { ButtonWithIcon } from '../../../../components/Button';
import LoaderWithOverLay from '../../../../components/Loader/LoaderWithOverLay';


const { TabPane } = Tabs;


function PerformanceStats({
  intl,
  filter,
  setGPSQualityReportView,
}) {
  const [activeTabKey, setActiveTabKey] = useState(tabKeys.PACKET_LOSS);
  const [barGraphData, setBarGraphData] = useState({});
  const gpsQualityReportStatsInfo = useContext(GPSQualityReportStatsContext);
  const userConfig = useContext(UserConfigContext);
  const { info, isFetching } = gpsQualityReportStatsInfo.gpsQualityReportStats;
  const data = (info && info.data) || {};
  const reportData = (data && data.gpsReportResources ) || [];
  const fromDate = (data.fromDate && moment(data.fromDate).format('DD MMM YYYY hh:mm A')) || 'NA';
  const toDate = (data.toDate && moment(data.toDate).format('DD MMM YYYY hh:mm A')) || 'NA';

  useEffect(() => {
    if (reportData) {
      const _data = {};
      _data.datasets = getDataSetForGraph(
        reportData, gpsQualityReportPerformanceConfig[activeTabKey].dataKeys,
        gpsQualityReportPerformanceConfig[activeTabKey].formatValues
      );
      _data.labels = getArrayOfKeyFromObjects(
        reportData, gpsQualityReportPerformanceConfig[activeTabKey].xAxisKey,
      );
      _data.options = gpsQualityReportPerformanceConfig[activeTabKey].options;
      setBarGraphData(_data);
    }
  }, [reportData]);

  useEffect(() => {
    if (activeTabKey) {
      gpsQualityReportStatsInfo.getGPSQualityReportStats(
        {
          performanceType: activeTabKey,
          ...filter,
        },
        userConfig,
        activeTabKey,
      );
    }
    return () => {
      setBarGraphData({});
      gpsQualityReportStatsInfo.resetGPSQualityReportStats();
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
        {intl.formatMessage({ id: 'view.gpsQualityReport.title.gpsQualityReport' })}
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
          {isFetching && <LoaderWithOverLay />}
          <div className="DistanceReports__PerformanceStats" style={{ padding: 20, position: 'relative' }}>
            <Tabs activeKey={activeTabKey} onChange={handleTabChange}>
              <TabPane
                className="TabPane"
                tab={intl.formatMessage({ id: 'label.gpsPacketLoss' })}
                key={tabKeys.PACKET_LOSS}
              >
                <PacketLoss
                  graphData={barGraphData}
                />
              </TabPane>
              <TabPane
                className="TabPane"
                tab={intl.formatMessage({ id: 'label.gpsPacketDiscrepancies' })}
                key={tabKeys.PACKET_DISREPANCIES}
              >
                <PacketDisrepancy
                  graphData={barGraphData}
                />
              </TabPane>
            </Tabs>
            <div style={{ position: 'absolute', right: 20, top: 13 }}>
              <ButtonWithIcon
                labelText={intl.formatMessage({ id: 'label.viewList' })}
                iconName="view-list"
                className="Font--S14"
                onClick={() => { setGPSQualityReportView({ type: '' }); }}
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
  setGPSQualityReportReportView: PropTypes.func.isRequired,
  filter: PropTypes.object,
};

export default injectIntl(PerformanceStats);
