import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import Legends from './Legends';

function BarGraph({
  graphAlertData,
  graphTimeData,
}) {
  return (
    <div className="Flex" style={{ paddingTop: 40, justifyContent: 'center' }}>
      <div>
        <div style={{ width: 400, height: 300 }}>
          {!!Object.keys(graphAlertData).length
            && (
              <Bar
                data={graphAlertData}
                options={graphAlertData.options}
              />
            )}
        </div>
        <div style={{ marginTop: 30 }}>
          <Legends data={graphAlertData.legend || []} />
        </div>
      </div>
      <div style={{ marginLeft: 70 }}>
        <div style={{ width: 400, height: 300 }}>
          {!!Object.keys(graphTimeData).length
            && (
              <Bar
                data={graphTimeData}
                options={graphTimeData && graphTimeData.options}
              />
            )}
        </div>
        <div style={{ marginTop: 30 }}>
          <Legends data={(graphTimeData && graphTimeData.legend) || []} />
        </div>
      </div>
    </div>
  );
}
BarGraph.defaultProps = {
  graphAlertData: {},
  graphTimeData: {},
};

BarGraph.propTypes = {
  graphAlertData: PropTypes.object,
  graphTimeData: PropTypes.object,
  pickListData: PropTypes.object.isRequired,
  activeKey: PropTypes.string.isRequired,
  setPerformanceType: PropTypes.func.isRequired,
};

export default BarGraph;
