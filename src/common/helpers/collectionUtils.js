import dayjs from 'dayjs';

export function cloneDeep(collection) {
  return JSON.parse(JSON.stringify(collection));
}
export function findObjectIndex(params = {}) {
  const array = params.array || [];
  const byKey = params.byKey || 'id';
  const valueToFind = params.forValue;

  for (let index = 0; index < array.length; index += 1) {
    const value = array[index][byKey];
    if (value && (value === valueToFind)) {
      return index;
    }
  }
  return -1;
}

export function isNullOrUndefined(value) {
  return [null, undefined].includes(value);
}

export function convertMillsToHHMMSS(duration) {
  // eslint-disable-next-line no-restricted-globals
  if (isNullOrUndefined(duration) || isNaN(duration)) {
    return 'NA';
  }
  const millis = duration % 1000;
  let _duration = duration;
  if (millis > 500) {
    _duration += 1000;
  }
  let seconds = Math.floor((_duration / 1000) % 60);
  let minutes = Math.floor((_duration / (1000 * 60)) % 60);
  let hours = Math.floor((_duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${hours}:${minutes}:${seconds}`;
}

export function displayDateTime(millis){
  if (isNullOrUndefined(millis)) {
    return 'NA';
  }
  return dayjs(millis).format('DD-MMM-YYYY : hh:mm a');
}

export default {
  cloneDeep,
  findObjectIndex,
  isNullOrUndefined,
  convertMillsToHHMMSS,
  displayDateTime
};
