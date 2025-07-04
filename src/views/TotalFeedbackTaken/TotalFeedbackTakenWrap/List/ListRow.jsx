import React from 'react';
import PropTypes from 'prop-types';
import { isNullOrUndefined, displayDateTime, convertMillsToHHMMSS } from '../../../../common/helpers/collectionUtils';

function ListRow({
  index,
  details: feedbackTakenDetails,
}) {
  return (
    <tr className={`ListMaster__Row`} style={{ alignItems: 'center', background: 'white' }}>
      <td className="ListMaster__Row__Item Border">
        {isNullOrUndefined(feedbackTakenDetails.call_connected_time) ? 'NA' : displayDateTime(feedbackTakenDetails.call_connected_time)}
      </td>
      <td className="ListMaster__Row__Item Border">
        {isNullOrUndefined(feedbackTakenDetails.call_id) ? 'NA' : feedbackTakenDetails.call_id}
      </td>
      <td className="ListMaster__Row__Item Border">
        {isNullOrUndefined(feedbackTakenDetails.call_type) ? 'NA' : feedbackTakenDetails.call_type}
      </td>
      <td className="ListMaster__Row__Item Border">
        {isNullOrUndefined(feedbackTakenDetails.caller_phone) ? 'NA' : feedbackTakenDetails.caller_phone}
      </td>
      <td className="ListMaster__Row__Item Border">
        {isNullOrUndefined(feedbackTakenDetails.questionMenuInput) ? 'NA' : feedbackTakenDetails.questionMenuInput}
      </td>
      <td className="ListMaster__Row__Item Border">
        {isNullOrUndefined(feedbackTakenDetails.ivrTime) ? 'NA' : convertMillsToHHMMSS(Number(feedbackTakenDetails.ivrTime * 1000))}
      </td>
      <td className="ListMaster__Row__Item Border">
        {isNullOrUndefined(feedbackTakenDetails.hangupCauseDescription) ? 'NA' : feedbackTakenDetails.hangupCauseDescription}
      </td>
      <td className="ListMaster__Row__Item Border">
        {isNullOrUndefined(feedbackTakenDetails.systemDisposition) ? 'NA' : feedbackTakenDetails.systemDisposition}
      </td>
      <td className="ListMaster__Row__Item Border">
        {isNullOrUndefined(feedbackTakenDetails.jobId) ? 'NA' : feedbackTakenDetails.jobId}
      </td>
    </tr>
  );
}

ListRow.defaultProps = {
  details: {},
};

ListRow.propTypes = {
  index: PropTypes.number.isRequired,
  details: PropTypes.object,
};

export default ListRow;
