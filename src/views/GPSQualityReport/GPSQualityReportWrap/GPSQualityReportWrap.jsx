import React, { useEffect, useRef, useState } from 'react';
import GPSQualityReportList from './List';
import PropTypes from 'prop-types';
import moment from 'moment';
import useCustomState from '../../../common/hooks/useCustomState';
import { withPickListProvider } from '../../../providers/withPickListProvider';
import PerformanceStats from './PerformanceStats';

function GPSQualityReportWrap({ pickListData }) {
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
      <PerformanceStats
        pickListData={pickListData}
        filter={selectedFilters}
        dateRef={dateRef}
        setGPSQualityReportView={handleViewStateKey}
      />
    );
  }

  return(
    <GPSQualityReportList
      pickListData={pickListData}
      dateRef={dateRef}
      selectedFilters={selectedFilters}
      setFilters={setFilters}
      setGPSQualityReportView={handleViewStateKey}
      selectedFilterChips={selectedFilterChips}
      setSelectedFilterChips={setSelectedFilterChips}
    />
  );
}

GPSQualityReportWrap.defaultProp = {
    pickListData: {},
};
GPSQualityReportWrap.prototype = {
    pickListData: PropTypes.object,
};

export default withPickListProvider(GPSQualityReportWrap, { version: 'v2' });
