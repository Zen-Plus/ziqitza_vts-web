import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

export default function SelectedItem({ value, onDeselect, isReadonly }) {
  function handleSelectDeselect() {
    onDeselect(value);
  }
  function handleKeyPress(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      onDeselect(value);
    }
  }
  return (
    <span className="SelectedItem">
      <span className="SelectedItemName">{value.name}</span>
      {
        !isReadonly
        && (
          <span
            onClick={handleSelectDeselect}
            role="button"
            tabIndex={0}
            className="Cursor-Pointer"
            style={{ outline: 'none' }}
            onKeyPress={handleKeyPress}
          >
            <Icon name="cross" strokeWidth="2px" style={{ height: '12px', width: '12px', marginLeft: '10px' }} />
          </span>
        )
      }
    </span>
  );
}

SelectedItem.defaultProps = {
  isReadonly: false,
};

SelectedItem.propTypes = {
  value: PropTypes.object.isRequired,
  onDeselect: PropTypes.func.isRequired,
  isReadonly: PropTypes.bool,
};
