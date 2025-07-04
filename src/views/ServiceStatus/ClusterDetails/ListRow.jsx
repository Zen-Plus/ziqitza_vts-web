import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import dayjs from 'dayjs';
import style from './rowStyle';

function ListRow({
  index,
  details: clusterDetails,
}) {
  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';

  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center' }}>
      <td className="ListMaster__Row__Item Ml-20" style={style.protocol}>
        {clusterDetails.name || 'NA'}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.lastAttempt}>
        {clusterDetails.lastAttemptedAt
          ? dayjs(clusterDetails.lastAttemptedAt).format('h:mma, DD MMM YYYY') : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.lastSuccessfulAttempt}>
        {clusterDetails.lastSuccessfulAttemptedAt
          ? dayjs(clusterDetails.lastSuccessfulAttemptedAt).format('h:mma, DD MMM YYYY') : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-20" style={{ ...style.status, textTransform: 'capitalize' }}>
        {clusterDetails.protocolStatus ? clusterDetails.protocolStatus.toLowerCase() : 'NA'}
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

export default injectIntl(ListRow);
