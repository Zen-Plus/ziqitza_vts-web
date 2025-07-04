import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon';
import { convertMillsToHHMMSS } from '../../../../common/helpers/collectionUtils';
import SubListRow from './SubListRow';

function ListRow({
  index,
  details: vehicleDetails,
}) {
  const [isListRowExpanded, setIsListRowExpanded] = useState(false);
  const backGroundClass = (index % 2) !== 0 ? 'BG--Orange' : '';

  const isDatesList = vehicleDetails.dates && vehicleDetails.dates.length;

  function handleClickExpandIcon() {
    setIsListRowExpanded((pre) => !pre);
  }

  return (
    <>
      <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center' }}>
        <td className="ListMaster__Row__Item">
          <div
            role="button"
            onClick={handleClickExpandIcon}
            onKeyPress={() => { }}
            tabIndex={0}
            style={{
              pointerEvents: isDatesList ? 'all' : 'none',
              opacity: isDatesList ? 1 : 0.5,
            }}
          >
            {isListRowExpanded ? <Icon name="collapse" /> : <Icon name="expand" />}
          </div>
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {vehicleDetails.id}
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {vehicleDetails.districtName}
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {vehicleDetails.date}
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {vehicleDetails.totalCalls}
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {vehicleDetails.avgAmbulance}
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {vehicleDetails.offRoadAmbulance}
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {vehicleDetails.tripType}
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {vehicleDetails.totalJobs}
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {vehicleDetails.unAvailedJobs}
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {vehicleDetails.availedJobs}
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {vehicleDetails.totalPatients}
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {vehicleDetails.totalKms}
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {vehicleDetails.avgKms}
        </td>
        <td className="ListMaster__Row__Item Ml-10">
          {convertMillsToHHMMSS(vehicleDetails.avgResponseTime)}
        </td>
      </tr>
      {isListRowExpanded && (
        <>
          {!!vehicleDetails.dates?.length &&
            vehicleDetails.dates.map((item, _index) => (
              <SubListRow
                index={_index}
                details={item}
                listLength={vehicleDetails.dates.length}
              />
            ))
          }
        </>
      )}
    </>
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
