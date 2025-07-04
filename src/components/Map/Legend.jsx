import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Icon from '../Icon';
import { imagesBaseUrl } from '../../common/constants/urls';

function Legend({ intl }) {
  const [isLegendOpen, setLegendOpen] = useState(false);

  return (
    <div className="ZiqitzaVTS">
    <div className="Legend">
      {!isLegendOpen
        && (
          <div
            className="Flex legend-i-icon"
            onClick={() => setLegendOpen(true)}
            onKeyDown={() => setLegendOpen(true)}
            role="button"
            tabIndex={0}
          >
            <Icon name="info" />
          </div>
        )}
      {isLegendOpen
        && (
        <div className="legend-body-wrap">
          <div className="legend-body-head">
            <span>{intl.formatMessage({ id: 'label.info' })}</span>
            <span
              onClick={() => setLegendOpen(false)}
              onKeyDown={() => setLegendOpen(false)}
              role="button"
              style={{ outline: 'none' }}
              tabIndex={0}
            >
              <Icon name="cross" style={{ cursor: 'pointer' }} />
            </span>
          </div>
          <ul className="legend-body-container-ul">
            <span className="legend-body-items">
              <img src={`${imagesBaseUrl}als-unauthorized.svg`} alt="als" className="legend-body-item-img" />
              <span>{intl.formatMessage({ id: 'label.ALS' })}</span>
            </span>
            <span className="legend-body-items">
              <img src={`${imagesBaseUrl}bls-unauthorized.svg`} alt="als" className="legend-body-item-img" />
              <span>{intl.formatMessage({ id: 'label.BLS' })}</span>
            </span>
            <span className="legend-body-items">
              <img src={`${imagesBaseUrl}jsa-unauthorized.svg`} alt="als" className="legend-body-item-img legend-body-item-img-jsa" />
              <span>{intl.formatMessage({ id: 'label.JSA' })}</span>
            </span>
          </ul>
        </div>
        )}
    </div>
    </div>
  );
}

Legend.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Legend);
