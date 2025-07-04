import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Icon from '../../../../components/Icon';
import useCustomState from '../../../../common/hooks/useCustomState';

function Legend({ intl }) {
  const [legendConfig, setLegendConfig] = useCustomState({ isLegendOpen: false });

  return (
    <div className="TripReplayLegend">
      {!legendConfig.isLegendOpen
        && <div className='Flex legend-i-icon' onClick={() => setLegendConfig({ isLegendOpen: true })}>
          <Icon name='info' />
        </div>}
      {legendConfig.isLegendOpen
        && <div className='legend-body-wrap'>
          <div className='legend-body-head'>
            <span>{intl.formatMessage({ id: 'label.info' })}</span>
            <span onClick={() => setLegendConfig({ isLegendOpen: false })}>
              <Icon name='cross' style={{ cursor: 'pointer' }} />
            </span>
          </div>
          <ul className='legend-body-container-ul'>
            <span className='legend-body-items'>
              <Icon name='blue-dot' />
              <span>{intl.formatMessage({ id: 'label.emergencyLocation' })}</span>
            </span>
            <span className='legend-body-items'>
              <Icon name='red-dot' />
              <span>{intl.formatMessage({ id: 'label.dropLocation' })}</span>
            </span>
            <span className='legend-body-items'>
              <Icon name='parking-marker' />
              <span>{intl.formatMessage({ id: 'label.parkingBay' })}</span>
            </span>
            <span className='legend-body-items'>
              <Icon name='orange-square' />
              <span>{intl.formatMessage({ id: 'label.jobStart' })}</span>
            </span>
            <span className='legend-body-items'>
              <Icon name='yellow-dot' />
              <span>{intl.formatMessage({ id: 'label.onBoard' })}</span>
            </span>
            <span className='legend-body-items'>
              <Icon name='purple-dot' />
              <span>{intl.formatMessage({ id: 'label.reachedDropLocation' })}</span>
            </span>
            <span className='legend-body-items'>
              <Icon name='black-dot' />
              <span>{intl.formatMessage({ id: 'label.tripComplete' })}</span>
            </span>
          </ul>
        </div>}
    </div>
  );
}

Legend.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Legend);