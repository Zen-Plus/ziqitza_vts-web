import React from 'react';
import PropTypes from 'prop-types';
import TrackIcon from './TrackIcon';
import { cloneDeep } from '../../../../../common/helpers/collectionUtils';

function TrackIcons({ details }) {
  let _updatedDetails = cloneDeep(details);
  _updatedDetails = _updatedDetails ? _updatedDetails.reverse() : [];
  let _milestoneIndex = _updatedDetails.findIndex((item) => item.reportedDateTime !== null);

  if (_milestoneIndex < 0) {
    _milestoneIndex = 0;
  } else {
    _milestoneIndex = _updatedDetails.length - _milestoneIndex;
  }
  const trackIcons = details && details.map((item, index) => (
    <TrackIcon
      key={item.id}
      title={item.milestone}
      time={item.reportedDateTime}
      index={index}
      milestone={_milestoneIndex}
    />
  ));

  return (
    <div className="Flex" style={{ justifyContent: 'space-between' }}>
      {trackIcons}
    </div>
  );
}

TrackIcons.propTypes = {
  details: PropTypes.object.isRequired,
};

export default TrackIcons;
