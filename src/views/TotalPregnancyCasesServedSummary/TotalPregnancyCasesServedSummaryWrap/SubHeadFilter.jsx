import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { ButtonCustom } from '../../../components/Button';

function SubHeadFilter({ onBackClick, onMonthlyOffRoadClick, intl, onSummaryClick }) {
  return (
    <>
      <div>
        <ButtonCustom
          className="Box--Shadow Font--S18 BorderButton"
          onClick={() => { onBackClick(); }}
          labelText={intl.formatMessage({ id: 'label.back' })}
          type="link"
          style={{ color: '#131313'}}
        />
      </div>
      <div>
        {/* <ButtonCustom
          className="Box--Shadow Font--S18 BorderButton"
          onClick={() => { onMonthlyOffRoadClick(); }}
          labelText={intl.formatMessage({ id: 'label.monthlyOffRoad' })}
          type="link"
          style={{ color: '#131313'}}
        /> */}
      </div>
      {/* <div>
        <ButtonCustom
          className="Box--Shadow Font--S18 BorderButton"
          onClick={() => { onSummaryClick(); }}
          labelText={intl.formatMessage({ id: 'label.summary' })}
          type="link"
          style={{ color: '#131313'}}
        />
      </div> */}
    </>
  );
}

SubHeadFilter.defaultProps = {
  onBackClick: () => { },
  onMonthlyOffRoadClick: () => { },
  onSummaryClick: () => { },
};

SubHeadFilter.propTypes = {
  intl: PropTypes.object.isRequired,
  onBackClick: PropTypes.func,
  onMonthlyOffRoadClick: PropTypes.func,
  onSummaryClick: PropTypes.func,
};

export default injectIntl(SubHeadFilter);
