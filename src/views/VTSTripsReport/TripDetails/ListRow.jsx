import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import dayjs from 'dayjs';
import { convertMeter } from '../../../common/helpers/commonUtils';
import { getTimeToDisplay } from '../util';

import style from './rowStyle';

function ListRow({
  index,
  details: tripIdDetails,
  intl,
}) {
  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';

  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center' }}>
      <td className="ListMaster__Row__Item" style={{ ...style.milestone, wordBreak: 'break-word' }}>
        {tripIdDetails.milestone}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.startTime}>
        {tripIdDetails.startTime ?
          dayjs(tripIdDetails.startTime).format('DD/MM/YYYY h:mm A') : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.endTime}>
        {tripIdDetails.endTime ?
          dayjs(tripIdDetails.endTime).format('DD/MM/YYYY h:mm A') : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-20" style={style.totalTime}>
        {tripIdDetails.totalTimeTaken ?
          getTimeToDisplay(tripIdDetails.totalTimeTaken, intl) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-20" style={style.distance}>
        {tripIdDetails.distance ?
          convertMeter(tripIdDetails.distance, 'km', 1) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-20" style={style.excessTime}>
        {tripIdDetails.excessTime ?
          getTimeToDisplay(tripIdDetails.excessTime, intl) : 'NA'}
      </td>
    </tr>
  );
}

ListRow.defaultProps = {
  details: {},
  intl: {},
};

ListRow.propTypes = {
  index: PropTypes.number.isRequired,
  details: PropTypes.object,
  intl: PropTypes.object,
};

export default injectIntl(ListRow);
