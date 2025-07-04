import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function ListHeaderRow({ intl }) {
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
          {intl.formatMessage({ id: 'label.medicine' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.uom' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.monthlyBeginningInventory' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.consumedOnJob' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.restocked' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.expired' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.currentInventory' })}
        </th>
      </tr>
    </thead>
  );
}

ListHeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ListHeaderRow);
