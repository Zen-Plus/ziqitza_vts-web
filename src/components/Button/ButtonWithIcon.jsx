import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Icon from '../Icon';

export default function ButtonWithIcon({
  labelText,
  iconName,
  iconStyle,
  labelClassName,
  className,
  ...restprops
}) {
  return (
    <Button
      type="plain"
      className={`ButtonWithIcon ${className}`}
      {...restprops}
    >
      <span className="ButtonWithIcon__Icon" style={iconStyle}>
        <Icon name={iconName} />
      </span>
      {
        !!labelText
        && (
        <span className={labelClassName}>
          {labelText}
        </span>
        )
      }
    </Button>
  );
}

ButtonWithIcon.defaultProps = {
  labelText: '',
  iconStyle: {},
  className: '',
  labelClassName: '',
};

ButtonWithIcon.propTypes = {
  labelText: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  iconStyle: PropTypes.object,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
};
