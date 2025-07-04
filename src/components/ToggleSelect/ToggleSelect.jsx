import React from 'react';
import PropTypes from 'prop-types';
import { ButtonCustom } from '../Button';

export default function ToggleSelect({
  values,
  onSelect,
  selected,
  labelText,
  disabled,
}) {
  function getHandleSelect(value) {
    return function handleSelect() {
      onSelect(value);
    };
  }
  function checkSelected(option, selectedVal) {
    if (typeof selectedVal === 'string') {
      return option === selectedVal;
    }
    if (typeof selectedVal === 'object' && selectedVal && selectedVal.name) {
      return selectedVal.name === option.name;
    }
    return false;
  }
  return (
    <div className={`ToggleSelect ${disabled ? 'Disabled' : ''}`}>
      {
        labelText
        && <div className="ToggleSelect__Label">{labelText}</div>
      }
      <div className="ToggleSelect__ButtonContainer Flex">
        {
          values.map((value, index) => (
            <ButtonCustom
              key={JSON.stringify(value)}
              labelText={value}
              onClick={getHandleSelect(value)}
              className={`${checkSelected(value, selected) ? 'Selected' : ''}`}
              style={{ marginLeft: index ? '5px' : '0px' }}
              disabled={disabled}
            />
          ))
        }
      </div>
    </div>
  );
}

ToggleSelect.defaultProps = {
  onSelect: () => {},
  selected: '',
  labelText: '',
  disabled: false,
};

ToggleSelect.propTypes = {
  values: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  labelText: PropTypes.string,
  disabled: PropTypes.bool,
};
