import React from 'react';
import PropTypes from 'prop-types';
import style from './rowStyle';

function ListRow({
  index,
  details: vehicleDetails,
}) {
  const backGroundClass = (index % 2) !== 0 ? 'BG--Orange' : '';
  const restockedQuantity = vehicleDetails.restockedQuantity ? vehicleDetails.restockedQuantity : 0;
  const manualCorrection = vehicleDetails.manualTransactionQuantity
    ? vehicleDetails.manualTransactionQuantity : 0;
  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center' }}>
      <td className="ListMaster__Row__Item Break-All Ml-10" style={style.sNo}>
        {vehicleDetails.id}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-10" style={style.registrationNumber}>
        {vehicleDetails.vehicleRegistrationNumber}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-10" style={style.medicine}>
        {vehicleDetails.medicine}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-10" style={style.uom}>
        {vehicleDetails.medicineUnit}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-10" style={style.monthlyBeginning}>
        {vehicleDetails.monthlyBeginningInventoryQuantity}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-10" style={style.consumed}>
        {vehicleDetails.consumedOnJobQuantity}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-10" style={style.restocked}>
        {restockedQuantity + manualCorrection}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-10" style={style.expired}>
        {vehicleDetails.expiredQuantity}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-10" style={style.currentInventory}>
        {vehicleDetails.currentInventoryQuantity}
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
