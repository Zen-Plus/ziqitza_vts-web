import { convertMillsToHHMMSS } from '../../common/helpers/collectionUtils';

export function getInitialAverageTrip(values) {
  const _values = {
    topFive: { datasets: [] },
    bottomFive: { datasets: [] },
  };
  if (values.bottom && values.bottom.length) {
    const labels = [];
    const data = [];
    values.bottom.map((item) => {
      labels.push(item.name);
      data.push(item.value);
      return null;
    });
    _values.bottomFive.labels = labels;
    _values.bottomFive.datasets = [{
      data,
      backgroundColor: '#184296',
      // backgroundColor: '#DD4B39',
    }];
  }

  if (values.top && values.top.length) {
    const labels = [];
    const data = [];
    values.top.map((item) => {
      labels.push(item.name);
      data.push(item.value);
      return null;
    });
    _values.topFive.labels = labels;
    _values.topFive.datasets = [{
      data,
      backgroundColor: '#184296',
      // backgroundColor: '#00A65A',
    }];
  }
  return _values;
}


export function getInitialAverageResponseTime(values) {
  const _values = {
    topFive: { datasets: [] },
    bottomFive: { datasets: [] },
  };
  if (values.bottom && values.bottom.length) {
    const labels = [];
    const data = [];
    values.bottom.map((item) => {
      labels.push(item.name);
      data.push(item.value);
      return null;
    });
    _values.bottomFive.labels = labels;
    _values.bottomFive.datasets = [{
      data,
      backgroundColor: '#184296',
      // backgroundColor: '#DD4B39',
    }];
  }

  if (values.top && values.top.length) {
    const labels = [];
    const data = [];
    values.top.map((item) => {
      labels.push(item.name);
      data.push(item.value);
      return null;
    });
    _values.topFive.labels = labels;
    _values.topFive.datasets = [{
      data,
      backgroundColor: '#184296',
      // backgroundColor: '#00A65A',
    }];
  }
  return _values;
}

export function getInitialChiefComplaintTime(values) {
  const _values = {
    topFifteen: { datasets: [] },
    rowData: [],
  };

  if (values.top && values.top.length) {
    const labels = [];
    const data = [];
    values.top.map((item) => {
      labels.push(item.name);
      data.push(item.value);
      return null;
    });
    _values.topFifteen.labels = labels;
    _values.topFifteen.datasets = [{
      data,
      backgroundColor: '#184296',
      // backgroundColor: '#FF9933',
    }];

    _values.rowData = [...values.top];
  }

  return _values;
}

export const averageResponseTimeGraphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    callbacks: {
      label(tooltipItem) {
        return convertMillsToHHMMSS(tooltipItem.yLabel);
      },
    },
  },
  scales: {
    xAxes: [{
      barThickness: 30,
    }],
    yAxes: [
      {
        ticks: {
          precision: 0,
          beginAtZero: true,
          callback(value) {
            return convertMillsToHHMMSS(value);
          },
        },
      },
    ],
  },
};

export function getInitialDailyResponseTime(values, titleData) {
  const _values = { datasets: [] };

  if (values.urban && values.urban.length) {
    const labels = [];
    const data = [];
    const _urbanValue = titleData.urbanTargetResponseTime;
    const _ruralValue = titleData.ruralTargetResponseTime;
    const _responseTimeRural = Array(values.urban.length).fill(_ruralValue);
    const _responseTimeUrban = Array(values.urban.length).fill(_urbanValue);
    values.urban.map((item) => {
      labels.push(item.name);
      data.push(item.value);
      return null;
    });
    _values.labels = labels;
    _values.datasets.push({
      data,
      borderColor: '#4BC0C0',
      fill: false,
      label: 'Urban Response Time',
      lineTension: 0,
    });

    _values.datasets.push({
      data: _responseTimeRural,
      borderColor: '#FE968F',
      fill: false,
      label: 'Rural line',
    });

    _values.datasets.push({
      data: _responseTimeUrban,
      borderColor: '#FBFD68',
      fill: false,
      label: 'Urban Line',
    });
  }

  if (values.rural && values.rural.length) {
    const _data = [];
    values.rural.map((item) => {
      _data.push(item.value);
      return null;
    });
    _values.datasets.push({
      label: 'Rural Response Time',
      borderColor: '#4E245D',
      data: [..._data],
      fill: false,
      lineTension: 0,
    });
  }
  return _values;
}

export const dailyAverageTimeOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    callbacks: {
      label(tooltipItem) {
        return convertMillsToHHMMSS(tooltipItem.yLabel);
      },
    },
  },
  scales: {
    xAxes: [{
      ticks: {
        autoSkip: false,
      },
    }],
    yAxes: [
      {
        scaleLabel: {
          display: true,
        },
        beginAtZero: false,
        ticks: {
          precision: 0,
          callback(value) {
            return convertMillsToHHMMSS(value);
          },
        },
      },
    ],
  },
  bezierCurve: false,
};

export const dailyAverageTimeLegends = [
  {
    name: 'Urban Response Time',
    color: '#4BC0C0',
  },
  {
    name: 'Rural Response Time',
    color: '#4E245D',
  },
  {
    name: 'Urban Target Time',
    color: '#FBFD68',
  },
  {
    name: 'Rural Target Time',
    color: '#FE968F',
  },
];

export default {
  getInitialAverageTrip,
  getInitialAverageResponseTime,
  getInitialChiefComplaintTime,
  averageResponseTimeGraphOptions,
  dailyAverageTimeOptions,
};
