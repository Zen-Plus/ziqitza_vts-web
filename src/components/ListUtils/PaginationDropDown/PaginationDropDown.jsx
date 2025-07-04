import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Icon from '../../Icon';
import Select from '../../SelectBox';

function PaginationDropDown({
  paginationValues = [],
  changePageSize,
  styles,
  listState,
  disabled,
}) {
  const listItems = paginationValues.map((pageValue) => (
    <Select.Option key={pageValue} value={pageValue}>{pageValue}</Select.Option>
  ));
  return (
    <div className="PaginationDropDown" style={{ position: 'relative' }}>
      <Select
        defaultValue={paginationValues && paginationValues.length ? paginationValues[0] : 25}
        value={listState.pageSize}
        className="Box--Shadow"
        onChange={changePageSize}
        style={styles}
        showArrow={false}
        disabled={disabled}
        dropdownClassName="Vts_ListAction_Dropdown"
      >
        {listItems}
      </Select>
      <span style={{
        position: 'absolute',
        top: '8px',
        left: '75px',
        pointerEvents: 'none',
      }}
      >
        <Icon name="arrow-down" />
      </span>
      <span className="Font--S14" style={{ marginLeft: '8px' }}>
        <FormattedMessage id="label.entries" />
      </span>
    </div>
  );
}

PaginationDropDown.defaultProps = {
  paginationValues: [25, 50, 75, 100],
  styles: {},
};

PaginationDropDown.propTypes = {
  paginationValues: PropTypes.array,
  listState: PropTypes.object.isRequired,
  changePageSize: PropTypes.func.isRequired,
  styles: PropTypes.object,
  disabled: PropTypes.bool.isRequired,
};

export default PaginationDropDown;
