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
        <th className="ListMaster__Header__Item" style={style.ruleName}>
          {intl.formatMessage({ id: 'label.ruleName' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.alertGenerationTime}>
          {intl.formatMessage({ id: 'label.alertGenerationTime' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.alertClosingTime}>
          {intl.formatMessage({ id: 'label.alertClosingTime' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.alertStatus}>
          {intl.formatMessage({ id: 'label.alertStatus' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.readStatus}>
          {intl.formatMessage({ id: 'label.readStatus' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.actions}>
          {intl.formatMessage({ id: 'label.actions' })}
        </th>
      </tr>
    </thead>
  );
}

HeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HeaderRow);
