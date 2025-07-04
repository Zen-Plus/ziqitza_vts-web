import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Slider from '../../Slider';

function ListActionSlider({ restProps, sliderValue, intl }) {
  return (
    <div className="ListActionSlider Flex" style={{ flex: '0 0 273px' }}>
      <Slider
        {...restProps}
      />
      <span className="Mt-12 Ml-5 Font--S12">
        {intl.formatMessage({ id: 'label.radius' })}
        {' : '}
        {intl.formatMessage({ id: 'label.mtr' }, { mtr: sliderValue })}
      </span>
    </div>
  );
}

ListActionSlider.propTypes = {
  restProps: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  sliderValue: PropTypes.number.isRequired,
};

export default injectIntl(ListActionSlider);
