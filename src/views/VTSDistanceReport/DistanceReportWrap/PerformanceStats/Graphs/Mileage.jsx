import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import ToggleSelect from '../../../../../components/ToggleSelect';
import Legends from './Legends';
import { tabKeys } from '../util';

function Mileage({
  graphData, pickListData, activeKey, setPerformanceType,
}) {
  const [type, setType] = useState(pickListData.MileageGraphType[0]);

  const handleTypeSelect = (value) => {
    setType(value);
    setPerformanceType(value);
  };

  useEffect(() => {
    if (activeKey === tabKeys.MILEAGE) {
      setPerformanceType(type);
    }
  }, [activeKey]);

  return (
    <div className="Flex" style={{ marginTop: 30 }}>
      <div>
        <ToggleSelect
          values={pickListData.MileageGraphType}
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
    </div>
  );
}

Mileage.defaultProps = {
  graphData: {},
};

Mileage.propTypes = {
  graphData: PropTypes.object,
  pickListData: PropTypes.object.isRequired,
  activeKey: PropTypes.string.isRequired,
  setPerformanceType: PropTypes.func.isRequired,
};

export default Mileage;
