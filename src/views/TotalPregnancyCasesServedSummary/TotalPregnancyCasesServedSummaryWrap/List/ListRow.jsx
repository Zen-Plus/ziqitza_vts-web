import React from 'react';
import PropTypes from 'prop-types';
import { displayDateTime } from '../../../../common/helpers/collectionUtils';

function ListRow({
  index,
  details,
}) {
  return (
    <tr className={`ListMaster__Row`} style={{ alignItems: 'center', background: 'white' }}>
      <td className="ListMaster__Row__Item Border">
        {index+1}
      </td>
      <td className="ListMaster__Row__Item Border">
        {details.vehicleDistrict}
      </td>
      <td className="ListMaster__Row__Item Border">
        {details.vehicleRegistrationNumber}
      </td>
      <td className="ListMaster__Row__Item Border">
        {details.parkingBay}
      </td>
      <td className="ListMaster__Row__Item Border">
        {details.vehicleType}
      </td>
      <td className="ListMaster__Row__Item Border">
        {details.totalPregnantLadyCasesVehicleWise}
      </td>
      <td className="ListMaster__Row__Item Border">
        {details.totalPickupCaseVehicleWise}
      </td>
      <td className="ListMaster__Row__Item Border">
        {details.totalDropCaseVehicleWise}
      </td>
      <td className="ListMaster__Row__Item Border">
        {details.totalIftCaseVehicleWise}
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
