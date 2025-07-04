import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import SearchBox from '../SearchBox';
import Button, { ButtonWithIcon } from '../../Button';
import Icon from '../../Icon';
import styles from './styles';
import FilterWrap from '../FilterWrap';
import SettingWrap from '../SettingWrap';
import PaginationDropDown from '../PaginationDropDown';
import ListActionSlider from '../ListActionSlider';
import ListActionToggleSelect from '../ListActionToggleSelect';
import ListActionDateRangePicker from '../ListActionDateRangePicker';

function ListActions({
  changePageSize,
  pageForward,
  pageBackward,
  listState,
  handleSearchText,
  searchBoxPlaceholder,
  isFetching,
  listDetails,
  components,
  selectedFilters,
  handleSubmitFilter,
  selectedSettings,
  handleSubmitSetting,
  selectedFilterNav,
  handleNavSwitch,
  isScrollIntoView,
  pickListData,
  isDropSizeVisible,
  intl,
  isSliderVisible,
  sliderRestProps,
  sliderValue,
  filterRestProps,
  settingRestProps,
  isIconButtonVisible,
  iconButtonProps,
  isPaginationVisible,
  searchBarRef,
  isToggleButtonVisible,
  toggleButtonRestProps,
  selectedFilterChips,
  setSelectedFilterChips,
  isSearchEnable,
  isDateRangeVisible,
  dateRangeValue,
  dateRangeRestProps,
  isDateRangeLabel
}) {
  let initialItemNumber = 0;
  let finalItemNumber = 0;
  let totalItemNumber = 0;
  if (listDetails.totalElements !== 0) {
    initialItemNumber = (listDetails.number + 1) * listDetails.size - listDetails.size + 1;
    finalItemNumber = (initialItemNumber + listDetails.size <= listDetails.totalElements)
      ? initialItemNumber + listDetails.size - 1 : listDetails.totalElements;
    totalItemNumber = listDetails.totalElements;
  }

  return (
    <div className="Flex ListActions" style={styles.root}>
      {isSearchEnable &&
        <div style={{ flex: '0 0 420px' }}>
          <SearchBox
            handleSearchText={handleSearchText}
            placeHolder={intl.formatMessage({ id: searchBoxPlaceholder })}
            disabled={isFetching}
            style={{ width: '400px' }}
            ref={searchBarRef}
          />
        </div>
      }
      {
        isToggleButtonVisible ?
          <ListActionToggleSelect
            restProps={{ ...toggleButtonRestProps}}
          />
          : null
      }
      {components.Filter ? (
        <div>
          <div
            className="Box--Shadow FilterWrapContainer"
            style={{
              flex: '0 0 39px', marginBottom: '17px', marginRight: '20px', borderRadius: '4px',
            }}
          >
            <FilterWrap
              isFetching={isFetching}
              selectedFilters={selectedFilters}
              components={components}
              handleSubmitFilter={handleSubmitFilter}
              pickListData={pickListData}
              handleNavSwitch={handleNavSwitch}
              filterRestProps={filterRestProps}
              isScrollIntoView={isScrollIntoView}
              selectedFilterNav={selectedFilterNav}
              selectedFilterChips={selectedFilterChips}
              setSelectedFilterChips={setSelectedFilterChips}
            />
          </div>
        </div>
      ) : null}
      {components.Setting ? (
        <div>
          <div
            className="Box--Shadow FilterWrapContainer"
            style={{
              flex: '0 0 39px', marginBottom: '17px', marginRight: '20px', borderRadius: '4px',
            }}
          >
            <SettingWrap
              isFetching={isFetching}
              selectedSettings={selectedSettings}
              components={components}
              handleSubmitSetting={handleSubmitSetting}
              pickListData={pickListData}
              settingRestProps={settingRestProps}
              isScrollIntoView={isScrollIntoView}
            />
          </div>
        </div> 
      ) : null}
      {
        isDropSizeVisible
        && (
          <div style={styles.selectBoxContainer}>
            <PaginationDropDown
              changePageSize={changePageSize}
              listState={listState}
              styles={styles.select}
              disabled={isFetching}
            />
          </div>
        )
      }
      {isSliderVisible && (
        <div className="Mt-4 Ml-20">
          <ListActionSlider
            restProps={{ ...sliderRestProps }}
            sliderValue={sliderValue}
          />
        </div>
      )}
      {isDateRangeVisible && (
        <ListActionDateRangePicker
          value={dateRangeValue}
          isDateRangeLabel={isDateRangeLabel}
          restProps={{ ...dateRangeRestProps }}
        />
      )}
      <div className="Flex Pagination" style={{ flex: '1 0 125px', justifyContent: 'flex-end' }}>
        {
          isIconButtonVisible && (
            <ButtonWithIcon
              {...iconButtonProps}
              type="plain"
              style={{
                borderRadius: '4px',
                paddingLeft: '12px',
                paddingRight: '12px',
                height: '40px',
              }}
              className='Border-None Box--Shadow Font--S14 Font--WB'
            />
          )
        }
        {isPaginationVisible
          && (
          <>
            <div className="Font--S14 Matterhor Ml-20" style={{ textAlign: 'right', alignSelf: 'center', paddingBottom: '18px' }}>
              {initialItemNumber || 0}
              {' - '}
              {finalItemNumber || 0}
              {' of '}
              {totalItemNumber || 0}
            </div>
            <div className="Flex" style={styles.navigationBtnContainer}>
              <Button className="Border-None" disabled={listDetails.first || isFetching} onClick={pageBackward} style={{ ...styles.navigationAction, ...styles.paginationButton }}><Icon name="backward" /></Button>
              <Button className="Border-None" disabled={listDetails.last || isFetching} onClick={pageForward} style={{ ...styles.navigationAction, ...styles.paginationButton }}><Icon name="forward" /></Button>
            </div>
          </>
          )}
      </div>
    </div>
  );
}

