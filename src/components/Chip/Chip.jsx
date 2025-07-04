import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

export default function Chip({ value, onDeselect }) {
  function handleDeselect() {
    onDeselect(value);
  }
  function handleKeyPress(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      onDeselect(value);
    }
  }
  return (
    <span className="Chip">
      <span className="ChipName">{value.name}</span>
      <span
        onClick={handleDeselect}
        role="button"
        tabIndex={0}
        className="Cursor-Pointer"
        style={{ outline: 'none' }}
        onKeyPress={handleKeyPress}
      >
        <Icon name="cross" strokeWidth="2px" style={{ height: '12px', width: '12px', marginLeft: '10px' }} />
      </span>
    </span>
  );
}

Chip.propTypes = {
  value: PropTypes.object.isRequired,
  onDeselect: PropTypes.func.isRequired,
};
