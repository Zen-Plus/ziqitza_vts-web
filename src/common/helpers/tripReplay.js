import { imagesBaseUrl } from "../constants/urls";

export function getLocationMarketPath(value) {
  let _iconUrl = "";
  let name = "";
  if (value) {
    name = value.id && value.id.toLowerCase().replaceAll("_", "-");
  }
  _iconUrl = `${imagesBaseUrl}${name}.svg`;
  return _iconUrl;
}

export default {
  getLocationMarketPath,
};
