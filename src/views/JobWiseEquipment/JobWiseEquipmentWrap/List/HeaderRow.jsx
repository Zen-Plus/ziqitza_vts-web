import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function HeaderRow({ intl }) {
  return (
    <thead>
      <tr className="ListMaster__Header Font--S16 NeutralDark Bg-Head-Gray Border-Gray">
        <th className="ListMaster__Header__Item Border-Gray">
          {intl.formatMessage({ id: 'label.sNo' })}
        </th>
        <th className="ListMaster__Header__Item Border-Gray">
          {intl.formatMessage({ id: 'label.jobID' })}
        </th>
        <th className="ListMaster__Header__Item Border-Gray">
          {intl.formatMessage({ id: 'label.jobresolution' })}
        </th>
        <th className="ListMaster__Header__Item Border-Gray">
          {intl.formatMessage({ id: 'label.callLandDateAndTime' })}
        </th>
        <th className="ListMaster__Header__Item Border-Gray">
          {intl.formatMessage({ id: 'label.vehicleRegistrationNumber' })}
        </th>
        <th className="ListMaster__Header__Item Border-Gray">
          {intl.formatMessage({ id: 'label.patientNameAndAge' })}
        </th>
        <th className="ListMaster__Header__Item Border-Gray">
          {intl.formatMessage({ id: 'label.equipmentsUsed' })}
        </th>
      </tr>
    </thead>
  );
}

HeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HeaderRow);
