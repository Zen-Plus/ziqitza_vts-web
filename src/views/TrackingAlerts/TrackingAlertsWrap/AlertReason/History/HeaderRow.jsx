import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import style from './rowStyle';

function HeaderRow({
  intl,
}) {
  return (
    <thead>
      <tr className="ListMaster__Header AlignItems--Center" style={style.root}>
        <th className="ListMaster__Header__Item Font--S14" style={{ ...style.ruleName }}>
          {intl.formatMessage({ id: 'label.ruleName' })}
        </th>
        <th className="ListMaster__Header__Item Font--S14 Ml-15" style={{ ...style.alertGenerationTime }}>
          {intl.formatMessage({ id: 'label.alertGenerationTime' })}
        </th>
        <th className="ListMaster__Header__Item Ml-15 Font--S14" style={{ ...style.exceptionReason }}>
          {intl.formatMessage({ id: 'label.exceptionReason' })}
        </th>
        <th className="ListMaster__Header__Item Ml-15 Font--S14" style={{ ...style.grantExceptionTime }}>
          {intl.formatMessage({ id: 'label.grantExtensionTime' })}
        </th>
        <th className="ListMaster__Header__Item Ml-15 Font--S14" style={{ ...style.note }}>
          {intl.formatMessage({ id: 'label.note' })}
        </th>
      </tr>
    </thead>
  );
}

HeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default (injectIntl(HeaderRow));
