import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import ToggleSelect from '../../../../../components/ToggleSelect';
import Legends from './Legends';
import { tabKeys } from '../util';

function DriverWise({
  graphData, pickListData, activeKey, setPerformanceType,
}) {
  const [type, setType] = useState(pickListData.DistanceReportGraphType[0]);

  const handleTypeSelect = (value) => {
    setType(value);
    setPerformanceType(value);
  };

  useEffect(() => {
    if (activeKey === tabKeys.DRIVER_WISE) {
      setPerformanceType(type);
    }
  }, [activeKey]);

  return (
    <div className="Flex" style={{ marginTop: 30 }}>
      <div>
        <div>
          <ToggleSelect
            values={pickListData.DistanceReportGraphType}
            selected={type}
            onSelect={handleTypeSelect}
          />
        </div>
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
DriverWise.defaultProps = {
  graphData: {},
};

DriverWise.propTypes = {
  graphData: PropTypes.object,
  pickListData: PropTypes.object.isRequired,
  activeKey: PropTypes.string.isRequired,
  setPerformanceType: PropTypes.func.isRequired,
};


export default DriverWise;
