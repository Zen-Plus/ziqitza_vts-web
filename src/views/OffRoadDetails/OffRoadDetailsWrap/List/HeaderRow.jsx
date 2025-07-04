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
          {intl.formatMessage({ id: 'label.ervNo' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.date' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.osdId' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.baseLocation' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.district' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.requestType' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.offRoadDuration' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.offroadStatus' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.offRoadDateTime' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.onRoadDateTime' })}
        </th>
      </tr>
    </thead>
  );
}

HeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HeaderRow);
