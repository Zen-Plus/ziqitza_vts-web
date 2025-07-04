function isEmpty(obj) {
  return !(Object.keys(obj).length);
}
function convertMilliseconds(ms, format, decimal = 3) {
  let time = 'NA';
  if (ms !== null) {
    if (format === 'MIN') {
      const minutes = (ms / (1000 * 60)).toFixed(decimal);
      time = `${minutes} min`;
    } else if (format === 'SEC') {
      const seconds = (ms / 1000).toFixed(decimal);
      time = `${seconds} sec`;
    } else if (format === 'HRS') {
      const hours = (ms / (1000 * 60 * 60)).toFixed(decimal);
      time = `${hours} hrs`;
    }
    return time;
  }
  return time;
}
const convertNullToBlankString = (val) => {
  return (val ? val : '');
}

function compareValues(key, order = 'ASC') {
  return function innerSort(firstValue, secondValue) {
    if (!firstValue.hasOwnProperty(key) || !secondValue.hasOwnProperty(key)) {
      return 0;
    }

    const updatedFirstValue = (typeof firstValue[key] === 'string')
      ? firstValue[key].toUpperCase() : convertNullToBlankString(firstValue[key]);
    const updatedSecondValue = (typeof secondValue[key] === 'string')
      ? secondValue[key].toUpperCase() : convertNullToBlankString(secondValue[key]);

    let comparison = 0;
    if (updatedFirstValue > updatedSecondValue) {
      comparison = 1;
    } else if (updatedFirstValue < updatedSecondValue) {
      comparison = -1;
    }
    return (
      (order === 'DESC') ? (comparison * -1) : comparison
    );
  };
}

function convertMeter (meter, unit, decimal) {
  let _distance = 'NA';
  if(meter || meter === 0) {
    if (unit === 'km') {
      const km = (meter / 1000).toFixed(decimal);
      _distance = `${km} km`;
    }
    if (unit === 'kmpl') {
      const km = (meter / 1000).toFixed(decimal);
      _distance = `${km} kmpl`;
    }
  }
  return _distance;
}

function isNullOrUndefined (value) {
  return [null, undefined].includes(value);
}
export function convertMilliSeconds(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minute = Math.floor(seconds / 60);
  seconds %= 60;
  let hour = Math.floor(minute / 60);
  minute %= 60;
  const day = Math.floor(hour / 24);
  hour %= 24;
  return {
    day,
    hour,
    minute,
    seconds,
  };
}
export function getTimeDifference(startDate, endDate) {
  return (endDate.getTime() - startDate.getTime());
}

export function checkIfPlural(value) {
  return (value > 1);
}

function getTimeToDisplay(_startDate, _endDate, intl) {
  let timeToDisplay = '';

  const startDate = new Date(_startDate);
  const endDate = new Date(_endDate);

  const milliSeconds = getTimeDifference(startDate, endDate);
  const {
    day,
    hour,
    minute,
    seconds,
  } = convertMilliSeconds(milliSeconds);

  if (day && !hour) {
    timeToDisplay = intl.formatMessage({ id: `label.day${checkIfPlural(day) ? 's' : ''}` }, { day });
  } else if (day && hour) {
    timeToDisplay = intl.formatMessage({ id: `label.day${checkIfPlural(day) ? 's' : ''}Hour${checkIfPlural(hour) ? 's' : ''}` }, { day, hour });
  } else if (hour && !minute) {
    timeToDisplay = intl.formatMessage({ id: `label.hour${checkIfPlural(hour) ? 's' : ''}` }, { hour });
  } else if (hour && minute) {
    timeToDisplay = intl.formatMessage({ id: `label.hour${checkIfPlural(hour) ? 's' : ''}Minute${checkIfPlural(minute) ? 's' : ''}` }, { hour, minute });
  } else if (minute && !seconds) {
    timeToDisplay = intl.formatMessage({ id: `label.minute${checkIfPlural(minute) ? 's' : ''}` }, { minute });
  } else if (minute && seconds) {
    timeToDisplay = intl.formatMessage({ id: `label.minute${checkIfPlural(minute) ? 's' : ''}Second${checkIfPlural(seconds) ? 's' : ''}` }, { minute, seconds });
  } else if (!minute && seconds) {
    timeToDisplay = intl.formatMessage({ id: `label.second${checkIfPlural(seconds) ? 's' : ''}` }, { seconds });
  }

  return timeToDisplay;
}

function getDistance(distance) {
  let meters = distance;
  let kilometers = 0;
  let _distance = '';
  if (distance > 1000) {
    kilometers = parseInt(distance / 1000, 10);
    meters = parseInt(distance % 1000, 10);
    _distance = `${kilometers} km ${meters} m`;
  } else {
    _distance = `${distance} m`;
  }
  return _distance;
}

export {
  isEmpty,
  convertMilliseconds,
  isNullOrUndefined,
  compareValues,
  convertMeter,
  getTimeToDisplay,
  getDistance,
};