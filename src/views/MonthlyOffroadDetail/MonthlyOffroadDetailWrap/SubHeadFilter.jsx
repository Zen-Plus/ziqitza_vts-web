import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { ButtonCustom } from '../../../components/Button';

function SubHeadFilter({
  onBackClick, onHomeClick, onOffRoadClick, intl,
}) {
  return (
    <>

      <div className="col-4">
        <ButtonCustom
          className="Box--Shadow Font--S18"
          onClick={() => { onHomeClick(); }}
          labelText={intl.formatMessage({ id: 'label.home' })}
          type="link"
        />
      </div>

      <div className="col-4">
        <ButtonCustom
          className="Box--Shadow Font--S18"
          onClick={() => { onBackClick(); }}
          labelText={intl.formatMessage({ id: 'label.back' })}
          type="link"
        />
      </div>
      <div className="col-4">
        <ButtonCustom
          className="Box--Shadow Font--S18"
          onClick={() => { onOffRoadClick(); }}
          labelText={intl.formatMessage({ id: 'label.offRoadDetail' })}
          type="link"
        />
      </div>

    </>
  );
}

SubHeadFilter.defaultProps = {
  onBackClick: () => { },
  onHomeClick: () => { },
  onOffRoadClick: () => { },

};

SubHeadFilter.propTypes = {
  intl: PropTypes.object.isRequired,
  onBackClick: PropTypes.func,
  onHomeClick: PropTypes.func,
  onOffRoadClick: PropTypes.func,

};

export default injectIntl(SubHeadFilter);
