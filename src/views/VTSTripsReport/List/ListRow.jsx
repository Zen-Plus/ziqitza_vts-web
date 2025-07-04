import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import dayjs from 'dayjs';
import Checkbox from '../../../components/CheckBox';
import style from './rowStyle';
import { convertMeter } from '../../../common/helpers/commonUtils';
import { transformMillisecToHourFormat } from '../util';
import { isNullOrUndefined } from '../../../common/helpers/commonUtils'

function ListRow({
  index,
  mode,
  details: tripsReportDetails,
  handleTripIdClick,
  selectTripsReport,
  deSelectTripsReport,
  selectedItems,
  intl,
}) {

  const handleOnTripIdClick = () => {
    handleTripIdClick(tripsReportDetails);
  };
  function handleKeyPressTripId(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      handleTripIdClick(tripsReportDetails);
    }
  }

  function handleCheckBoxClick(event) {
    event.preventDefault();
    if (event.target.checked) {
      selectTripsReport(tripsReportDetails.id);
    } else {
      deSelectTripsReport(tripsReportDetails.id);
    }
  }

  const checked = selectedItems.indexOf(tripsReportDetails.id) > -1;
  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';

  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '20px', alignItems: 'center' }}>
      {
        mode !== 'Print' ? (
          <td style={{ flex: '0 1 20px' }}>
            <Checkbox checked={checked} onChange={handleCheckBoxClick} />
          </td>
        ) : null
      }
      <td className="ListMaster__Row__Item Break-All Ml-20" style={{ ...style.vendor, wordBreak: 'break-word' }}>
        {tripsReportDetails.vendorName}
      </td>
      <td className="ListMaster__Row__Item Ml-10" style={style.vehicleRegNo}>
        {tripsReportDetails.vehicleRegistrationNumber}
      </td>
      <td className="ListMaster__Row__Item Break-Word Ml-20" style={{ ...style.tripId }}>
        <div
          className="Flex Warmblue-Text Text-Decoration-Underline"
          style={{
            width: '58px',
            outline: 'none',
            cursor: 'pointer',
            pointerEvents: !isNullOrUndefined(tripsReportDetails.jobNumber) ? 'all' : 'none',
          }}
          onClick={handleOnTripIdClick}
          onKeyPress={handleKeyPressTripId}
          role="button"
          tabIndex={0}
        >
          {!isNullOrUndefined(tripsReportDetails.jobNumber) ? tripsReportDetails.jobNumber : 'NA'}
        </div>
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-20" style={{ ...style.requestType, wordBreak: 'break-word' }}>
        {tripsReportDetails.requestType || 'NA'}
      </td>
      <td className="ListMaster__Row__Item Ml-20" style={{ ...style.startTime, wordBreak: 'break-word' }}>
        {tripsReportDetails.startDate ?
          dayjs(tripsReportDetails.startDate).format('DD/MM/YYYY h:mmA') : 'NA'}
      </td>
      <td className="ListMaster__Row__Item" style={{ ...style.endTime, wordBreak: 'break-word' }}>
        {tripsReportDetails.endDate ?
          dayjs(tripsReportDetails.endDate).format('DD/MM/YYYY h:mmA') : 'NA'}
      </td>
      <td className="ListMaster__Row__Item" style={style.tripStatus}>
        {tripsReportDetails.tripStatus}
      </td>
      <td className="ListMaster__Row__Item Ml-10" style={{ ...style.timeTaken, wordBreak: 'break-word' }}>
        {!isNullOrUndefined(tripsReportDetails.timeTaken) ?
          transformMillisecToHourFormat(tripsReportDetails.timeTaken) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-10" style={style.distanceStatus}>
        {!isNullOrUndefined(tripsReportDetails.distanceStatus) ?
          tripsReportDetails.distanceStatus : 'NA'}
      </td>
      <td className="ListMaster__Row__Item" style={style.closureStatus}>
        {tripsReportDetails.closureStatus || 'NA'}
      </td>
      <td className="ListMaster__Row__Item Break-All" style={style.distance}>
        {!isNullOrUndefined(tripsReportDetails.distance) ?
          convertMeter(tripsReportDetails.distance, 'km', 1) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Ml-20" style={style.alertsGenerated}>
        {tripsReportDetails.alertCount}
      </td>
    </tr>
  );
}

ListRow.defaultProps = {
  details: {},
  mode: '',
  intl: {},
};

ListRow.propTypes = {
  index: PropTypes.number.isRequired,
  details: PropTypes.object,
  handleTripIdClick: PropTypes.func.isRequired,
  selectTripsReport: PropTypes.func.isRequired,
  deSelectTripsReport: PropTypes.func.isRequired,
  mode: PropTypes.string,
  selectedItems: PropTypes.array.isRequired,
  intl: PropTypes.object,
};

export default injectIntl(ListRow);
