import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../../../components/CheckBox';
import style from './rowStyle';
import { convertMeter } from '../../../../common/helpers/commonUtils';
import { isNullOrUndefined } from '../.../../../../../common/helpers/commonUtils';

function ListRow({
  index,
  details: distanceReportDetails,
  selectDistanceReport,
  deSelectDistanceReport,
  mode,
  selectedItems,
}) {
  function handleCheckBoxClick(event) {
    event.preventDefault();
    if (event.target.checked) {
      selectDistanceReport(distanceReportDetails.vehicleId);
    } else {
      deSelectDistanceReport(distanceReportDetails.vehicleId);
    }
  }

  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';

  const checked = selectedItems.indexOf(distanceReportDetails.vehicleId) > -1;
  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center' }}>
      {
        mode !== 'Print' ? (
          <td style={{ flex: '0 1 20px' }}>
            <Checkbox checked={checked} onChange={handleCheckBoxClick} />
          </td>
        ) : null
      }
      <td className="ListMaster__Row__Item Break-All Ml-10" style={style.vendor}>
        {!isNullOrUndefined(distanceReportDetails.vendorName) ? distanceReportDetails.vendorName : 'NA' }
      </td>
      <td className="ListMaster__Row__Item Ml-15 Break-All" style={style.vehicleRegNo}>
        {!isNullOrUndefined(distanceReportDetails.vehicleRegistrationNumber) ? distanceReportDetails.vehicleRegistrationNumber : 'NA' }
      </td>
      <td className="ListMaster__Row__Item Ml-15 Break-All" style={mode === 'Print' ? style.printNoOfTrips : style.noOfTrips}>
        {!isNullOrUndefined(distanceReportDetails.tripCount) ? distanceReportDetails.tripCount : 'NA' }
      </td>
      <td className="ListMaster__Row__Item Ml-15 Break-All" style={style.distance}>
        {!isNullOrUndefined(distanceReportDetails.distance) ? convertMeter(distanceReportDetails.distance, 'km', 1) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Ml-15 Break-All" style={style.distanceOnRoad}>
        {!isNullOrUndefined(distanceReportDetails.onRoadDistance) ? convertMeter(distanceReportDetails.onRoadDistance, 'km', 1) : 'NA' }
      </td>
      <td className="ListMaster__Row__Item Ml-15 Break-All" style={style.distanceOffRoad}>
        {!isNullOrUndefined(distanceReportDetails.offRoadDistance) ? convertMeter(distanceReportDetails.offRoadDistance, 'km', 1) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Ml-15 Break-All" style={style.unauthorisedMovementDistance}>
        {!isNullOrUndefined(distanceReportDetails.unauthorizedDistance) ? convertMeter(distanceReportDetails.unauthorizedDistance, 'km', 1) : 'NA' }
      </td>
      <td className="ListMaster__Row__Item Ml-15 Break-All" style={style.noOfAlertsGenerated}>
        {!isNullOrUndefined(distanceReportDetails.alertCount) ? distanceReportDetails.alertCount : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Ml-15 Break-All" style={style.averageMileage}>
        {!isNullOrUndefined(distanceReportDetails.avgMileage) ? convertMeter(distanceReportDetails.avgMileage, 'kmpl', 1) : 'NA' }
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
  selectDistanceReport: PropTypes.func.isRequired,
  deSelectDistanceReport: PropTypes.func.isRequired,
  mode: PropTypes.string,
  selectedItems: PropTypes.array.isRequired,
};

export default ListRow;
