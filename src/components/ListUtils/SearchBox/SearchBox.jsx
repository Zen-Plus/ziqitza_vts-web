import React, { useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Input from '../../Input';
import Icon from '../../Icon';
import Button from '../../Button';

function SearchBox({
  placeHolder,
  handleSearchText,
  ...restProps
}, ref) {
  let text;
  const [searchText, setSearchText] = useState('');

  function handleKeyUp(event) {
    const keyCode = event.which || event.keyCode;
    if (text !== searchText) {
      if ((keyCode === 46 && !searchText) || keyCode === 13 || (keyCode === 8 && !searchText)) {
        handleSearchText(searchText);
        text = searchText;
      }
    }
  }

  function handleBtnSubmit() {
    if (text !== searchText) {
      handleSearchText(searchText);
      text = searchText;
    }
  }

  function handleChange(event) {
    setSearchText(event.target.value);
  }

  function handleReset() {
    setSearchText('');
  }

  useImperativeHandle(ref, () => ({
    reset: () => handleReset(),
  }), []);

  return (
    <div className="SearchBox" style={{ position: 'relative', width: '400px' }}>
      <Input
        className="Border-None"
        value={searchText}
        placeholder={placeHolder}
        {...restProps}
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        style={{ top: '0px', width: '400px', height: '40px' }}
      />
      <span
        style={{
          position: 'absolute',
          left: '352px',
          bottom: '25px',
          top: '-2px',
        }}
        className="SearchBox__Icon"
      >
        <Button className="Border-None" onClick={handleBtnSubmit} style={{ background: 'transparent' }}><Icon name="search" /></Button>
      </span>
    </div>
  );
}

SearchBox.defaultProps = {
  placeHolder: '',
};


SearchBox.propTypes = {
  placeHolder: PropTypes.string,
  handleSearchText: PropTypes.func.isRequired,
};

export default forwardRef(SearchBox);
