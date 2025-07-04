import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import ToggleSelect from '../../../../../components/ToggleSelect';
import Legends from './Legends';
import { tabKeys } from '../util';

function VehicleWise({
  graphData, pickListData, activeKey, setPerformanceType,
}) {
  const [type, setType] = useState(pickListData.DistanceReportGraphType[0]);
  const handleTypeSelect = (value) => {
    setType(value);
    setPerformanceType(value);
  };

  useEffect(() => {
    if (activeKey === tabKeys.VEHICLE_WISE) {
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
VehicleWise.defaultProps = {
  graphData: {},
};

VehicleWise.propTypes = {
  graphData: PropTypes.object,
  pickListData: PropTypes.object.isRequired,
  activeKey: PropTypes.string.isRequired,
  setPerformanceType: PropTypes.func.isRequired,
};

export default VehicleWise;
