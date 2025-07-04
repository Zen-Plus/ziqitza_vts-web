import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { ButtonCustom } from '../../../../components/Button';

function SubHeadFilter({ onBackClick, intl, onHomeClick }) {
  return (
    <div className="d-flex">
      <ButtonCustom
        className="Box--Shadow Font--S18 BorderButton"
        onClick={() => { onHomeClick(); }}
        labelText={intl.formatMessage({ id: 'label.home' })}
        type="link" 
        labelClassName="NeutralDark"
      />
      <ButtonCustom
        className="Box--Shadow Font--S18 BorderButton"
        onClick={() => { onBackClick(); }}
        labelText={intl.formatMessage({ id: 'label.back' })}
        type="link"
        labelClassName="NeutralDark"
      />
    </div>
  );
}

SubHeadFilter.defaultProps = {
  onBackClick: () => {},
  onHomeClick: () => {},
};

SubHeadFilter.propTypes = {
  onBackClick: PropTypes.func,
  onHomeClick: PropTypes.func,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SubHeadFilter);
