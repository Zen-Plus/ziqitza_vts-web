import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function HeaderRow({ intl }) {
  return (
    <thead>
      <tr className="ListMaster__Header Font--S16 NeutralDark" style={{ background: "#F0F0F0" }}>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.sNo' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.offRoadId' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.vehicleRegistrationNo' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.baseLocation' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.district' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.offRoadRequest' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.vehicleType' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.offRoadDateTime' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.expectedOnRoadDateTime' })}
        </th>
      </tr>
    </thead>
  );
}

HeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HeaderRow);
