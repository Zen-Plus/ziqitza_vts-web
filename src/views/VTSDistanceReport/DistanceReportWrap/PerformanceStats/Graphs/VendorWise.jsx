import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import ToggleSelect from '../../../../../components/ToggleSelect';
import { tabKeys } from '../util';
import Legends from './Legends';

function VendorWise({ graphData, setPerformanceType, activeKey, pickListData }) {
  const [type, setType] = useState(pickListData.DistanceReportGraphType[0]);

  const handleTypeSelect = (value) => {
    setType(value);
    setPerformanceType(value);
  };
  
  useEffect(() => {
    if (activeKey === tabKeys.VENDOR_WISE) {
      setPerformanceType(type);
    }
  }, [activeKey]);

  return (
    <div className="Flex" style={{ marginTop: 30 }}>
      <div>
        <ToggleSelect
          values={pickListData.DistanceReportGraphType}
          selected={type}
          onSelect={handleTypeSelect}
        />
      </div>
      <div style={{ width: 680, height: 300, marginLeft: 60 }}>
        {!!Object.keys(graphData).length
          && (
            <Bar
              data={graphData}
              options={graphData.options}
            />
          )}
      </div>
      <div style={{ alignSelf: 'center', marginLeft: 50 }}>
        <Legends data={graphData.legend || []} />
      </div>
    </div>
  );
}

VendorWise.defaultProps = {
  graphData: {},
};

VendorWise.propTypes = {
  graphData: PropTypes.object,
  pickListData: PropTypes.object.isRequired,
  activeKey: PropTypes.string.isRequired,
  setPerformanceType: PropTypes.func.isRequired,
};
export default VendorWise;
