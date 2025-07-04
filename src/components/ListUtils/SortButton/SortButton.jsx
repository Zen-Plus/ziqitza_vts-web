import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import Button from '../../Button';

const sortIconsMap = {
  ASC: 'arrow-up',
  DESC: 'arrow-down',
};

function SortButton({
  sortDirection,
  isVisible,
  sortBy,
  onClick,
}) {
  function handleClick() {
    onClick(sortBy);
  }

  if (!isVisible) {
    return null;
  }
  const iconName = sortIconsMap[sortDirection] || 'arrow-up-down';
  return (
    <Button
      className="SortButton Border-None"
      style={{
        marginLeft: '5px',
        background: 'transparent',
        height: 'auto',
        padding: '0px',
        position: 'relative', 
        top: sortDirection ? '-2px' : '1px',
      }}
      onClick={handleClick}
    >
      <Icon name={iconName} />
    </Button>
  );
}

SortButton.defaultProps = {
  isVisible: true,
  onClick: () => { },
};


SortButton.propTypes = {
  sortDirection: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  sortBy: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default SortButton;
