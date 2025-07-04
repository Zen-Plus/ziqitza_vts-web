import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Checkbox from '../../../../components/CheckBox';
import { LoaderWithOverLay } from '../../../../components/Loader/LoaderWithOverLay';
import Icon from '../../../../components/Icon';
import style from './rowStyle';
import { getTimeToDisplay } from '../../../../common/helpers/vehicles';
import useCustomState from '../../../../common/hooks/useCustomState';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';
import { NotificationContext } from '../../../../providers/withNotificationProvider';
import { fetchVehicleDistanceAndLocation } from '../../../../api/vehicles';
import { isNullOrUndefined } from '../../../../common/helpers/commonUtils';
import { overrideErrorCode } from '../../../../common/helpers/apiErrors';

function checkActionsDisable(id, selectedItems = []) {
  return (selectedItems.length > 1
    || ((selectedItems.length === 1) && (!selectedItems.includes(id))));
}

const trackingStatusColor = {
  MOVING: 'LightGreen',
  PARKED: 'Yellow',
  UNAUTHORIZED: 'Amber',
  DEVICE_MALFUNCTIONING: 'lightRed',
  NO_RESPONSE: 'Maroon',
  OFF_ROAD: 'Black',
  OUT_OF_SERVICE: 'Blue',
};

const deviceStatusDotColor = {
  CORRECT_DATA: 'Green-dot',
  INCORRECT_DATA: 'Yellow-dot',
  NO_DATA: 'Red-dot',
}

function ListRow({
  index,
  details: vehicleDetails,
  selectVehicle,
  deSelectVehicle,
  selectedItems,
  setVehicleConfig,
  intl,
  handleClickJobNumber,
}) {
  const [timeDistanceDetails, setTimeDistanceDetails] = useCustomState({
    isFetching: false, timeDistanceDetail: null
  });

  const {
    isFetching,
    timeDistanceDetail,
  } = timeDistanceDetails;

  const userConfig = React.useContext(UserConfigContext);
  const notifications = React.useContext(NotificationContext);

  const fetchTimeDistanceDetailsStart = () => {
    setTimeDistanceDetails({ isFetching: true });
  }

  const fetchTimeDistanceDetailsSuccess = (_timeDistanceDetails) => {
    setTimeDistanceDetails({ isFetching: false, timeDistanceDetail: _timeDistanceDetails.data });
  }

  const fetchTimeDistanceDetailsError = (error) => {
    const _error = overrideErrorCode({
      error,
      toOverride: 'ZQTZA0004',
      withCodes: ['ServiceNotAvailable'],
    });
    notifications.pushNotification(_error);
    setTimeDistanceDetails({ isFetching: false });
  }

  const getTimeDistanceDetails = () => {
    fetchTimeDistanceDetailsStart();
    fetchVehicleDistanceAndLocation({ vehicleId: vehicleDetails.id, userConfig: userConfig.userConfig })
      .then((res) => {
        fetchTimeDistanceDetailsSuccess(res.body);
      })
      .catch((err) => {
        fetchTimeDistanceDetailsError(err);
      });
  }

  function handleShowClick() {
    if (!timeDistanceDetail) {
      getTimeDistanceDetails();
    }
  }

  function handleCheckBoxClick(event) {
    event.preventDefault();
    if (event.target.checked) {
      selectVehicle(vehicleDetails.id);
    } else {
      deSelectVehicle(vehicleDetails.id);
    }
  }

  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';
  const checked = selectedItems.indexOf(vehicleDetails.id) > -1;
  const areActionsDisabled = checkActionsDisable(vehicleDetails.id, selectedItems);
  const lastUpdatedAt = new Date(vehicleDetails.timeSinceLastJobOrOffroad).toUTCString();

  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center' }}>
      {isFetching && <LoaderWithOverLay />}
      <td style={{ flex: '0 1 20px' }}>
        <Checkbox checked={checked} onChange={handleCheckBoxClick} />
      </td>
      <td
        className="ListMaster__Row__Item Break-All Cursor-Pointer Navigation_Link"
        style={{
          ...style.registerationNo,
          pointerEvents: areActionsDisabled ? 'none' : 'all',
        }}
      >
        <span onClick={() => setVehicleConfig({ selectedVehicleToView: vehicleDetails })}>
          {vehicleDetails.registrationNumber}
        </span>
      </td>
      <td
        className={`ListMaster__Row__Item Break-All ${(vehicleDetails.serviceRequestId && vehicleDetails.jobId) ? 'Cursor-Pointer Navigation_Link' : ''}`}
        style={{
          ...style.jobNumber,
          pointerEvents: (vehicleDetails.serviceRequestId && vehicleDetails.jobId) ? 'all' : 'none',
        }}
      >
        <span onClick={() => handleClickJobNumber(vehicleDetails)}>
          {vehicleDetails.jobNumber || 'NA'}
        </span>
      </td>
      <td
        className={`Break_Word ML-23 ${trackingStatusColor[vehicleDetails.trackingStatus]}`}
        style={style.trackingStatus}
      >
        {vehicleDetails.trackingStatusValue}
      </td>
      <td className="ListMaster__Row__Item ML-23" style={{ ...style.vehicleStatus,  wordBreak: 'break-word'}}>
        {vehicleDetails.milestoneValue}
      </td>
      <td className="ListMaster__Row__Item ML-23 Break-All" style={style.timeSinceLastJob}>
        <span
          title={intl.formatMessage({ id: 'label.lastUpdatedAt' }, { lastUpdatedAt })}
          className="Cursor-Default"
          style={{ marginLeft: '1px', outline: 'none' }}
        >
          {vehicleDetails.timeSinceLastJobOrOffroad ?
          getTimeToDisplay(vehicleDetails.timeSinceLastJobOrOffroad, intl): 'NA'}
        </span>
      </td>
      <td className={`ListMaster__Row__Item ML-23 Break-All ${timeDistanceDetail ? '' : 'Navigation_Link'}`} style={style.currentLocation}>
        <div
          onClick={handleShowClick}
          title={`${timeDistanceDetail ? (timeDistanceDetail.currentAddress || '') : ''}`}
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: '120px',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            cursor: 'pointer',
            paddingTop: 4,
          }}>
          {timeDistanceDetail ? timeDistanceDetail.currentAddress || 'NA' : intl.formatMessage({ id: 'label.show' })}
        </div>
      </td>
      <td className="ListMaster__Row__Item ML-23 Flex JustifyContent--Center" style={style.deviceStatus}>
        <div className={`${deviceStatusDotColor[vehicleDetails.deviceStatus]}`} />
      </td>
      <td
        className="ListMaster__Row__Item Ml-20"
        style={
          {
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: areActionsDisabled ? 'none' : 'all',
          }
        }
      >
        <div
          title={intl.formatMessage({ id: 'label.seeOnMap' })}
          className="Cursor-Pointer"
          style={{ marginLeft: '20px', outline: 'none' }}
          onClick={() => setVehicleConfig({ selectedVehicleToView: vehicleDetails, isSelectedVehicleMapVisible: true })}
        >
          <Icon name="view-map" />
        </div>
      </td>
    </tr>
  );
}

ListRow.defaultProps = {
  details: {},
  selectedItems: [],
};

ListRow.propTypes = {
  index: PropTypes.number.isRequired,
  details: PropTypes.object,
  selectVehicle: PropTypes.func.isRequired,
  deSelectVehicle: PropTypes.func.isRequired,
  selectedItems: PropTypes.array,
  setVehicleConfig: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ListRow);
