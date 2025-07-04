export const tabKeys = {
  VEHICLE_WISE: 'VEHICLE_WISE',
  VENDOR_WISE: 'VENDOR_WISE',
  DRIVER_WISE: 'DRIVER_WISE',
  MILEAGE: 'MILEAGE',
};

const formatValuesToKm = (value) => {
  const _value = +(value / 1000).toFixed(2);
  return _value;
};

export const distanceReportPerformanceConfig = {
  [tabKeys.VEHICLE_WISE]: {
    xAxisKey: 'vehicleRegistrationNumber',
    yAxisKey: 'km',
    dataKeys: [
      {
        value: 'unauthorisedDistance',
        color: '#fca7a5',
        label: 'Unauthorised Movement',
      },
      {
        value: 'offRoadDistance',
        color: '#f7c294',
        label: 'Off-Road Distance Covered',
      },
      {
        value: 'onRoadDistance',
        color: '#70d3dd',
        label: 'On-Road Distance Covered',
      },
    ],
    formatValues: formatValuesToKm,
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            barThickness: 50,
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
                return `${value}km`;
              },
              beginAtZero: true,
            },
          },
        ],
      },
    },
  },
  [tabKeys.VENDOR_WISE]: {
    xAxisKey: 'vendorName',
    yAxisKey: 'km',
    dataKeys: [
      {
        value: 'unauthorisedDistance',
        color: '#fca7a5',
        label: 'Unauthorised Movement',
      },
      {
        value: 'offRoadDistance',
        color: '#f7c294',
        label: 'Off-Road Distance Covered',
      },
      {
        value: 'onRoadDistance',
        color: '#70d3dd',
        label: 'On-Road Distance Covered',
      },
    ],
    formatValues: formatValuesToKm,
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            barThickness: 50,
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
                return `${value}km`;
              },
              beginAtZero: true,
            },
          },
        ],
      },
    },
  },
  [tabKeys.DRIVER_WISE]: {
    xAxisKey: 'driverName',
    yAxisKey: 'km',
    dataKeys: [
      {
        value: 'offRoadDistance',
        color: '#f7c294',
        label: 'Off-Road Distance Covered',
      },
      {
        value: 'onRoadDistance',
        color: '#70d3dd',
        label: 'On-Road Distance Covered',
      },
    ],
    formatValues: formatValuesToKm,
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            barThickness: 50,
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
                return `${value}km`;
              },
              beginAtZero: true,
            },
          },
        ],
      },
    },
  },
  [tabKeys.MILEAGE]: {
    xAxisKey: 'vehicleRegistrationNumber',
    yAxisKey: 'kmpl',
    dataKeys: [
      { value: 'avgMileage', color: '#70d3dd', label: 'Average Mileage' },
    ],
    formatValues: formatValuesToKm,
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            barThickness: 50,
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
                return `${value}kmpl`;
              },
              beginAtZero: true,
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
