import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TrackingAlertsReportsList from './List';
import useCustomState from '../../../common/hooks/useCustomState';
import { withPickListProvider } from '../../../providers/withPickListProvider';
import PerformanceStas from './PerformanceStats';

function TrackingAlertsReportWrap({ pickListData }) {
  const [viewState, setViewState] = useCustomState({ type: '' });
  const [selectedFilters, setFilters] = useState({});
  const [selectedFilterChips, setSelectedFilterChips] = useState([]);
  const dateRef = useRef();

  const handleViewStateKey = (key) => {
    const { type, id } = key;
    setViewState({ type, id });
  };

  useEffect(() => {
    dateRef.current = moment();

    return () => {
      dateRef.current = null;
    };
  }, []);

  if (viewState.type === 'performanceStats') {
    return (
      <PerformanceStas
        pickListData={pickListData}
        filter={selectedFilters}
        dateRef={dateRef}
        setTrackingAlertsReportView={handleViewStateKey}
      />
    );
  }

  return (
    <TrackingAlertsReportsList
      pickListData={pickListData}
      dateRef={dateRef}
      selectedFilters={selectedFilters}
      setFilters={setFilters}
      setTrackingAlertsReportView={handleViewStateKey}
      selectedFilterChips={selectedFilterChips}
      setSelectedFilterChips={setSelectedFilterChips}
    />
  );
}

TrackingAlertsReportWrap.defaultProp = {
  pickListData: {},
};
TrackingAlertsReportWrap.prototype = {
  pickListData: PropTypes.object,
};

export default withPickListProvider(TrackingAlertsReportWrap, { version: 'v2' });
