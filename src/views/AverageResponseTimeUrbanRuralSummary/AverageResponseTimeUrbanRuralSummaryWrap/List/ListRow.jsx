import React from 'react';
import PropTypes from 'prop-types';
import { displayDateTime } from '../../../../common/helpers/collectionUtils';

function ListRow({
  index,
  details: averageResponseTimeDetails,
}) {
  return (
    <tr className={`ListMaster__Row`} style={{ alignItems: 'center', background: 'white' }}>
      <td className="ListMaster__Row__Item Border">
        {index+1}
      </td>
      <td className="ListMaster__Row__Item Border">
        {averageResponseTimeDetails.date || 'NA'}
      </td>
      <td className="ListMaster__Row__Item Border">
        {averageResponseTimeDetails.vehicleDistrictName}
      </td>
      <td className="ListMaster__Row__Item Border">
        {averageResponseTimeDetails.vehicleRegistrationNumber}
      </td>
      <td className="ListMaster__Row__Item Border">
        {averageResponseTimeDetails.tripCount}
      </td>
      <td className="ListMaster__Row__Item Border">
        {averageResponseTimeDetails.totalPatients}
      </td>
      <td className="ListMaster__Row__Item Border">
        {averageResponseTimeDetails.parkingBayLocationType}
      </td>
      <td className="ListMaster__Row__Item Border">
        {
          (averageResponseTimeDetails.parkingBayLocationType == 'Rural')
            ? averageResponseTimeDetails.avgRuralResponseTime
            : averageResponseTimeDetails.avgUrbanResponseTime
        }
      </td>
      <td className="ListMaster__Row__Item Border">
        {averageResponseTimeDetails.parkingBayName}
      </td>
      <td className="ListMaster__Row__Item Border">
        {averageResponseTimeDetails.vehicleType}
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
