import React from 'react';
import PropTypes from 'prop-types';
import { displayDateTime } from '../../../../common/helpers/collectionUtils';

function ListRow({
  index,
  details: tripDetails,
}) {
  return (
    <tr className={`ListMaster__Row`} style={{ alignItems: 'center', background: 'white' }}>
      <td className="ListMaster__Row__Item Border">
        {index+1}
      </td>
      <td className="ListMaster__Row__Item Border">
        {tripDetails.date || 'NA'}
      </td>
      <td className="ListMaster__Row__Item Border">
        {tripDetails.vehicleDistrictName}
      </td>
      <td className="ListMaster__Row__Item Border">
        {tripDetails.vehicleRegistrationNumber}
      </td>
      <td className="ListMaster__Row__Item Border">
        {tripDetails.tripCount}
      </td>
      <td className="ListMaster__Row__Item Border">
        {tripDetails.unAvailedJobs}
      </td>
      <td className="ListMaster__Row__Item Border">
        {tripDetails.totalPatients}
      </td>
      <td className="ListMaster__Row__Item Border">
        {tripDetails.parkingBayLocationType}
      </td>
      <td className="ListMaster__Row__Item Border">
        {tripDetails.totalKms}
      </td>
      <td className="ListMaster__Row__Item Border">
        {tripDetails.avgTripKm}
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
