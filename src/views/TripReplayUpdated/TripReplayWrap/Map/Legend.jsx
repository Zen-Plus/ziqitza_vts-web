import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Icon from '../../../../components/Icon';
import useCustomState from '../../../../common/hooks/useCustomState';

function Legend({ intl, isSearchFuel }) {
  const [legendConfig, setLegendConfig] = useCustomState({ isLegendOpen: false });

  return (
    <div className="VtsTripReplayLegend">
      {!legendConfig.isLegendOpen
        && (
        <div
          className="Flex legend-i-icon"
          onClick={() => setLegendConfig({ isLegendOpen: true })}
        >
          <Icon name="info" />
        </div>
        )}
      {legendConfig.isLegendOpen
        && (
        <div className="legend-body-wrap">
          <div className="legend-body-head">
            <span>{intl.formatMessage({ id: 'label.info' })}</span>
            <span
              onClick={() => setLegendConfig({ isLegendOpen: false })}
            >
              <Icon name="cross" style={{ cursor: 'pointer' }} />
            </span>
          </div>
          <ul className="legend-body-container-ul">
            <span className="legend-body-items">
              <Icon name="flag" />
              <span>{intl.formatMessage({ id: 'label.tripStart' })}</span>
            </span>
            {!isSearchFuel &&
              <>
                <span className="legend-body-items">
                <Icon name="star" />
                <span>{intl.formatMessage({ id: 'label.pickup' })}</span>
                </span>
                <span className="legend-body-items">
                  <Icon name="triangle" />
                  <span>{intl.formatMessage({ id: 'label.dropOff' })}</span>
                </span>
              </>
            }
            <span className="legend-body-items">
              <Icon name="pin" />
              <span>{intl.formatMessage({ id: 'label.tripComplete' })}</span>
            </span>
          </ul>
        </div>
        )}
    </div>
  );
}

Legend.propTypes = {
  intl: PropTypes.object.isRequired,
  isSearchFuel: PropTypes.bool.isRequired,
};

export default injectIntl(Legend);
