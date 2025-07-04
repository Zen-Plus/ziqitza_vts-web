import React from 'react';
import PropTypes from 'prop-types';
import navigation from '../../../NhmDashboard/navigation';
import { convertMillsToHHMMSS } from '../../../../common/helpers/collectionUtils';

function SubListRow({
  index,
  listLength,
  details,
}) {
  const backGroundClass = (index % 2) !== 0 ? 'BG--Orange' : '';
 
  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center' }} style={{
      borderTop: index === 0 ? '10px solid #fff' : '',
      borderBottom: index === listLength - 1 ? '10px solid #fff' : ''
    }}>
      <td colSpan={3} style={{ borderBottomWidth: 0 }} style={{ backgroundColor: 'white', borderBottomWidth: 0 }} />
      <td className="ListMaster__Row__Item Break-All Ml-10">
        {details.date}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-10">
          {details.totalCalls}
        </td>
        <td className="ListMaster__Row__Item Break-All Ml-10">
          {details.avgAmbulance}
        </td>
        <td className="ListMaster__Row__Item Break-All Ml-10">
          {details.offRoadAmbulance}
        </td>
        <td className="ListMaster__Row__Item Break-All Ml-10">
          {details.tripType}
        </td>
        <td className="ListMaster__Row__Item Break-All Ml-10">
          {details.totalJobs}
        </td>
        <td className="ListMaster__Row__Item Break-All Ml-10">
          {details.unAvailedJobs}
        </td>
        <td className="ListMaster__Row__Item Break-All Ml-10">
          {details.availedJobs}
        </td>
        <td className="ListMaster__Row__Item Break-All Ml-10">
          {details.totalPatients}
        </td>
        <td className="ListMaster__Row__Item Break-All Ml-10">
          {details.totalKms}
        </td>
        <td className="ListMaster__Row__Item Break-All Ml-10">
          {details.avgKms}
        </td>
        <td className="ListMaster__Row__Item Break-All Ml-10">
          {convertMillsToHHMMSS(details.avgResponseTime)}
        </td>
    </tr>
  );
}

SubListRow.defaultProps = {
  details: {},
  setNhmDashboardView: () => { },
  dailyStatusProps: {},
};

SubListRow.propTypes = {
  index: PropTypes.number.isRequired,
  listLength: PropTypes.number.isRequired,
  details: PropTypes.object,
  setNhmDashboardView: PropTypes.func,
  dailyStatusProps: PropTypes.object,
};

export default SubListRow;
