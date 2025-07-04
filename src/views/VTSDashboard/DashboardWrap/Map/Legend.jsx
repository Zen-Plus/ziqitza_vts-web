import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Icon from '../../../../components/Icon';
import useCustomState from '../../../../common/hooks/useCustomState';
import { imagesBaseUrl } from '../../../../common/constants/urls';

function Legend({ intl }) {
  const [legendConfig, setLegendConfig] = useCustomState({ isLegendOpen: false });

  return (
    <div className="Legend">
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
              <img src={`${imagesBaseUrl}als-unauthorized.svg`} alt='als' className='legend-body-item-img' />
              <span>{intl.formatMessage({ id: 'label.ALS' })}</span>
            </span>
            <span className='legend-body-items'>
              <img src={`${imagesBaseUrl}bls-unauthorized.svg`} alt='als' className='legend-body-item-img' />
              <span>{intl.formatMessage({ id: 'label.BLS' })}</span>
            </span>
            <span className='legend-body-items'>
              <img src={`${imagesBaseUrl}jsa-unauthorized.svg`} alt='als' className='legend-body-item-img legend-body-item-img-jsa' />
              <span>{intl.formatMessage({ id: 'label.JSA' })}</span>
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