ListActions.defaultProps = {
  listDetails: {},
  isFetching: false,
  components: {},
  handleSubmitFilter: () => { },
  selectedFilters: {}, 
  handleSubmitSetting: () => { },
  selectedSettings: {},
  pickListData: {},
  isDropSizeVisible: true,
  changePageSize: () => { },
  selectedFilterNav: '',
  handleNavSwitch: () => { },
  isScrollIntoView: false,
  isSliderVisible: false,
  sliderRestProps: { max: 12, min: 1 },
  sliderValue: 1,
  filterRestProps: {
    selectedFilterIconName: 'filter-selected',
    filterIconName: 'filter',
  },
  settingRestProps: {
    settingIconName: 'settings',
  },
  isIconButtonVisible: false,
  iconButtonProps: {},
  isPaginationVisible: true,
  isToggleButtonVisible: false,
  toggleButtonRestProps: {},
  pageForward: ()=>{ },
  pageBackward: ()=>{ },
  selectedFilterChips: [],
  setSelectedFilterChips: () => { },
  searchBoxPlaceholder: 'label.searchHere',
  isSearchEnable: true,
  dateRangeValue: [],
  dateRangeRestProps: {},
  isDateRangeVisible: false,
  isDateRangeLabel: true,
  listState: {},
  handleSearchText: ()=>{}
};

ListActions.propTypes = {
  changePageSize: PropTypes.func,
  pageForward: PropTypes.func,
  pageBackward: PropTypes.func,
  listState: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  handleSearchText: PropTypes.func.isRequired,
  listDetails: PropTypes.object,
  isFetching: PropTypes.bool,
  components: PropTypes.object,
  handleSubmitFilter: PropTypes.func,
  handleSubmitSetting: PropTypes.func,
  selectedSettings: PropTypes.object,
  selectedFilters: PropTypes.object,
  pickListData: PropTypes.object,
  isDropSizeVisible: PropTypes.bool,
  selectedFilterNav: PropTypes.string,
  handleNavSwitch: PropTypes.func,
  isScrollIntoView: PropTypes.bool,
  isSliderVisible: PropTypes.bool,
  sliderRestProps: PropTypes.object,
  sliderValue: PropTypes.number,
  filterRestProps: PropTypes.object,
  settingRestProps: PropTypes.object,
  isIconButtonVisible: PropTypes.bool,
  iconButtonProps: PropTypes.object,
  isPaginationVisible: PropTypes.bool,
  searchBarRef: PropTypes.object,
  isToggleButtonVisible: PropTypes.bool,
  toggleButtonRestProps: PropTypes.object,
  selectedFilterChips: PropTypes.array,
  setSelectedFilterChips: PropTypes.func,
  searchBoxPlaceholder: PropTypes.string,
  isSearchEnable: PropTypes.bool,
  isDateRangeLabel: PropTypes.bool,
  isDateRangeVisible: PropTypes.bool,
  dateRangeValue: PropTypes.array,
  dateRangeRestProps: PropTypes.object,  
};

export default injectIntl(ListActions);
