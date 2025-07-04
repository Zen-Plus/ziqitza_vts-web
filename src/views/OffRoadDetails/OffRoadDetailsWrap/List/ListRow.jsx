import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  isNullOrUndefined,
  displayDateTime,
} from '../../../../common/helpers/collectionUtils';

function ListRow({
  index,
  details,
}) {
  const backGroundClass = (index % 2) !== 0 ? 'BG--Orange' : '';

  return (
    <tr className={`ListMaster__Row ${backGroundClass}`}>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(details.sno)? 'NA' : details.sno}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(details.vehicleRegistrationNumber)? 'NA' : details.vehicleRegistrationNumber}
      </td>
      <td className="ListMaster__Row__Item" style={{ width: '10%' }}>
        {isNullOrUndefined(details.date)? 'NA' : dayjs(details.date).format('DD-MMM-YYYY')}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(details.supportTicketNumber)? 'NA' : details.supportTicketNumber}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(details.parkingBayName)? 'NA' : details.parkingBayName}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(details.districtName)? 'NA' : details.districtName}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(details.offRoadReason)? 'NA' : details.offRoadReason}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(details.totalHours)? 'NA' : details.totalHours}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(details.currentStatus)? 'NA' : details.currentStatus}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(details.offRoadDateTime)? 'NA' : displayDateTime(details.offRoadDateTime)}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(details.onRoadDateTime)? 'NA' : displayDateTime(details.onRoadDateTime)}
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
