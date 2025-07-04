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
        {vehicleDetails.ambulanceNo}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.district}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.vehicleCategory}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.baseLocation}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.status}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.statusDate}
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
