export const tabKeys = {
  TOP_PERFORMING: 'TOP_PERFORMING',
  BOTTOM_PERFORMING: 'BOTTOM_PERFORMING',
};

export const trackingAlertsReportPerformanceConfig = {
  alert: {
    xAxisKey: 'empId',
    dataKeys: [
      {
        value: 'alertsClosed',
        color: '#70d3dd',
        label: 'No. of alerts closed',
      },
      {
        value: 'alertsResponded',
        color: '#70d3dd',
        label: 'No. of alerts responded',
      },
    ],
    legend: {
      [tabKeys.TOP_PERFORMING] : [
        {
          label: 'Maximum No. of Alerts Responded and Closed',
          color: '#70d3dd',
        },
      ],
      [tabKeys.BOTTOM_PERFORMING] : [
        {
          label: 'Minimum No. of Alerts Responded and Closed',
          color: '#70d3dd',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        mode: 'index',
        displayColors: false,
        reverse: true,
        callbacks: {
          label(tooltipItem, data) {
            let label = data.datasets[tooltipItem.datasetIndex].label || '';
            if (label) {
              label += ': ';
            }
            label += Math.round(tooltipItem.yLabel * 100) / 100;
            return label;
          },
        },
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            barThickness: 40,
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    },
  },
  time: {
    xAxisKey: 'empId',
    yAxisKey: 'mins',
    dataKeys: [
      {
        value: 'avgClosingTime',
        color: '#f7c294',
        label: ' Average Closing time',
      },
      {
        value: 'avgResponseTime',
        color: '#f7c294',
        label: 'Average Response time',
      },
    ],
    formatValues: (value) => value / 60000,
    legend: {
      [tabKeys.TOP_PERFORMING] : [
        {  
          label: 'Low Response and Closing Time',
          color: '#f7c294',
        },
      ],
      [tabKeys.BOTTOM_PERFORMING] : [
        {
          label: 'High Response and Closing Time',
          color: '#f7c294',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        mode: 'index',
        displayColors: false,
        reverse: true,
        callbacks: {
          label(tooltipItem, data) {
            let label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
              label += ': ';
            }
            label += Math.round(tooltipItem.yLabel * 100) / 100;
            label += ' min;';
            return label;
          },
        },
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            barThickness: 40,
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            ticks: {
              callback(value) {
                return `${value} mins`;
              },
            },
          },
        ],
      },
    },
  },
};

export function getArrayOfKeyFromObjects(
  listState = [],
  key,
  formatValues = false,
) {
  let newArray = [];
  if (formatValues) {
    newArray = listState.map((detail) => formatValues(detail[key]));
  } else {
    newArray = listState.map((detail) => detail[key]);
  }
  return newArray;
}

export function getDataSetForGraph(listState = [], keys, formatValues) {
  let _array = [];
  _array = keys.map((key) => ({
    label: key.label,
    data: getArrayOfKeyFromObjects(listState, key.value, formatValues),
    backgroundColor: key.color,
  }));
  return _array;
}

export default { getArrayOfKeyFromObjects, getDataSetForGraph, tabKeys };
