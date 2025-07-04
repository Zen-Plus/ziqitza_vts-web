import React from 'react';
import PropTypes from 'prop-types';
import style from './rowStyle';
import dayjs from 'dayjs';
import { isNullOrUndefined } from '../../../../common/helpers/commonUtils';

function ListRow({
  index,
  details: trackingAlertDetails,
  handleAlertCountClick,
  handleOpenAlertClick,
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
  const handleOnOpenAlertClick = () => {
    handleOpenAlertClick(trackingAlertDetails);
  };
  function handleKeyPressOpenAlert(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      handleOpenAlertClick(trackingAlertDetails);
    }
  }


  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';

  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '25px' }}>
      <td className="ListMaster__Row__Item Flex Break-All" style={style.jobId}>
        {!isNullOrUndefined(trackingAlertDetails.jobNumber) ? trackingAlertDetails.jobNumber :  'NA'}
      </td>
      <td className="ListMaster__Row__Item ML-20 Flex Break-All" style={style.vehicleRegisterationNo}>
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
          style={{ width: '80px', 
          outline: 'none', 
          cursor: 'pointer',
          pointerEvents: !isNullOrUndefined(trackingAlertDetails.alertCount) ? 'all' : 'none',  
        }}
          onClick={handleOnAlertCountClick}
          onKeyPress={handleKeyPressAlertCount}
          role="button"
          tabIndex={0}
        >
          {!isNullOrUndefined(trackingAlertDetails.alertCount) ? trackingAlertDetails.alertCount : 'NA' }
        </div>
      </td>
      <td
        className={`ListMaster__Row__Item Text-Decoration-Underline ${trackingAlertDetails.isFirstOpenAlert ? 'Blue-Text' : 'Red-Text'} ML-20 Break-All`}
        style={style.openAlert}>
        <div
          style={{ outline: 'none', cursor: 'pointer', wordBreak: 'break-word', width: '150px' }}
          onClick={handleOnOpenAlertClick}
          onKeyPress={handleKeyPressOpenAlert}
          role="button"
          tabIndex={0}>
          {trackingAlertDetails.openAlert}
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
  handleOpenAlertClick: PropTypes.func.isRequired,
};

export default ListRow;
