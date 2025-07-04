import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function HeaderRow({ intl }) {
  const labels = [
    'sNo',
    'callDate',
    'jobId',
    'emergencyType',
    'category',
    'primaryCompliant',
    'status',
    'area',
    'vehicleRegistrationNo',
    'vechicleType',
    'parkingLocation',
    'vehicleDistrict',
    'dispatchedDateTime',
    'pickupHospitalName',
    'dropoffHospitalName',
    'noOfPatient',
    'patientName1PatientName2Etc',
    'gender1Gender2Etc',
    'patientPhoneNo',
    'patientAge',
  ];

  return (
    <thead>
      <tr className="ListMaster__Header Font--S16 NeutralDark" style={{ background: "#F0F0F0" }}>
        {labels.map(name => (
          <th className="ListMaster__Header__Item border">
            {intl.formatMessage({ id: `label.${name}`})}
          </th>
        ))}
      </tr>
    </thead>
  );
}

HeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HeaderRow);
