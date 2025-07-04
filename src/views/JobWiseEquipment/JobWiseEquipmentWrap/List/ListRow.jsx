import React from 'react';
import PropTypes from 'prop-types';
import { isNullOrUndefined, displayDateTime } from '../../../../common/helpers/collectionUtils';

function ListRow({
  index,
  details: vehicleDetails,
}) {
  return (
    <tr className={`ListMaster__Row Border-Gray`} style={{ alignItems: 'center' }}>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.sno) ? 'NA' : vehicleDetails.sno}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.jobNumber) ? 'NA' : vehicleDetails.jobNumber}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.jobResolution) ? 'NA' : vehicleDetails.jobResolution}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.callDateTime) ? 'NA' : displayDateTime(vehicleDetails.callDateTime)}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.vehicleRegistrationNumber) ? 'NA' : vehicleDetails.vehicleRegistrationNumber}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.patientNameAndAge) ? 'NA' : vehicleDetails.patientNameAndAge}
      </td>
      <td className="ListMaster__Row__Item">
        {isNullOrUndefined(vehicleDetails.equipmentsName) ? 'NA' : vehicleDetails.equipmentsName}
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
