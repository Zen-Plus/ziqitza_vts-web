import React from 'react';
import PropTypes from 'prop-types';
import {isNullOrUndefined} from '../../../../common/helpers/collectionUtils';

function ListRow({
  index,
  details: vehicleDetails,
}) {
  const backGroundClass = (index % 2) !== 0 ? 'BG--Orange' : '';
  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ alignItems: 'center' }}>
      <td className="ListMaster__Row__Item">
        { isNullOrUndefined(vehicleDetails.id)? 'NA' : vehicleDetails.id}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.date)? 'NA' : vehicleDetails.date}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.totalVehicle)? 'NA' : vehicleDetails.totalVehicle}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.totalOnRoadTime)? 'NA' : vehicleDetails.totalOnRoadTime}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.offroadTime)? 'NA' : vehicleDetails.offroadTime}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.balanceOnRoadTime)? 'NA' : vehicleDetails.balanceOnRoadTime}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.percentageOnRoad)? 'NA' : Number(vehicleDetails.percentageOnRoad).toFixed(2)}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.deviation)? 'NA' : Number(vehicleDetails.deviation).toFixed(2)}
      </td>
    </tr>
  );
}

ListRow.defaultProps = {
  details: {},
};

ListRow.propTypes = {
  index: PropTypes.number.isRequired,
  details: PropTypes.object,
};

export default ListRow;
