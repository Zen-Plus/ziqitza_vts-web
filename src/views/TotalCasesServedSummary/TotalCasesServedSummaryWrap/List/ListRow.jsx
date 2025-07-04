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
        {index+1}
      </td>
      <td className="ListMaster__Row__Item Border Text_NoWrap">
        {displayDateTime(vehicleDetails.callLandTime)}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.jobNumber}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.category}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.primaryComplaint}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.jobClosureResolution}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.parkingBayLocationType}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.vehicleRegistrationNumber}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.vehicleType}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.parkingBay}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.vehicleDistrict}
      </td>
      <td className="ListMaster__Row__Item Border Text_NoWrap">
        {displayDateTime(vehicleDetails.jobCreatedAt)}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.pickupHospitalName}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.dropOffHospitalName}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.totalPatient}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.patientsName}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.patientsGender}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.patientsNumber}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.patientsAge}
      </td>
      <td className="ListMaster__Row__Item Border">
        {vehicleDetails.pickupLocation}
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
