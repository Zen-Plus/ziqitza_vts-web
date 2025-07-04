import { compareValues } from "../../../common/helpers/commonUtils";
import { cloneDeep } from "../../../common/helpers/collectionUtils";

export function createNearbyErvListPayload(list) {
  let _updatedList = cloneDeep(list);
  _updatedList.sort(compareValues("aerialDistance", "ASC"));
  _updatedList = _updatedList.slice(0, 10);

  return _updatedList;
}

export const maxDistanceRange = 5000;

export default {
  createNearbyErvListPayload,
};
