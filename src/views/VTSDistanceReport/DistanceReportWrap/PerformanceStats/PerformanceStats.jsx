import React, { useEffect, useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import Tabs from '../../../../components/Tabs';
import {
  getDataSetForGraph, getArrayOfKeyFromObjects, tabKeys, distanceReportPerformanceConfig,
} from './util';
import { DistanceReportStatsContext } from '../../../../providers/withDistanceReportStatsPrivder';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';
import {
  VehicleWise, VendorWise, DriverWise, Mileage,
} from './Graphs';
import { ButtonWithIcon } from '../../../../components/Button';
import LoaderWithOverLay from '../../../../components/Loader/LoaderWithOverLay';


const { TabPane } = Tabs;


function PerformanceStats({
  intl,
  pickListData,
  filter,
  setDistanceReportView,
}) {
  const [activeTabKey, setActiveTabKey] = useState(tabKeys.VEHICLE_WISE);
  const [performanceType, setPerformanceType] = useState('');
  const [barGraphData, setBarGraphData] = useState({});
  const distanceReportStatsInfo = useContext(DistanceReportStatsContext);
  const userConfig = useContext(UserConfigContext);
  const { info, isFetching } = distanceReportStatsInfo.distanceReportStats;
  const data = (info && info.data) || {};
  const reportData = (data && data.distanceReportResources ) || [];
  const fromDate = (data.fromDate && moment(data.fromDate).format('DD MMM YYYY hh:mm A')) || 'NA';
  const toDate = (data.toDate && moment(data.toDate).format('DD MMM YYYY hh:mm A')) || 'NA';

  useEffect(() => {
    if (reportData && reportData.length) {
      const _data = {};
      _data.datasets = getDataSetForGraph(
        reportData, distanceReportPerformanceConfig[activeTabKey].dataKeys,
        distanceReportPerformanceConfig[activeTabKey].formatValues
      );
      _data.labels = getArrayOfKeyFromObjects(
        reportData, distanceReportPerformanceConfig[activeTabKey].xAxisKey,
      );
      _data.legend = [...distanceReportPerformanceConfig[activeTabKey].dataKeys].reverse();
      _data.options = distanceReportPerformanceConfig[activeTabKey].options;
      setBarGraphData(_data);
    }
  }, [reportData]);

  useEffect(() => {
    if (performanceType) {
      distanceReportStatsInfo.getDistanceReportStats(
        {
          performanceType,
          ...filter,
        },
        userConfig, activeTabKey,
      );
    }
    return () => {
      setBarGraphData({});
      distanceReportStatsInfo.resetDistanceReportStats();
    };
  }, [performanceType]);

  function handleTabChange(key) {
    setPerformanceType('');
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
          {intl.formatMessage({ id: 'view.distanceReport.title.distanceReport' })}
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
          <div className="DistanceReports__PerformanceStats" style={{ padding: 20, position: 'relative', paddingTop: 0 }}>
            <Tabs activeKey={activeTabKey} onChange={handleTabChange}>
              <TabPane
                className="TabPane"
                tab={intl.formatMessage({ id: 'label.vehicleWise' })}
                key={tabKeys.VEHICLE_WISE}
              >
                <VehicleWise
                  activeKey={activeTabKey}
                  graphData={barGraphData}
                  setPerformanceType={setPerformanceType}
                  pickListData={pickListData}
                />
              </TabPane>
              <TabPane
                className="TabPane"
                tab={intl.formatMessage({ id: 'label.vendorWise' })}
                key={tabKeys.VENDOR_WISE}
              >
                <VendorWise
                  activeKey={activeTabKey}
                  graphData={barGraphData}
                  setPerformanceType={setPerformanceType}
                  pickListData={pickListData}
                />
              </TabPane>
              <TabPane
                className="TabPane"
                tab={intl.formatMessage({ id: 'label.driverWise' })}
                key={tabKeys.DRIVER_WISE}
              >
                <DriverWise
                  activeKey={activeTabKey}
                  graphData={barGraphData}
                  setPerformanceType={setPerformanceType}
                  pickListData={pickListData}
                />
              </TabPane>
              <TabPane
                className="TabPane"
                tab={intl.formatMessage({ id: 'label.mileage' })}
                key={tabKeys.MILEAGE}
              >
                <Mileage
                  activeKey={activeTabKey}
                  graphData={barGraphData}
                  setPerformanceType={setPerformanceType}
                  pickListData={pickListData}
                />
              </TabPane>
            </Tabs>
            <div style={{ position: 'absolute', right: 20, top: 13 }}>
              <ButtonWithIcon
                labelText={intl.formatMessage({ id: 'label.viewList' })}
                iconName="view-list"
                className="Font--S14"
                onClick={() => { setDistanceReportView({ type: '' }); }}
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
  pickListData: {},
  filter: {},
};

PerformanceStats.propTypes = {
  intl: PropTypes.object.isRequired,
  setDistanceReportView: PropTypes.func.isRequired,
  pickListData: PropTypes.object,
  filter: PropTypes.object,
};

export default injectIntl(PerformanceStats);
