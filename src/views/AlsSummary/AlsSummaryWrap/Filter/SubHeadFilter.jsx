import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { ButtonCustom } from '../../../../components/Button';

function SubHeadFilter({ onBackClick, intl, onAlsDailyClick }) {
  return (
    <div className="d-flex">
      <ButtonCustom
        className="Box--Shadow Font--S18"
        onClick={() => { onAlsDailyClick(); }}
        labelText={intl.formatMessage({ id: 'label.alsDailyData' })}
        type="link"
      />
      <ButtonCustom
        className="Box--Shadow Font--S18"
        onClick={() => { onBackClick(); }}
        labelText={intl.formatMessage({ id: 'label.back' })}
        type="link"
      />
    </div>
  );
}

SubHeadFilter.defaultProps = {
  onBackClick: () => {},
  onAlsDailyClick: () => {},
};

SubHeadFilter.propTypes = {
  onBackClick: PropTypes.func,
  onAlsDailyClick: PropTypes.func,
};

export default injectIntl(SubHeadFilter);
