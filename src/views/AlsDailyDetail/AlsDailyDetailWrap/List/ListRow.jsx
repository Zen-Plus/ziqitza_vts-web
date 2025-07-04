import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { isNullOrUndefined } from '../../../../../../common/helpers/collectionUtils';
import { convertMillsToHHMMSS } from '../../../../common/helpers/collectionUtils';
import dayjs from 'dayjs';

function displayDateTime(millis){
  return dayjs(millis).format('DD-MMM-YYYY : hh:mm a');
}

function ListRow({
  intl,
  index,
  details: vehicleDetails,
  getDocumentsData,
}) {
  const backGroundClass = (index % 2) !== 0 ? 'BG--Orange' : '';

  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center' }}>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.sno) ? vehicleDetails.sno : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.districtName) ? vehicleDetails.districtName : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.dialerCallId) ? vehicleDetails.dialerCallId : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.callerName) ? vehicleDetails.callerName : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.callerPhoneNumber) ? vehicleDetails.callerPhoneNumber : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.callLandDateTime) ? displayDateTime(vehicleDetails.callLandDateTime) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.callConnectionTime) ? displayDateTime(vehicleDetails.callConnectionTime) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.callType) ? vehicleDetails.callType : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.callDropped) ? vehicleDetails.callDropped : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.uacCall) ? vehicleDetails.uacCall : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.callBackDateTime) ? displayDateTime(vehicleDetails.callBackDateTime) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.callEndDateTime) ? displayDateTime(vehicleDetails.callEndDateTime) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.ringDuration) ? convertMillsToHHMMSS(vehicleDetails.ringDuration) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.callDuration) ? convertMillsToHHMMSS(vehicleDetails.callDuration) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.callerCategory) ? vehicleDetails.callerCategory : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.patientEmergencyCategory) ? vehicleDetails.patientEmergencyCategory : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.chiefComplaint) ? vehicleDetails.chiefComplaint : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.alsRequired) ? vehicleDetails.alsRequired : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.patientName) ? vehicleDetails.patientName : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.patientAge) ? vehicleDetails.patientAge : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.patientGender) ? vehicleDetails.patientGender : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.identityProofType) ? vehicleDetails.identityProofType : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.identityProofNumber) ? vehicleDetails.identityProofNumber : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.patientPhoneNumber) ? vehicleDetails.patientPhoneNumber : (
          !isNullOrUndefined(vehicleDetails.callerPhoneNumber) ? vehicleDetails.callerPhoneNumber : 'NA'
        )}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.emergencyLocationCityName) ? vehicleDetails.emergencyLocationCityName : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.patientAddress) ? vehicleDetails.patientAddress : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.emergencyLocationAddressType) ? vehicleDetails.emergencyLocationAddressType : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.emergencyLocationHospitalName) ? vehicleDetails.emergencyLocationHospitalName : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.jobNumber) ? vehicleDetails.jobNumber : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.emergencyLocationLocationType) ? vehicleDetails.emergencyLocationLocationType : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.vehicleRegistrationNumber) ? vehicleDetails.vehicleRegistrationNumber : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.parkingLocationLatLong) ? vehicleDetails.parkingLocationLatLong : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.vehicleDistrict) ? vehicleDetails.vehicleDistrict : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.emergencyLocationLatLong) ? vehicleDetails.emergencyLocationLatLong : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.dropLocationHospitalName) ? vehicleDetails.dropLocationHospitalName : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.dropLocationHospitalType) ? vehicleDetails.dropLocationHospitalType : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.dropLocationDistrict) ? vehicleDetails.dropLocationDistrict : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.dropLocationLatLong) ? vehicleDetails.dropLocationLatLong : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.jobResolutionReason) ? vehicleDetails.jobResolutionReason : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.dispatchDateTime) ? displayDateTime(vehicleDetails.dispatchDateTime) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.jobStartDateTime) ? displayDateTime(vehicleDetails.jobStartDateTime) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.jobStartKm) ? vehicleDetails.jobStartKm : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.onSceneDateTime) ? displayDateTime(vehicleDetails.onSceneDateTime) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.onSceneKm) ? vehicleDetails.onSceneKm : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.onBoardDateTime) ? displayDateTime(vehicleDetails.onBoardDateTime) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.reachedDropLocationDateTime) ? displayDateTime(vehicleDetails.reachedDropLocationDateTime) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.reachedDropLocationKm) ? vehicleDetails.reachedDropLocationKm : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.patientDroppedDateTime) ? displayDateTime(vehicleDetails.patientDroppedDateTime) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.backToBaseDateTime) ? displayDateTime(vehicleDetails.backToBaseDateTime) : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.tripDistanceType) ? vehicleDetails.tripDistanceType : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.tripDistance) ? vehicleDetails.tripDistance : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.emtCode) ? vehicleDetails.emtCode : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.emtName) ? vehicleDetails.emtName : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.emtPhoneNumber) ? vehicleDetails.emtPhoneNumber : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        {!isNullOrUndefined(vehicleDetails.callCategory) ? vehicleDetails.callCategory : 'NA'}
      </td>
      <td className="ListMaster__Row__Item">
        <div
          className={`${vehicleDetails.pcfDocumentUpload === 'Uploaded' ? 'Cursor-Pointer Warmblue-Text Text-Decoration-Underline' : 'Cursor-Default'}`}
          onClick={() => {
            if (vehicleDetails.pcfDocumentUpload === 'Uploaded') {
              getDocumentsData(vehicleDetails.jobId);
            }
          }}
          onKeyPress={() => {}}
          role="button"
          tabIndex={0}
        >
          {intl.formatMessage({ id: 'label.view' })}
        </div>
      </td>
    </tr>
  );
}

ListRow.defaultProps = {
  details: {},
  getDocumentsData: () => {},
};

ListRow.propTypes = {
  intl: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  details: PropTypes.object,
  getDocumentsData: PropTypes.func,
};

export default injectIntl(ListRow);
