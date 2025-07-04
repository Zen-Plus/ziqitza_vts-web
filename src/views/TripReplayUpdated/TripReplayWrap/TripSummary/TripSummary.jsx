import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Input from '../../../../components/Input';
import { convertMeter } from '../../../../common/helpers/commonUtils';
import Icon from '../../../../components/Icon';

const VtsProcessingTextColor = {
  COMPLETED: 'Green',
  DISCREPANT: 'Red',
};

const VtsProcessingSymbol = {
  COMPLETED: 'green-dot',
  DISCREPANT: 'red-dot-small',
};

function TripSummary({ intl, details, isSearchSt }) {
  return (
    <div className="VtsTripSummary Flex Flex-Direction-Column Box--Shadow">
      <div className="TripSummaryHeading Font--S20 Font--WB Ml-10">
        {intl.formatMessage({ id: 'label.tripSummary' })}
      </div>
      <div className="Divider-Bottom-Gray90 Mt-10 Ml-10" />
      <div className="TripSummaryDetials Flex Form-Wrap Mt-10">
        <div className="Field">
          <Input
            labelText={intl.formatMessage({ id: `${isSearchSt ? 'label.ticketRaisedOn' : 'label.startedOn' }` })}
            value={(details.startedOn && dayjs(details.startedOn).format('DD MMM YYYY | hh:mm a')) || 'NA'}
            isReadonly
          />
        </div>
        <div className="Field">
          <Input
            labelText={intl.formatMessage({ id: `${isSearchSt ? 'label.ticketClosedOn' : 'label.endedOn'}` })}
            value={(details.endedOn && dayjs(details.endedOn).format('DD MMM YYYY | hh:mm a')) || 'NA'}
            isReadonly
          />
        </div>
        <div className={`Field VtsProcessing ${VtsProcessingTextColor[details.vtsProcessingStatus]}`} style={{ position: 'relative' }}>
          <Input
            labelText={intl.formatMessage({ id: 'label.vtsProcessingStatus' })}
            value={(details && details.vtsProcessingStatus) || 'NA'}
            isReadonly
          />
          <div style={{ position: 'absolute', top: '32px', left: 0,  }}>
            <Icon name={`${VtsProcessingSymbol[details.vtsProcessingStatus] || 'red-dot'}`} />
          </div>

        </div>
        <div className="Field">
          <Input
            labelText={intl.formatMessage({ id: 'label.packetsReceived' })}
            value={(details && (details.packetReceived !== null ? details.packetReceived : 'NA'))}
            isReadonly
          />
        </div>
        <div className="Field">
          <Input
            labelText={intl.formatMessage({ id: 'label.packetsLost' })}
            value={(details && (details.packetLost !== null ? details.packetLost : 'NA'))}
            isReadonly
          />
        </div>
        <div className="Field">
          <Input
            labelText={intl.formatMessage({ id: 'label.distanceCovered' })}
            value={details && details.vtsProcessingStatus === 'DISCREPANT' ? 'NA' : ((details && details.distanceCovered !== null && convertMeter(details.distanceCovered, 'km', 2)) || 'NA')}
            isReadonly
          />
        </div>
      </div>
    </div>
  );
}

TripSummary.defaultProps = {
  details: {},
  isSearchSt: true,
};

TripSummary.propTypes = {
  intl: PropTypes.object.isRequired,
  details: PropTypes.object,
  isSearchSt: PropTypes.bool,
};

export default injectIntl(TripSummary);
