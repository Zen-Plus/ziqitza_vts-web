import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function PacketLoss({
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
PacketLoss.defaultProps = {
  graphData: {},
};

PacketLoss.propTypes = {
  graphData: PropTypes.object,
};


export default PacketLoss;
