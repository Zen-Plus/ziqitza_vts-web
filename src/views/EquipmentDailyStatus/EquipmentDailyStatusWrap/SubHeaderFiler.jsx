import React from 'react'
import PropTypes from 'prop-types'
import { ButtonCustom } from '../../../components/Button';
import { injectIntl } from 'react-intl';

function SubHeaderFiler({ onHomeClick, onBackClick, intl}) {
    return (
        <>
        <div>
            <ButtonCustom
                className="Box--Shadow Font--S18"
                onClick={() => { onHomeClick() }}
                labelText={intl.formatMessage({ id: 'label.home' })}
                type="link"
            />
        </div>
        <div>
            <ButtonCustom
                className="Box--Shadow Font--S18"
                onClick={() => { onBackClick() }}
                labelText={intl.formatMessage({ id: 'label.back' })}
                type="link"
            />
        </div>
        </>
    )
}
SubHeaderFiler.defaultProps = {
  onHomeClick: () => {},
  onBackClick: () => {},
};

SubHeaderFiler.propTypes = {
  intl: PropTypes.object.isRequired,
  onHomeClick: PropTypes.func,
  onBackClick: PropTypes.func,
}

export default injectIntl(SubHeaderFiler)
