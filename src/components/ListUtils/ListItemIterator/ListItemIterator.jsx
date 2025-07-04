import React from 'react';
import PropTypes from 'prop-types';

function defaultCallback() {}

function ListItemIterator({
  listDetails = [],
  ListItem,
  isKeyIndex,
  ...restProps
}) {
  const listItems = listDetails.map((listDetail, index) => (
    <ListItem
      index={index}
      key={isKeyIndex ? index : (listDetail.id || index)}
      details={listDetail}
      {...restProps}
    />
  ));
  return (
    <tbody>{listItems}</tbody>
  );
}

ListItemIterator.defaultProps = {
  listDetails: [],
  mode: '',
  selectedItems: [],
  isKeyIndex: false,
  selectCallback: defaultCallback,
  deSelectCallback: defaultCallback,
};

ListItemIterator.propTypes = {
  ListItem: PropTypes.func.isRequired,
  selectCallback: PropTypes.func,
  deSelectCallback: PropTypes.func,
  listDetails: PropTypes.array,
  selectedItems: PropTypes.array,
  mode: PropTypes.string,
  isKeyIndex: PropTypes.bool,
};

export default ListItemIterator;
