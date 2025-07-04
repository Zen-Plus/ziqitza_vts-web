import React from 'react';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SelectedItem from './SelectedItem';
import DropListItemMulti from './DropListItemMulti';
import DropListItem from './DropListItem';
import Icon from '../Icon';
import { findObjectIndex } from '../../common/helpers/collectionUtils';
import ScrollBar from '../Scrollbar';

function checkDropItemStatus(value, selectedItems = []) {
  return selectedItems.some((selectedItem) => selectedItem.id === value.id);
}

function getSelectedItemText(value = '') {
  if (typeof value === 'string') {
    return value;
  }
  return value.name;
}

function getScrollHeight(itemCount) {
  if (itemCount > 5) {
    return '180px';
  }
  return `${(itemCount * 36) || 36}px`;
}

export default function SelectDrop({
  dropListValues, selectedItems, onChangeSelect, labelText,
  onTextChange, text, onScrollBottom, id, multi, selectedItem,
  isSearchEnable, errorText, disabled, isReadonly, onBlur,
}) {
  const [isDropVisible, setDropVisible] = useState(false);
  const dropElement = useRef(null);

  function handleDeselectItem(value) {
    const _selectedItems = [...selectedItems];
    const index = findObjectIndex({ array: _selectedItems, byKey: 'id', forValue: value.id });
    if (index > -1) {
      _selectedItems.splice(index, 1);
    }
    onChangeSelect(_selectedItems);
  }

  function handleSelectItem(value) {
    if (multi) {
      const _selectedItems = [...selectedItems];
      _selectedItems.push(value);
      onChangeSelect(_selectedItems);
    } else {
      if (value !== selectedItem) {
        onChangeSelect(value);
      }
      setDropVisible(false);
    }
  }
  function handleFocus() {
    if (!disabled) {
      setDropVisible(true);
    }
  }
  function handleSelectFocus() {
    if (!disabled) {
      setDropVisible(!isDropVisible);
    }
  }

  function handleKeyPress(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13 && !disabled) {
      setDropVisible(true);
    }
  }

  function handleScrollStop() {
    const ele = document.getElementById(id).childNodes[0];
    if (ele.scrollHeight < (ele.scrollTop + ele.offsetHeight)) {
      onScrollBottom();
    }
  }

  function handleClickOutside(event) {
    if (dropElement.current && !dropElement.current.contains(event.target)) {
      setDropVisible(false);
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="Flex Flex-Direction-Column SelectDrop">
      {
        labelText
        && <div className="LabelText">{labelText}</div>
      }
      {
        !isReadonly
          ? (
            <div ref={dropElement} className="SelectWrap">
              {
                (isSearchEnable && !isReadonly)
                  ? (
                    <input
                      title=""
                      autoComplete="new-password"
                      className={`Select ${errorText ? 'Error-Border' : ''}`}
                      value={isDropVisible
                        ? text
                        : (selectedItem.name || 'Select')}
                      onFocus={handleFocus}
                      onBlur={onBlur}
                      onChange={onTextChange}
                      disabled={disabled}
                    />
                  )
                  : (
                    <div
                      className={`Select ${disabled ? 'Disabled' : ''} ${(errorText && !isDropVisible) ? 'Error-Border' : ''}`}
                      onClick={handleSelectFocus}
                      tabIndex={0}
                      role="button"
                      onKeyPress={handleKeyPress}
                    >
                      {selectedItem.name || selectedItem || 'Select'}
                    </div>
                  )
              }
              {
                (!isDropVisible || !isSearchEnable)
                && (
                <span className="Drop-Arrow">
                  <Icon name="arrow-down" />
                </span>
                )
              }
              {
              isDropVisible
              && (
                <ScrollBar id={id} style={{ height: getScrollHeight(dropListValues && dropListValues.length), zIndex: 2 }} className="DropList" onScrollStop={handleScrollStop}>
                  {
                    dropListValues && dropListValues.length
                      ? (
                        <>
                          {
                          multi
                            ? (dropListValues.map((value, index) => (
                              <DropListItemMulti
                                key={value.id}
                                value={value}
                                index={index}
                                isChecked={checkDropItemStatus(value, selectedItems)}
                                onSelect={handleSelectItem}
                                onDeselect={handleDeselectItem}
                              />
                            )))
                            : (dropListValues.map((value, index) => (
                              <DropListItem
                                key={JSON.stringify(value)}
                                value={value}
                                index={index}
                                onSelect={handleSelectItem}
                                isSearchEnable={isSearchEnable}
                              />
                            )))
                          }
                        </>
                      )
                      : (
                        <div
                          className="Flex JustifyContent--Center Font--S14 Gray50-Text No-Search-Text"
                          style={{ padding: '10px' }}
                        >
                          No Search Results
                        </div>
                      )
                  }
                </ScrollBar>
              )
            }
            </div>
          )
          : (
            <div className="Selected-ReadOnly">
              {
                !!selectedItem
                  && (
                    <div className="GrayDark-Text" style={{ marginTop: '17px' }}>
                      {getSelectedItemText(selectedItem)}
                    </div>
                  )
              }
            </div>
          )
      }
      {
        selectedItems && !!selectedItems.length
        && (
        <div className={`SelectedItemsWrap ${isReadonly ? 'Readonly' : ''}`}>
          <div
            className="Flex Font--S14"
            style={{ flexWrap: 'wrap', padding: '6px' }}
          >
            {
              selectedItems.map((value = {}) => (
                <SelectedItem
                  isReadonly={isReadonly}
                  key={value.id}
                  value={value}
                  onDeselect={handleDeselectItem}
                />
              ))
            }
          </div>
        </div>
        )
      }
      {
        errorText
        && (
          <div className="Error-Text">
            {errorText}
          </div>
        )
      }
    </div>
  );
}

SelectDrop.defaultProps = {
  dropListValues: [],
  selectedItems: [],
  selectedItem: '',
  onScrollBottom: () => {},
  multi: false,
  text: '',
  labelText: '',
  onTextChange: () => {},
  isSearchEnable: false,
  errorText: '',
  disabled: false,
  isReadonly: false,
  onBlur: () => {},
};

SelectDrop.propTypes = {
  id: PropTypes.string.isRequired,
  selectedItems: PropTypes.array,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  dropListValues: PropTypes.array,
  onChangeSelect: PropTypes.func.isRequired,
  onTextChange: PropTypes.func,
  text: PropTypes.string,
  onScrollBottom: PropTypes.func,
  multi: PropTypes.bool,
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  isSearchEnable: PropTypes.bool,
  disabled: PropTypes.bool,
  isReadonly: PropTypes.bool,
  onBlur: PropTypes.func,
};
