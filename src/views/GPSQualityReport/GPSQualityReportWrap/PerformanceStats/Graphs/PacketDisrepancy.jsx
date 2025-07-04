import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function PacketDisrepancy({
  graphData
}) {

  return (
    <div className="Flex" style={{ paddingTop: 40, justifyContent: 'center' }}>
      <div style={{ width: 700, height: 260, marginLeft: 60 }}>
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
PacketDisrepancy.defaultProps = {
  graphData: {},
};

PacketDisrepancy.propTypes = {
  graphData: PropTypes.object,
};


export default PacketDisrepancy;