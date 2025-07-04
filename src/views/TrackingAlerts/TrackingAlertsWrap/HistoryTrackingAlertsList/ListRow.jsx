import React from 'react';
import PropTypes from 'prop-types';
import style from './rowStyle';
import dayjs from 'dayjs';
import { isNullOrUndefined } from '../../../../common/helpers/commonUtils';

function ListRow({
  index,
  details: trackingAlertDetails,
  handleAlertCountClick,
}) {

  const handleOnAlertCountClick = () => {
    handleAlertCountClick(trackingAlertDetails);
  };
  function handleKeyPressAlertCount(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      handleAlertCountClick(trackingAlertDetails);
    }
  }

  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';

  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '25px' }}>
      <td className="ListMaster__Row__Item Flex Break-All" style={style.jobId}>
        {trackingAlertDetails.jobNumber || 'NA'}
      </td>
      <td className="ListMaster__Row__Item ML-20 Flex Break-All" style={style.vehicleRegistrationNo}>
        {trackingAlertDetails.vehicleRegistrationNumber || 'NA'}
      </td>
      <td className="ListMaster__Row__Item ML-20 Flex Break-All" style={style.jobAssignmentTime}>
        {trackingAlertDetails.jobAssignmentTime ?
          dayjs(trackingAlertDetails.jobAssignmentTime).format('DD MMM YYYY | hh:mm a') : 'NA'}
      </td>
      <td className="ListMaster__Row__Item ML-20 Flex Break-All"
        style={{ ...style.alertCount }}>
        <div
          className="Flex JustifyContent--Center Warmblue-Text Text-Decoration-Underline"
          style={{ width: '80px', outline: 'none', cursor: 'pointer' }}
          onClick={handleOnAlertCountClick}
          onKeyPress={handleKeyPressAlertCount}
          role="button"
          tabIndex={0}
        >
          {!isNullOrUndefined(trackingAlertDetails.alertCount) ? trackingAlertDetails.alertCount : 'NA' }
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
  handleAlertCountClick: PropTypes.func.isRequired,
};

export default ListRow;
