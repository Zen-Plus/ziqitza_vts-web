import React from 'react';
import PropTypes from 'prop-types';
import { displayDateTime } from '../../../../common/helpers/collectionUtils';

function ListRow({
  index,
  details: vehicleDetails,
}) {
  return (
    <tr className={`ListMaster__Row`} style={{ alignItems: 'center', background: 'white' }}>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.districtName}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.parkingBayName}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.vehicleType}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.registrationNumber}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.vendorName}
      </td>
      <td className="ListMaster__Row__Item Border">
        {displayDateTime(vehicleDetails.hoToDate)}
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
