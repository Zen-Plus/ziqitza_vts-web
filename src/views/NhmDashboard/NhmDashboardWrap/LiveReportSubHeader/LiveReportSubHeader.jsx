import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Logo from '../../../../components/Logo';

function SubHeader({ 
  intl, Component, componentRestProps,
}) {
  return (
    <div className="SubHeaderWrapper">
      <div className="SubHeader">
        <div className="row flex justify-content-between align-items-center">
          <div className="d-flex col-sm-12 col-md-3 col-12 mt-2 mt-sm-0" style={{ justifyContent: 'flex-end' }}>
            {Component
              ? <Component {...componentRestProps} />
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

SubHeader.defaultProps = { 
  Component: false,
  componentRestProps: {},
};

SubHeader.propTypes = {
  intl: PropTypes.object.isRequired,
  Component: PropTypes.object,
  componentRestProps: PropTypes.object,
};

export default injectIntl(SubHeader);
