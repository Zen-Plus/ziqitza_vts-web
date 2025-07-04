import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import Button from '../../Button';
import Dropdown from '../../Dropdown';

function FilterWrap({
  isFetching,
  components,
  selectedFilters,
  handleSubmitFilter,
  wrapperClassName,
  pickListData,
  selectedFilterNav,
  handleNavSwitch,
  isScrollIntoView,
  placement,
  filterRestProps,
  selectedFilterChips: selectedFilterChip,
  setSelectedFilterChips: setSelectedFilterChip,
}) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedFilterChips, setSelectedFilterChips] = useState(selectedFilterChip);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const FilterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (FilterRef.current && !FilterRef.current.contains(event.target)) {
        setIsDropDownVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [FilterRef]);

  useEffect(() => {
    if (Object.keys(selectedFilters).length) {
      setIsFilterApplied(true);
    }
  }, [selectedFilters]);

  function handleFilterSubmit(data, isApplied, selectedChips = []) {
    setIsDropDownVisible(false);
    setIsFilterApplied(isApplied);
    setSelectedFilterChips(selectedChips);
    setSelectedFilterChip(selectedChips);
    handleSubmitFilter(data);
  }
  return (
    <div className="VtsFilterWrap">
      <div className={isDropDownVisible ? 'overlay' : ''} />
      <Dropdown
        overlay={(
          isDropDownVisible
            ? (
              <components.Filter
                onClickCancel={() => setIsDropDownVisible(false)}
                selectedFilters={selectedFilters}
                selectedFilterChips={selectedFilterChips}
                pickListData={pickListData}
                onFilterSubmit={handleFilterSubmit}
                handleNavSwitch={handleNavSwitch}
                selectedFilterNav={selectedFilterNav}
                filterRef={FilterRef}
                {...filterRestProps}
              />
            ) : <> </>
        )}
        visible={isDropDownVisible}
        placement={placement}
        overlayClassName={`${placement === 'bottomRight' ? 'VtsListFilter-Position-right' : 'VtsListFilter-Position-left'} ${wrapperClassName}`}
      >
        <Button
          style={{ background: 'transparent', width: '40px', padding: '10px' }}
          onClick={() => {
            if (isScrollIntoView) {
              const element = document.querySelector('.VtsFilterWrap');
              element.scrollIntoView();
            }
            setIsDropDownVisible(!isDropDownVisible);
          }}
          disabled={isFetching}
        >
          <Icon name={isFilterApplied ? filterRestProps.selectedFilterIconName : filterRestProps.filterIconName} />
        </Button>
      </Dropdown>
    </div>
  );
}

FilterWrap.defaultProps = {
  components: {},
  handleSubmitFilter: () => { },
  isFetching: false,
  pickListData: {},
  wrapperClassName: '',
  selectedFilterNav: '',
  handleNavSwitch: () => { },
  isScrollIntoView: false,
  placement: 'bottomCenter',
  filterRestProps: {
    selectedFilterIconName: 'filter-selected',
    filterIconName: 'filter',
    selectedFilterChips: [],
    setSelectedFilterChips: () => { },
  },
  selectedFilterChips: [],
  setSelectedFilterChips: () => { },
};

FilterWrap.propTypes = {
  components: PropTypes.object,
  handleSubmitFilter: PropTypes.func,
  isFetching: PropTypes.bool,
  selectedFilters: PropTypes.object.isRequired,
  pickListData: PropTypes.object,
  wrapperClassName: PropTypes.string,
  selectedFilterNav: PropTypes.string,
  handleNavSwitch: PropTypes.func,
  isScrollIntoView: PropTypes.bool,
  placement: PropTypes.string,
  filterRestProps: PropTypes.object,
  selectedFilterChips: PropTypes.array,
  setSelectedFilterChips: PropTypes.func,
};

export default FilterWrap;
