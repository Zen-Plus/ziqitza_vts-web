import React from 'react';
import PropTypes from 'prop-types';
import Chip from '../Chip';

export default function SelectedFilterChips({
  values,
  onDeSelect,
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      { 
        values.map((value) => (
          <Chip
            key={value.key}
            value={value}
            onDeselect={onDeSelect}
          />
        ))
      }
    </div>
  );
}

SelectedFilterChips.defaultProps = {
  onDeSelect: () => { },
};

SelectedFilterChips.propTypes = {
  values: PropTypes.array.isRequired,
  onDeSelect: PropTypes.func,

};
