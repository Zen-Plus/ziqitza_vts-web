import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import style from './rowStyle';

function HeaderRow({
  intl,
}) {
  return (
    <thead>
      <tr className="ListMaster__Header" style={style.root}>
        <th className="ListMaster__Header__Item" style={style.protocol}>
          {intl.formatMessage({ id: 'label.protocol' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.lastAttempt}>
          {intl.formatMessage({ id: 'label.lastAttempted' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.lastSuccessfulAttempt}>
          {intl.formatMessage({ id: 'label.lastSuccessfulAttempt' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.status}>
          {intl.formatMessage({ id: 'label.status' })}
        </th>
      </tr>
    </thead>
  );
}

HeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HeaderRow);
