import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import style from './rowStyle';
import { convertMilliseconds } from '../../../../../common/helpers/commonUtils'

function ListRow({
  index,
  details: alertHistoryDetails,
}) {
  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';

  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '18px'}}>
      <td className="ListMaster__Row__Item Break-All Font--S14" style={style.ruleName}>
        {alertHistoryDetails.ruleName}
      </td>
      <td className="ListMaster__Row__Item Ml-15 Break-All Font--S14" style={style.alertGenerationTime}>
        {alertHistoryDetails.generatedOn && dayjs(alertHistoryDetails.generatedOn).format('DD MMM YYYY | hh : mm a')}
      </td>
      <td className="ListMaster__Row__Item Ml-15 Break-All Font--S14" style={style.exceptionReason}>
        {alertHistoryDetails.exceptionReason}
      </td>
      <td className="ListMaster__Row__Item Ml-15 Break-All Font--S14" style={style.grantExceptionTime}>
        {convertMilliseconds(alertHistoryDetails.extensionPeriod, 'MIN', 0)}
      </td>
      <td className="ListMaster__Row__Item Ml-15 Break-All Font--S14" style={style.note}>
        {alertHistoryDetails.note || 'NA'}
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
