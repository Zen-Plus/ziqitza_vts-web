import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../CheckBox';

export default function DropListItemMulti({
  value, isChecked, onSelect, onDeselect, index,
}) {
  function handleSelectDeselect(event) {
    if (event.target.checked) {
      onSelect(value);
    } else {
      onDeselect(value);
    }
  }
  return (
    <CheckBox
      checked={isChecked}
      className={`DropListItemMulti ${(index % 2) ? 'Bg-Gray' : ''}`}
      onChange={handleSelectDeselect}
    >
      {value.name}
    </CheckBox>
  );
}

DropListItemMulti.propTypes = {
  value: PropTypes.object.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};
