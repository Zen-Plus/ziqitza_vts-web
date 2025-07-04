import React from 'react';
import PropTypes from 'prop-types';
import ToggleSelect from '../../ToggleSelect';

function ListActionToggleSelect({ restProps }) {
  return (
    <div className="ListActionToggleSelect Box--Shadow BorderRadius--Base">
      <ToggleSelect
        {...restProps}
      />
    </div>
  );
}

ListActionToggleSelect.propTypes = {
  restProps: PropTypes.object.isRequired,
};

export default ListActionToggleSelect;
