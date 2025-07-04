import moment from 'moment';
import { convertMilliSeconds } from "../../common/helpers/transformers";

function getFiltersData(filter) {
  const _filter = {};
  _filter.vendorName = filter.vendor && filter.vendor.name ? filter.vendor.name : null;
  _filter.stateName = filter.state && filter.state.id ? filter.state.name : null;
  _filter.districtName = filter.district && filter.district.id ? filter.district.name : null;
  _filter.parkingName = filter.parking && filter.parking.id ? filter.parking.name : null;
  _filter.fromDate = filter.dateRange
    ? moment(filter.dateRange[0]).format('DD MMM YYYY hh:mm a')
    : moment().subtract(3, 'months').format('DD MMM YYYY hh:mm a');
  _filter.toDate = filter.dateRange
    ? moment(filter.dateRange[1]).format('DD MMM YYYY hh:mm a')
    : moment().format('DD MMM YYYY hh:mm a');
  _filter.generatedTime = moment(filter.generatedOn).format('DD/MM/YYYY hh:mm A');
  return _filter;
}

export const getPrintTitleHeading = (filter) => {
  const {
    vendorName,
    stateName,
    districtName,
    parkingName,
    fromDate,
    toDate,
    generatedTime,
  } = getFiltersData(filter);

  return `This report has been generated on ${generatedTime || 'NA'}
   with these filter criteria: Vendor: ${vendorName || 'NA'}, 
   State: ${stateName || 'NA'}, 
   District: ${districtName || 'NA'}, 
   Parking Bay: ${parkingName || 'NA'},
   Date-Time Interval: ${fromDate || 'NA'} - ${toDate || 'NA'} `;
};

const checkIfPlural = (value) => value > 1;

export const getTimeToDisplay = (milliSeconds, intl) => {
  let timeToDisplay = "";

  const { day, hour, minute, seconds } = convertMilliSeconds(milliSeconds);

  if (day && !hour) {
    timeToDisplay = intl.formatMessage(
      { id: `label.day${checkIfPlural(day) ? "s" : ""}` },
      { day }
    );
  } else if (day && hour) {
    timeToDisplay = intl.formatMessage(
      {
        id: `label.day${checkIfPlural(day) ? "s" : ""}Hour${
          checkIfPlural(hour) ? "s" : ""
        }`,
      },
      { day, hour }
    );
  } else if (hour && !minute) {
    timeToDisplay = intl.formatMessage(
      { id: `label.hour${checkIfPlural(hour) ? "s" : ""}` },
      { hour }
    );
  } else if (hour && minute) {
    timeToDisplay = intl.formatMessage(
      {
        id: `label.hour${checkIfPlural(hour) ? "s" : ""}Minute${
          checkIfPlural(minute) ? "s" : ""
        }`,
      },
      { hour, minute }
    );
  } else if (minute && !seconds) {
    timeToDisplay = intl.formatMessage(
      { id: `label.minute${checkIfPlural(minute) ? "s" : ""}` },
      { minute }
    );
  } else if (minute && seconds) {
    timeToDisplay = intl.formatMessage(
      {
        id: `label.minute${checkIfPlural(minute) ? "s" : ""}Second${
          checkIfPlural(seconds) ? "s" : ""
        }`,
      },
      { minute, seconds }
    );
  } else if (!minute && seconds) {
    timeToDisplay = intl.formatMessage(
      { id: `label.second${checkIfPlural(seconds) ? "s" : ""}` },
      { seconds }
    );
  }

  return timeToDisplay;
};

export const transformMillisecToHourFormat = (ms) => {
  let  seconds = Math.floor((ms / 1000) % 60),
    minutes = Math.floor((ms / (1000 * 60)) % 60),
    hours = Math.floor(ms / (1000 * 60 * 60));

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

export default {
  getPrintTitleHeading,
  getTimeToDisplay,
  transformMillisecToHourFormat,
};
