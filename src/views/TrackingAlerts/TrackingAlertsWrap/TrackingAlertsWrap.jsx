import React, { useState } from 'react';
import LiveTrackingAlerts from './LiveTrackingAlertsList';
import PropTypes from 'prop-types';
import HistoryTrackingAlerts from './HistoryTrackingAlertsList';
import useCustomState from '../../../common/hooks/useCustomState';
import { withPickListProvider } from '../../../providers/withPickListProvider';
import { withSystemParameterConfigProvider } from '../../../providers/withSystemParameterConfigProvider';

const ALERT_DASHBOARD = 'alertDashboard';
const AUTO_REFRESH_ON_STATUS = 'ON';

function TrackingAlertWrap({ pickListData, systemParameterConfigData }) {
  const [viewState, setViewState] = useCustomState({ type: '' });
  const autoRefreshObject = systemParameterConfigData && systemParameterConfigData.find((value) => (value.key === ALERT_DASHBOARD));
  const autoRefreshInterval = autoRefreshObject && autoRefreshObject.value;
  const autoRefreshOnStatusObject = pickListData && pickListData.AutoRefreshStatus
  && pickListData.AutoRefreshStatus.find((value) => (value.id === AUTO_REFRESH_ON_STATUS));
  const [selectedSettings, setSettings] = useState(
    {
      autoRefresh: autoRefreshOnStatusObject,
      refreshInterval: autoRefreshInterval
    }
  );
  const handleViewStateKey = (key) => {
    const { type } = key;
    setViewState({ type });
  }

  if (viewState.type === 'historyTrackingAlerts') {
    return <HistoryTrackingAlerts pickListData={pickListData} setTrackingAlertsView={handleViewStateKey} />;
  }

  return <LiveTrackingAlerts
    pickListData={pickListData}
    setTrackingAlertsView={handleViewStateKey}
    selectedSettings={selectedSettings}
    setSettings={setSettings}
  />;
}

TrackingAlertWrap.defaultProps = {
  pickListData: {}
};

TrackingAlertWrap.propTypes = {
  pickListData: PropTypes.object,
};

export default withSystemParameterConfigProvider(withPickListProvider(TrackingAlertWrap, { version: 'v2' }));
