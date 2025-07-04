import dayjs from 'dayjs';
import { imagesBaseUrl } from '../../../../common/constants/urls';
import { convertMeter, isNullOrUndefined } from '../../../../common/helpers/commonUtils';
import { tripMilestoneValues } from '../util';

export function getLocationMarketPath(value = {}) {
  let _iconUrl = '';
  let status = '';
  if (value.supportTicketMilestone) {
    status = value.supportTicketMilestone.toLowerCase().replaceAll('_', '-');
  }

  if (value.milestone) {
    status = value.milestone.toLowerCase().replaceAll('_', '-');
  }
  if (['end'].includes(status)) {
    status = 'trip-complete';
  }
  if (['start'].includes(status)) {
    status = 'job-start';
  }
  _iconUrl = `${imagesBaseUrl}${status}.svg`;
  return _iconUrl;
}

export function milestonePopupHeaderTitle (detail = {}){
  let titleString = '';
  if (detail.milestone) {
    titleString += tripMilestoneValues[detail.milestone];
    titleString += ' | ';
  }

  if (!isNullOrUndefined(detail.latitude) && !isNullOrUndefined(detail.longitude)) {
    titleString += `${detail.latitude}, ${detail.longitude}`;
  }

  return titleString;
}

export function milestonePopupTile (detail = {}){
  let titleString = '';
  if (detail.dateTime) {
    const formatedDate = dayjs(detail.dateTime).format('DD MMM YYYY, hh:mm a');
    titleString += formatedDate;
    titleString += ' | ';
  }

  if (detail.location) {
    titleString += detail.location;
    titleString += ' | ';
  }

  if (detail.km !== null) {
    const km = convertMeter(detail.km, 'km', 2);
    titleString += km;
  }
  return titleString;
}

export function getMarkerProps(value = {}) {
  let _props = {
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    iconSize: [30, 30],
    shadowSize: [30, 30],
    shadowAnchor: [30, 30],
  };

  if (value.supportTicketMilestone === "PATIENT_DROPPED"
    || value.milestone === "PATIENT_DROPPED") {
      _props = {
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
        iconSize: [40, 40],
        shadowSize: [40, 40],
        shadowAnchor: [40, 40],
      };
  }
  return _props;
};

export default {
  getLocationMarketPath,
};
