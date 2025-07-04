import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function HeaderRow({ intl }) {
  return (
    <thead>
      <tr className="ListMaster__Header Font--S16 text-white">
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.sNo' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.vehicleRegistrationNo' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.date' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.medicineName' })}
        </th>
      </tr>
    </thead>
  );
}

HeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HeaderRow);
