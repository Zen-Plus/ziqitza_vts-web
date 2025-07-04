import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Icon from '../../../../../components/Icon';

function TrackIcon({
  title, time, milestone, index,
}) {
  return (
    <>
      <div className="TextAlign--Center Font--S12 Ambulance-Icon">
        <div>
          {title}
        </div>
        <div
          className={`Ambulance-Bg TextAlign--Center 
          ${index >= milestone ? 'Shadow' : 'Dashed-Border'}`}
        >
          {
            index !== 0
              ? <div className={`${index === milestone ? 'Dashed-Line__Red' : 'Dashed-Line__Black'}`} />
              : null
          }
          <div className="Ambulance-Icon-Img">
            <Icon
              name={
                index === milestone
                  ? 'red-ambulance'
                  : ((index < milestone && 'dark-ambulance')
                    || 'light-ambulance')
              }
            />
          </div>
        </div>
        <div className="TimeContainer">
          {time ? dayjs(time).format('DD MMM YYYY, hh:mma') : 'NA' }
        </div>
      </div>
    </>
  );
}


TrackIcon.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  milestone: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default TrackIcon;
