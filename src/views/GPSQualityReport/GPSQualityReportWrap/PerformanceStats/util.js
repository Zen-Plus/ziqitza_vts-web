export const tabKeys = {
  PACKET_LOSS: 'PACKET_LOSS',
  PACKET_DISREPANCIES: 'PACKET_DISREPANCIES',
};

export const gpsQualityReportPerformanceConfig = {
  [tabKeys.PACKET_LOSS]: {
    xAxisKey: 'interval',
    yAxisKey: 'deviceCount',
    dataKeys: [
      {
        value: 'deviceCount',
        color: '#70d3dd',
        label: 'No. of devices',
      },
    ],
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
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
              beginAtZero:true,
            },
          },
        ],
      },
    },
  },
  [tabKeys.PACKET_DISREPANCIES]: {
    xAxisKey: 'interval',
    yAxisKey: 'deviceCount',
    dataKeys: [
      {
        value: 'deviceCount',
        color: '#70d3dd',
        label: 'No. of devices',
      },
    ],
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
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
              beginAtZero:true,
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
