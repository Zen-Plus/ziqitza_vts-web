import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../../../components/CheckBox';
import style from './rowStyle';
import { getTimeToDisplay } from './util'
import { injectIntl } from 'react-intl';
import { isNullOrUndefined } from '../../../../common/helpers/commonUtils';


function ListRow({
  index,
  details: trackingAlertsReportDetails,
  selectTrackingAlertsReport,
  deSelectTrackingAlertsReport,
  mode,
  intl,
  selectedItems,
}) {
  function handleCheckBoxClick(event) {
    event.preventDefault();
    if (event.target.checked) {
      selectTrackingAlertsReport(trackingAlertsReportDetails.userId);
    } else {
      deSelectTrackingAlertsReport(trackingAlertsReportDetails.userId);
    }
  }

  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';

  const checked = selectedItems.indexOf(trackingAlertsReportDetails.userId) > -1;
  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center' }}>
      {
        mode !== 'Print' ? (
          <td style={{ flex: '0 1 20px' }}>
            <Checkbox checked={checked} onChange={handleCheckBoxClick} />
          </td>
        ) : null
      }
      <td className="ListMaster__Row__Item" style={{ ...style.employeeId, marginLeft: 30 }}>
        {trackingAlertsReportDetails.empId}
      </td>
      <td className="ListMaster__Row__Item Ml-20" style={style.noOfAlertRespondedTo}>
        {trackingAlertsReportDetails.alertsResponded}
      </td>
      <td className="ListMaster__Row__Ite Ml-20" style={style.noOfAlertsClosed}>
        {trackingAlertsReportDetails.alertsClosed}
      </td>
      <td className="ListMaster__Row__Item Ml-20" style={style.averageRespondTime}>
        {trackingAlertsReportDetails.avgResponseTime ? getTimeToDisplay(trackingAlertsReportDetails.avgResponseTime, intl) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Ml-20" style={style.averageClosingTime}>
        {!isNullOrUndefined(trackingAlertsReportDetails.avgClosingTime) ? getTimeToDisplay(trackingAlertsReportDetails.avgClosingTime, intl) : 'NA'}
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
  selectTrackingAlertsReport: PropTypes.func.isRequired,
  deSelectTrackingAlertsReport: PropTypes.func.isRequired,
  mode: PropTypes.string,
  selectedItems: PropTypes.array.isRequired,
  intl: PropTypes.object,
};

export default injectIntl(ListRow);
