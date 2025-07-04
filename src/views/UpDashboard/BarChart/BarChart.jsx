import React from 'react';
import PropTypes from 'prop-types';
import { Bar, Line } from 'react-chartjs-2';
// import './barChart.less';


function getWidth(length) {
  const _width = 150;
  if (!length) {
    return _width + 300;
  }
  return _width + length * 70;
}

function BarChart({
  title, data, graphOptions, wrapClassName, titleBgColor, isLineChart, legendsArray,
}) {
  const length = data && data.labels && data.labels.length;

  return (
    <div className={`BarChartWrapper ${wrapClassName}`}>
      <div className="BarChart" style={{ borderColor: "#DDDDDD" }}>
        <div className="BarChart__Title" style={{ backgroundColor: titleBgColor }}>
          {title}
        </div>
        <div className="BarChart__Canvas" style={{ height: 450, width: 'calc(100%)', overflowX: 'auto' }}>
          <div style={{ height: '100%', width: 'calc(100%)', minWidth: `${getWidth(length)}px` }}>
            { length && !isLineChart && (
            <Bar
              data={data}
              options={graphOptions}
            />
            )}
            { length && isLineChart && (
            <Line
              data={data}
              options={graphOptions}
            />
            )}
          </div>
        </div>
        {legendsArray && !!legendsArray.length
          && (
          <div className="row d-flex justify-content-end Legend">
            {legendsArray.map((item) => (
              <div className="col-6 col-lg-2 d-flex Legend_Item">
                <div className="LegendColor" style={{ backgroundColor: item.color }} />
                <div className="LegendTitle">{item.name}</div>
              </div>
            ))}
          </div>
          )}
      </div>
    </div>
  );
}

BarChart.defaultProps = {
  wrapClassName: '',
  titleBgColor: '#F0F0F0',
  graphOptions: {
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
        },
      }],
      xAxes: [{
        barThickness: 30,
      }],
    },
  },
  data: {
    datasets: [],
  },
  isLineChart: false,
  legendsArray: [],
};

BarChart.propTypes = {
  title: PropTypes.string.isRequired,
  wrapClassName: PropTypes.string,
  data: PropTypes.object,
  graphOptions: PropTypes.object,
  titleBgColor: PropTypes.string,
  isLineChart: PropTypes.bool,
  legendsArray: PropTypes.array,
};

export default BarChart;

