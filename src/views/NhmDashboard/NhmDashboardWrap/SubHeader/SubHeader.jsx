import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Logo from '../../../../components/Logo';

function SubHeader({
  isDateRangeVisible, intl, Component, componentRestProps,
}) {
  return (
    <div className="SubHeaderWrapper NeutralDark">
      <div className="SubHeader">
        <div className="row flex justify-content-between align-items-center">
          <div className="d-flex justify-content-md-start col-md-3 justify-content-center col-12 mb-2 mb-sm-0">
            {/* <Logo src="/upNhmDashboard/zhl-logo.png" className="img img-responsive" style={{ borderRadius: 10 }} /> */}
          </div>
          <div className="font-weight-bold Font--S20 Font--WB text-center col-md-6 col-12">
            {intl.formatMessage({ id: 'label.biharAdvanceLifeSupportAmbulanceServices' })}
          </div>
          <div className="d-flex col-sm-12 col-md-3 col-12 mt-2 mt-sm-0" style={{ justifyContent: 'flex-end' }}>
            {Component
              ? <Component {...componentRestProps} />
              : null}
          </div>
        </div>
        {isDateRangeVisible && (
          <div>
            <div className="Divider mt-2 mt-sm-1" style={{ border: '1px solid #DDDDDD' }} />
            <div className="row d-flex justify-content-end align-items-center font-weight-bold Font--S18">
              <div className="col-12 d-flex justify-content-end mt-2 mt-sm-1">
                {/* {moment().startOf('month').format('DD MMMM YYYY')}
                {' '} */}
                {intl.formatMessage({ id: 'label.today' })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

SubHeader.defaultProps = {
  isDateRangeVisible: false,
  Component: false,
  componentRestProps: {},
};

SubHeader.propTypes = {
  isDateRangeVisible: PropTypes.bool,
  intl: PropTypes.object.isRequired,
  Component: PropTypes.object,
  componentRestProps: PropTypes.object,
};

export default injectIntl(SubHeader);

