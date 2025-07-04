import React from 'react';
import PropTypes from 'prop-types';
import style from './rowStyle';
import { convertMeter } from '../../../../common/helpers/commonUtils';

function ListRow({
  index,
  details: alertCountDetails,
  onVehicleRegistrationNumberClick,
}) {
  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';

  const handleVehicleRegistrationOnClick = () => {
    onVehicleRegistrationNumberClick(alertCountDetails.vehicleId);
  };
  const handleVehicleRegistrationOnKeyPress = (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      onVehicleRegistrationNumberClick(alertCountDetails.vehicleId);
    }
  };
  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center', width: 1130 }}>
      <td className="ListMaster__Row__Item" style={style.vehicleRegNo}>
        <div
          className="Text-Decoration-Underline Warmblue-Text Cursor-Pointer"
          style={{ outline: 'none' }}
          onClick={handleVehicleRegistrationOnClick}
          onKeyPress={handleVehicleRegistrationOnKeyPress}
          role="button"
          tabIndex={0}
        >
          {alertCountDetails.registrationNumber}
        </div>
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.aerialDistance}>
        {alertCountDetails.aerialDistance && convertMeter(alertCountDetails.aerialDistance, 'km', 2)}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.roadDistance}>
        {alertCountDetails.roadDistance && convertMeter(alertCountDetails.roadDistance, 'km', 2)}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-20" style={style.parkingLocation}>
        <div
          title={alertCountDetails.parkingLocation}
          style={{
            width: '120px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {alertCountDetails.parkingLocation}
        </div>
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-20" style={style.trackingStatus}>
        <div
          title={alertCountDetails.trackingStatusValue}
          style={{
            width: '100px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {alertCountDetails.trackingStatusValue}
        </div>
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-20" style={style.vehicleStatus}>
        <div
          title={alertCountDetails.milestoneValue}
          style={{
            width: '100px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {alertCountDetails.milestoneValue}
        </div>
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-20" style={style.lastReportedLocation}>
        <div
          title={alertCountDetails.lastReportedLocation}
          style={{
            width: '240px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {alertCountDetails.lastReportedLocation}
        </div>
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
  onVehicleRegistrationNumberClick: PropTypes.func.isRequired,
};

export default ListRow;
