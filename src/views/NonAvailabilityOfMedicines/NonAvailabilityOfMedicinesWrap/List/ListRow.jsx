import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  isNullOrUndefined,
} from '../../../../common/helpers/collectionUtils';

function ListRow({
  index,
  details,
  pageNo,
}) {
  const backGroundClass = (index % 2) !== 0 ? 'BG--Orange' : '';

  return (
    <tr className={`ListMaster__Row ${backGroundClass}`}>
      <td className="ListMaster__Row__Item" style={{ width: '10%' }}>
        {(index + 1) + (pageNo * 25)}
      </td>
      <td className="ListMaster__Row__Item" style={{ width: '10%' }}>
        {isNullOrUndefined(details.vehicleRegistrationNumber)? 'NA' : details.vehicleRegistrationNumber}
      </td>
      <td className="ListMaster__Row__Item" style={{ width: '10%' }}>
        {isNullOrUndefined(details.date)? 'NA' : dayjs(details.date).format('DD-MMM-YYYY')}
      </td>
      <td className="ListMaster__Row__Item" style={{ width: '10%' }}>
        {isNullOrUndefined(details.medicineName)? 'NA' : details.medicineName}
      </td>
    </tr>
  );
}

ListRow.defaultProps = {
  details: {},
};

ListRow.propTypes = {
  index: PropTypes.number.isRequired,
  pageNo: PropTypes.number.isRequired,
  details: PropTypes.object,
};

export default ListRow;
