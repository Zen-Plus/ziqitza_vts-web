import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../../../components/CheckBox';
import style from './rowStyle';
import { convertMeter } from '../../../../common/helpers/commonUtils'

function ListRow({
  index,
  details: gpsQualityReportDetails,
  selectGPSQualityReport,
  deSelectGPSQualityReport,
  mode,
  selectedItems,
}) {
  function handleCheckBoxClick(event) {
    event.preventDefault();
    if (event.target.checked) {
      selectGPSQualityReport(gpsQualityReportDetails.vehicleId);
    } else {
      deSelectGPSQualityReport(gpsQualityReportDetails.vehicleId);
    }
  }

  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';

  const checked = selectedItems.indexOf(gpsQualityReportDetails.vehicleId) > -1;
  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center' }}>
      {
        mode !== 'Print' ? (
          <td style={{ flex: '0 1 20px' }}>
            <Checkbox checked={checked} onChange={handleCheckBoxClick} />
          </td>
        ) : null
      }
      <td className="ListMaster__Row__Item Break-All Ml-24" style={style.vehicleRegNo}>
        {gpsQualityReportDetails.vehicleRegistrationNumber}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.deviceImei}>
        {gpsQualityReportDetails.deviceImei}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.deviceModel}>
        {gpsQualityReportDetails.deviceModel}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.simCard}>
        {gpsQualityReportDetails.simCardProvider}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.GpsPacketLoss}>
        {`${(gpsQualityReportDetails.lossPercentage).toFixed(0)}%`}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.GpsPacketDisrepancy}>
        {`${(gpsQualityReportDetails.discrepancyPercentage).toFixed(0)}%`}
      </td>
    </tr>
  );
}

ListRow.defaultProps = {
  details: {},
  mode: '',
};

ListRow.propTypes = {
  index: PropTypes.number.isRequired,
  details: PropTypes.object,
  selectGPSQualityReport: PropTypes.func.isRequired,
  deSelectGPSQualityReport: PropTypes.func.isRequired,
  mode: PropTypes.string,
  selectedItems: PropTypes.array.isRequired,
};

export default ListRow;
