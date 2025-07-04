const validateCommaDeliminatorRegex = new RegExp(/^.*[,].*$/);
const validateLatitudeRegex = new RegExp(/^[-+]?([1-8]?\d(\.\d{1,8})?|90(\.0{1,8})?)$/);
const validateLongitudeRegex = new RegExp(/^[-+]?(180(\.0{1,8})?|((1[0-7]\d)|([1-9]?\d))(\.\d{1,8})?)$/);
const consecutiveSpaceRegex = new RegExp('^.*\\s{2}.*$');
const clusterNameRegex = new RegExp(/^(?=.{2,20})(?!.*\s\s)[a-zA-Z0-9][a-zA-Z0-9 ]*[a-zA-Z0-9]$/);
const receiverPortRegex = new RegExp(/^[0-9]{2,5}$/);
const noteRegex = new RegExp(/^(?=.{2,})(?!.*\s\s)[a-zA-Z0-9!@#$%^&*(),.?":{}|<> ]*[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]$/);
const numberRegex = new RegExp(/^[0-9]*$/);

export function validateCommaDeliminator(value = "") {
  return validateCommaDeliminatorRegex.test(value);
}
export function validateLatitude(value = "") {
  return validateLatitudeRegex.test(value);
}
export function validateLongitude(value = "") {
  return validateLongitudeRegex.test(value);
}

export function validateClusterName(value = "") {
  return clusterNameRegex.test(value);
}

export function validateReceiverPort(value = "") {
  return receiverPortRegex.test(value);
}

export function validateRequire(value = '') {
  return value && !!value.trim();
}

export function validateConsecutiveSpaces(value = '') {
  return consecutiveSpaceRegex.test(value);
}
export function validateNote(value = '') {
  return noteRegex.test(value);
}
export function validateNumber(value = '') {
  return numberRegex.test(value);
}

export default {
  validateCommaDeliminator,
  validateLatitude,
  validateLongitude,
  validateRequire,
  validateConsecutiveSpaces,
  validateClusterName,
  validateReceiverPort,
  validateNote,
  validateNumber
};
