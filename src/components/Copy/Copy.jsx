import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { copyToClipboard } from '../../common/helpers/clipboard';

function Copy({ id, className, pushNotification }) {
  function handleClick(event) {
    event.preventDefault();
    copyToClipboard(id, pushNotification);
  }
  function handleKeyPress(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      copyToClipboard(id, pushNotification);
    }
  }
  return (
    <span
      className={className}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex="0"
      style={{
        outline: 'none',
        cursor: 'pointer',
      }}
    >
      <Icon name="copy" />
    </span>
  );
}

export default Copy;

Copy.defaultProps = {
  className: '',
};

Copy.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  pushNotification: PropTypes.func.isRequired,
};
