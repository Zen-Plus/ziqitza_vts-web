import React from 'react';
import PropTypes from 'prop-types';

export default function DropListItem({
  value, onSelect, index,
}) {
  function handleClick() {
    onSelect(value);
  }
  function handleKeyPress(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      onSelect(value);
    }
  }
  return (
    <div
      className={`DropListItem  Cursor-Pointer ${(index % 2) ? 'Bg-Gray' : ''}`}
      onClick={handleClick}
      role="button"
      onKeyPress={handleKeyPress}
      tabIndex={0}
    >
      {value.name ? value.name : value}
    </div>
  );
}

DropListItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onSelect: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
