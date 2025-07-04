import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { ButtonCustom } from '../../../components/Button';

function SubHeadFilter({ onBackClick, intl, onJobWiseEquipmentClick }) {
  return (
    <>
      <div className="d-flex">
        <ButtonCustom
          className="Box--Shadow Font--S18 Bg-Head-Gray BorderButton"
          onClick={() => { onBackClick(); }}
          labelText={intl.formatMessage({ id: 'label.back' })}
          labelClassName="NeutralDark"
          type="link"
        />
      </div>
      <ButtonCustom
        className="Box--Shadow Font--S18 Bg-Head-Gray BorderButton"
        onClick={() => { onJobWiseEquipmentClick(); }}
        labelText={intl.formatMessage({ id: 'label.jobWiseEquipment' })}
        type="link"
        labelClassName="NeutralDark"
      />
    </>
  );
}

SubHeadFilter.defaultProps = {
  onBackClick: () => {},
  onJobWiseEquipmentClick: () => {},
};

SubHeadFilter.propTypes = {
  onBackClick: PropTypes.func,
};

export default injectIntl(SubHeadFilter);
