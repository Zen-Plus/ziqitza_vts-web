import React from 'react';
import PropTypes from 'prop-types';

function Logo({ src, alt, ...restProps }) {
  return (
    <img src={src} alt={alt} {...restProps} />
  );
}

Logo.defaultProps = {
  style: {},
};

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  alt: PropTypes.string.isRequired,
};

export default Logo;
