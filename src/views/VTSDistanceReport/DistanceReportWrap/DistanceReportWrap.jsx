import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DistanceReportsList from './List';
import useCustomState from '../../../common/hooks/useCustomState';
import { withPickListProvider } from '../../../providers/withPickListProvider';
import PerformanceStas from './PerformanceStats';

function DistanceReportWrap({ pickListData }) {
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
        setDistanceReportView={handleViewStateKey}
      />
    );
  }

  return (
    <DistanceReportsList
      pickListData={pickListData}
      dateRef={dateRef}
      selectedFilters={selectedFilters}
      setFilters={setFilters}
      setDistanceReportView={handleViewStateKey}
      selectedFilterChips={selectedFilterChips}
      setSelectedFilterChips={setSelectedFilterChips}
    />
  );
}

DistanceReportWrap.defaultProp = {
  pickListData: {},
};
DistanceReportWrap.prototype = {
  pickListData: PropTypes.object,
};

export default withPickListProvider(DistanceReportWrap, { version: 'v2' });
