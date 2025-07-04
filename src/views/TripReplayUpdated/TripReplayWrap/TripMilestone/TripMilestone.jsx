import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { injectIntl } from 'react-intl';
import { convertMeter } from '../../../../common/helpers/commonUtils';
import { tripMilestoneValues } from '../util';


const sourceMilestoneValues = {
  GPS: 'GPS/Job Closure'
};

function TripMilestone({ details, intl }) {
  return (
    <div className="VtsTripMilestone Flex Flex-Direction-Column Box--Shadow">
      <div className="TripMilestoneHeading Font--S20 Font--WB">
        {intl.formatMessage({ id: 'label.tripMilestones' })}
      </div>
      <div className="Divider-Bottom-Gray90 Mt-5" style={{ marginBottom: '10px' }} />
      <div className=" Flex Font--S14 TripMilestoneDetails_Header">
        <div className="TripMilestoneDetails_Header_Item" style={{ flex: '1' }}>{intl.formatMessage({ id: 'label.milestone' })}</div>
        <div className="Ml-10 TripMilestoneDetails_Header_Item" style={{ flex: '1' }}>{intl.formatMessage({ id: 'label.dateAndTime' })}</div>
        <div className="Ml-10 TripMilestoneDetails_Header_Item" style={{ flex: '3' }}>{intl.formatMessage({ id: 'label.location' })}</div>
        <div className="Ml-10 TripMilestoneDetails_Header_Item" style={{ flex: '1' }}>{intl.formatMessage({ id: 'label.distanceTravelled' })}</div>
        <div className="Ml-10 TripMilestoneDetails_Header_Item" style={{ flex: '1.5' }}>{intl.formatMessage({ id: 'label.latLong' })}</div>
      </div>
      <div className="TripMilestoneDetails Mt-5">
        {details.map((detail) => (
          <div className=" Flex Font--S14 TripMilestoneDetails_Row">
            <div className="Font--WB" style={{ flex: '1' }}>
              {(detail.supportTicketMilestone && tripMilestoneValues[detail.supportTicketMilestone])
                || (detail.milestone && tripMilestoneValues[detail.milestone])  || 'NA'}
            </div>
            <div className="Ml-10" style={{ flex: '1' }}>
              {(detail.dateTime && dayjs(detail.dateTime).format('DD MMM YYYY | hh:mm a')) || 'NA'}
            </div>
            <div className="Ml-10" style={{ flex: '3' }}>
              {detail.location || 'NA'}
            </div>
            <div className="Ml-10" style={{ flex: '1' }}>
              {(detail.km && convertMeter(detail.km, 'km', 2))  || 'NA'}
            </div>
            <div className="Ml-10" style={{ flex: '1.5' }}>
              {`${detail.latitude || 'NA'}/${detail.longitude || 'NA'}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

TripMilestone.defaultProps = {
  details: [],
};

TripMilestone.propTypes = {
  details: PropTypes.array,
};

TripMilestone.propTypes = {
  intl: PropTypes.object.isRequired,
  details: PropTypes.array,
};

export default injectIntl(TripMilestone);
