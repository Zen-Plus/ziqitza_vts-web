import moment from "moment";
import { convertMilliSeconds } from ".././../../../common/helpers/transformers";

function getFiltersData(filter) {
  const _filter = {};
  _filter.fromDate = filter.dateRange
    ? moment(filter.dateRange[0]).format("DD MMM YYYY hh:mm A")
    : moment().subtract(3, "months").format("DD MMM YYYY hh:mm A");
  _filter.toDate = filter.dateRange
    ? moment(filter.dateRange[1]).format("DD MMM YYYY hh:mm A")
    : moment().format("DD MMM YYYY hh:mm A");
  _filter.generatedTime = moment(filter.generatedOn).format(
    "DD/MM/YYYY hh:mm A"
  );
  return _filter;
}

export const getPrintTitleHeading = (filter) => {
  const { fromDate, toDate, generatedTime } = getFiltersData(filter);

  return `This report has been generated on ${generatedTime || "NA"}
   with these filter criteria
   Date-Time Interval: ${fromDate || "NA"} - ${toDate || "NA"} `;
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
export default {
  getPrintTitleHeading,
  getTimeToDisplay,
};
