import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { ButtonCustom } from '../../../../components/Button';

function SubHeadFilter({ onBackClick, intl }) {
  return (
    <>
      <div className="d-flex">
        <ButtonCustom
          className="Box--Shadow Font--S18 Border-Gray"
          onClick={() => { onBackClick(); }}
          labelText={intl.formatMessage({ id: 'label.back' })}
          type="link"
          labelClassName="NeutralDark"
        />
      </div>
    </>
  );
}

SubHeadFilter.defaultProps = {
  onBackClick: () => {},
};

SubHeadFilter.propTypes = {
  onBackClick: PropTypes.func,
};

export default injectIntl(SubHeadFilter);
