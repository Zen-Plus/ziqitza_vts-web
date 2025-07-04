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
          {intl.formatMessage({ id: 'label.beneficiaryDistrict' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.callID' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.callerName' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.phoneNumber' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.callLandTime' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.callConnectionTime' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.callTypes' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.callDroppedYN' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.uacCall' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.callBackTime' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.callEndTime' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.ringDuration' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.callDuration' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.callerCategory' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.patientEmergencyContact' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.chiefComplaint' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.alsRequireYN' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.beneficiaryName' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.beneficiaryAge' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.beneficiarySex' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.beneficiaryIdType' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.beneficiaryIdNo' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.beneficiaryContactNo' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.beneficiaryBlockCity' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.beneficiaryAddressWithPinCode' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.stateOfPickUp' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.pickUpLocationDetails' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.tripIdJobId' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.tripTypeRuralUrban' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.ambyNumber' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.ambyBaseLocationLatLng' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.ambyDistrict' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.locationPickUpLatLong' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.hspDestinationName' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.hspDestinationType' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.hspDestinationDistrict' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.hspDestinationDistrictLatLng' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.standardRemarks' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.ambulanceAssignmentTime' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.departureTime' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.departureOdometer' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.pickUpPointReachTime' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.pickUpPointOdoMeter' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.pickUpPointDepartureTime' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.destinationReachTime' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.destinationOdometer' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.destinationDepartureTime' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.backToBaseReachTime' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.tripDistTypeManualGps' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.tripDistance' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.emtId' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.emtName' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.emtContact' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.callCategory' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.pcfOrHaf' })}
        </th>
      </tr>
    </thead>
  );
}

ListHeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ListHeaderRow);
