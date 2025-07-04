import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { ButtonCustom } from '../../../../components/Button';

function SubHeadFilter({ onBackClick, intl, onNonAvailabilityOfMedicinesClick }) {
  return (
    <>
      <div>
        <ButtonCustom
          className="Box--Shadow Font--S18"
          onClick={() => { onBackClick(); }}
          labelText={intl.formatMessage({ id: 'label.back' })}
          type="link"
        />
      </div>
      {/* button is commented for up */}
      {/* <div>
        <ButtonCustom
          className="Box--Shadow Font--S18"
          onClick={() => { onNonAvailabilityOfMedicinesClick(); }}
          labelText={intl.formatMessage({ id: 'label.nonAvailabilityOfMedicines' })}
          type="link"
        />
      </div> */}
    </>
  );
}

SubHeadFilter.defaultProps = {
  onBackClick: () => {},
  onNonAvailabilityOfMedicinesClick: () => {},
};

SubHeadFilter.propTypes = {
  onBackClick: PropTypes.func,
  onNonAvailabilityOfMedicinesClick: PropTypes.func,
};

export default injectIntl(SubHeadFilter);
