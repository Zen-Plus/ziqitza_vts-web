import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function HeaderRow({ intl }) {
  return (
    <thead>
      <tr className="ListMaster__Header Font--S16 NeutralDark HeaderBackground">
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.callDateAndTime' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.callID' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.campaignName' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.phoneNumber' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.questionMenuInputByCustomer' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.IVRTime' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.hangupCauseCode' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.systemDiposition' })}
        </th>
        <th className="ListMaster__Header__Item Border">
          {intl.formatMessage({ id: 'label.jobID' })}
        </th>
      </tr>
    </thead>
  );
}

HeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HeaderRow);
