import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import Menu from '../../../../components/Menu';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import SelectDrop from '../../../../components/SelectDrop';
import SelectedFilterChips from '../../../../components/SelectedFilterChips';
import { cloneDeep } from '../../../../common/helpers/collectionUtils';
import { VendorsContext, withVendorsProvider } from '../../../../providers/withVendorsProvider';
import { StatesContext, withStatesProvider } from '../../../../providers/withStateProvider';
import { DistrictsContext, withDistrictsProvider } from '../../../../providers/withDistrictProvider';
import { ParkingBaysContext, withParkingBaysProvider } from '../../../../providers/withParkingBaysProvider';
import DateRangePicker from '../../../../components/DateRangePicker';
import withProvider from '../../../../common/hocs/withProvider/withProvider';


const SelectVendor = withProvider({
  getResourcesActionKey: 'getGeographicalRestrictedVendorsList',
  loadMoreActionKey: 'getGeographicalRestrictedVendorsListLoadMore',
  context: VendorsContext,
  contextProvider: withVendorsProvider,
  stateKey: 'vendors',
}, SelectDrop);

const SelectState = withProvider({
  getResourcesActionKey: 'getGeographicalRestrictedStatesList',
  loadMoreActionKey: 'getGeographicalRestrictedStatesListLoadMore',
  context: StatesContext,
  contextProvider: withStatesProvider,
  stateKey: 'states',
}, SelectDrop);

const SelectDistrict = withProvider({
  getResourcesActionKey: 'getGeographicalRestrictedDistrictsList',
  loadMoreActionKey: 'getGeographicalRestrictedDistrictsListLoadMore',
  context: DistrictsContext,
  contextProvider: withDistrictsProvider,
  stateKey: 'districts',
}, SelectDrop);

const SelectParkingLocation = withProvider({
  getResourcesActionKey: 'getParkingBaysList',
  loadMoreActionKey: 'getParkingBaysListLoadMore',
  context: ParkingBaysContext,
  contextProvider: withParkingBaysProvider,
  stateKey: 'parkingBays',
}, SelectDrop);

const fieldNames = {
  VENDOR: 'vendor',
  STATE: 'state',
  DISTRICT: 'district',
  PARKING: 'parking',
  DATE_RANGE: 'dateRange',
};


function GPSQualityReportFilter({
  onClickCancel,
  onFilterSubmit,
  intl,
  selectedFilters,
  selectedFilterChips,
}) {
  const [filters, setFilters] = useState(selectedFilters);
  const [selectedFiltersValues, setSelectedFiltersValues] = useState(selectedFilterChips);
  const [districtQuery, setDistrictQuery] = useState(false);
  const [parkingBayQuery, setParkingBayQuery] = useState(false);

  useEffect(() => {
    if (filters.state) {
      setDistrictQuery({ stateId: filters.state.id });
    } else {
      setDistrictQuery(false);
    }
  }, [filters.state]);

  useEffect(() => {
    if (filters.district && filters.state) {
      setParkingBayQuery({ districtIds: filters.district.id, stateIds: filters.state.id });
    } else {
      setParkingBayQuery(false);
    }
  }, [filters.district]);

  function disabledDate(current) {
    return moment().subtract(3, 'months') > current || moment().isBefore(current, 'day');
  }

  const onSelect = (data, key) => {
    let _selectedValues = cloneDeep(selectedFiltersValues);
    const index = selectedFiltersValues.findIndex((value) => value.key === key);
    const _filter = { ...filters };
    if (index < 0) {
      _selectedValues.push({
        key,
        name: (key === 'dateRange' && `${moment(data[0]).format('DD MMM YYYY hh:mm A')} - ${moment(data[1]).format('DD MMM YYYY hh:mm A')}`) || data.name,
      });
      _filter[key] = data;
    } else {
      _selectedValues = [
        ..._selectedValues.slice(0, index),
        ..._selectedValues.slice(index + 1),
      ];
      _selectedValues.push({
        key,
        name: (key === 'dateRange' && `${moment(data[0]).format('DD MMM YYYY hh:mm A')} - ${moment(data[1]).format('DD MMM YYYY hh:mm A')}`) || data.name,
      });
      _filter[key] = data;
    }
    if (key === fieldNames.STATE) {
      _selectedValues = _selectedValues.filter((values) => (
        [fieldNames.VENDOR, fieldNames.DATE_RANGE, fieldNames.STATE].includes(values.key)));
      delete _filter[fieldNames.DISTRICT];
      delete _filter[fieldNames.PARKING];
    } else if (key === fieldNames.DISTRICT) {
      _selectedValues = _selectedValues.filter((values) => (
        [fieldNames.VENDOR, fieldNames.DATE_RANGE, fieldNames.DISTRICT, fieldNames.STATE]
          .includes(values.key)));
      delete _filter[fieldNames.PARKING];
    }
    setFilters({
      ..._filter,
    });
    setSelectedFiltersValues(_selectedValues);
  };

  const onDeSelect = (value) => {
    let _selectedValues = cloneDeep(selectedFiltersValues);
    const _filter = { ...filters };
    if (value.key === fieldNames.STATE) {
      _selectedValues = _selectedValues.filter((values) => (
        [fieldNames.VENDOR, fieldNames.DATE_RANGE].includes(values.key)));
      delete _filter[fieldNames.STATE];
      delete _filter[fieldNames.DISTRICT];
      delete _filter[fieldNames.PARKING];
    } else if (value.key === fieldNames.DISTRICT) {
      _selectedValues = _selectedValues.filter((values) => (
        [fieldNames.VENDOR, fieldNames.CLIENT_NAME, fieldNames.STATE, fieldNames.DATE_RANGE]
          .includes(values.key)));
      delete _filter[fieldNames.DISTRICT];
      delete _filter[fieldNames.PARKING];
    } else {
      _selectedValues = _selectedValues.filter((values) => values.key !== value.key);
      delete _filter[value.key];
    }
    setFilters({
      ..._filter,
    });
    setSelectedFiltersValues(_selectedValues);
  };

  const onResetPressed = () => {
    setFilters({});
    setSelectedFiltersValues([]);
  };

  const onApply = () => {
    if (Object.keys(filters).length) {
      onFilterSubmit(filters, true, selectedFiltersValues);
    } else {
      onFilterSubmit(filters, false, selectedFiltersValues);
    }
  };
  return (
    <Menu>
      <div className="ZiqitzaVTS">
        <div className="VtsFilter GPSReportFilter">
          <span className="Arrow-Up" style={{ position: 'absolute', top: '-10px', left: '243px' }} />
          <div className="Flex" style={{ flexWrap: 'wrap' }}>
            <div>
              <SelectVendor
                id="VendorSelect"
                labelText={intl.formatMessage({ id: 'label.vendor' })}
                selectedItem={filters.vendor}
                onChangeSelect={(data) => onSelect(data, fieldNames.VENDOR)}
              />
            </div>
            <div className="Ml-20">
              <SelectState
                id="SelectState"
                labelText={intl.formatMessage({ id: 'label.state' })}
                selectedItem={filters.state}
                onChangeSelect={(data) => onSelect(data, fieldNames.STATE)}
              />
            </div>
            <div className="Ml-20">
              <SelectDistrict
                labelText={intl.formatMessage({ id: 'label.district' })}
                id="DistrictSelect"
                onChangeSelect={(data) => onSelect(data, fieldNames.DISTRICT)}
                query={districtQuery}
                disabled={!filters.state || !districtQuery}
                selectedItem={filters.district}
              />
            </div>
            <div>
              <SelectParkingLocation
                labelText={intl.formatMessage({ id: 'label.parkingLocation' })}
                id="ParkingLocationSelect"
                onChangeSelect={(data) => onSelect(data, fieldNames.PARKING)}
                selectedItem={filters.parking}
                query={parkingBayQuery}
                disabled={!filters.district || !parkingBayQuery}
              />
            </div>
            <div className="Ml-20">
              <DateRangePicker
                labelText={intl.formatMessage({ id: 'label.dateRange' })}
                value={filters.dateRange}
                onChange={(data) => onSelect(data, fieldNames.DATE_RANGE)}
                disabledDate={disabledDate}
                allowClear={false}
                style={{ width: '388px' }}
                showTime={{ format: 'HH:mm' }}
                format="DD MMM YYYY hh:mm a"
                disabledTime={(current) => {
                  const compareDate = moment().subtract(3, 'months');
                  return {
                    disabledHours: () => {
                      const hours = [];
                      if (moment(current).isSame(compareDate, 'day')) {
                        for (let hour = 0; hour < compareDate.hour(); hour += 1) {
                          hours.push(hour);
                        }
                      }
                      if (moment(current).isSame(moment(), 'day')) {
                        for (let hour = moment().hour() + 1; hour < 24; hour += 1) {
                          hours.push(hour);
                        }
                      }
                      return hours;
                    },
                    disabledMinutes: (hour) => {
                      const minutes = [];
                      if (moment(current).isSame(compareDate, 'day')) {
                        if (hour === moment(compareDate).hour()) {
                          for (let minute = 0;
                            minute < moment(compareDate).minute(); minute += 1) {
                            minutes.push(minute);
                          }
                        }
                      }
                      if (moment(current).isSame(moment(), 'day')) {
                        if (hour === moment().hour()) {
                          for (let minute = moment().minute() + 1;
                            minute < 60; minute += 1) {
                            minutes.push(minute);
                          }
                        }
                      }
                      return minutes;
                    },
                  };
                }}
              />
            </div>
          </div>
          {
            selectedFiltersValues && !!selectedFiltersValues.length
            && (
              <div className="Gray50-Text Mt-20">
                <SelectedFilterChips
                  values={selectedFiltersValues}
                  onDeSelect={onDeSelect}
                />
              </div>
            )
          }
          <div className="Flex Mt-20" style={{ justifyContent: 'space-between' }}>
            <div className="Flex">
              <Button
                type="plain"
                onClick={onResetPressed}
                className="Button-Width"
              >
                <span style={{ verticalAlign: 'middle', marginRight: '9px' }}>
                  <Icon name="rotate-counterClockWise" />
                </span>
                <span
                  className="Font--WB Font--S16 Matterhorn-Text"
                  style={{ letterSpacing: '0.2px' }}
                >
                  {intl.formatMessage({ id: 'label.reset' })}
                </span>
              </Button>
            </div>
            <div className="Flex">
              <Button
                type="link"
                className="Button-Width Button-Label-Cancel"
                onClick={() => onClickCancel()}
              >
                <span style={{ verticalAlign: 'middle', marginRight: 9 }}>
                  <Icon name="cross-red" />
                </span>
                <span className="Font--WB Font--S16" style={{ letterSpacing: '0.2px' }}>
                  {intl.formatMessage({ id: 'label.cancel' })}
                </span>
              </Button>
              <Button
                type="plain"
                className="Ml-18 Button-Width"
                onClick={onApply}
              >
                <span style={{ verticalAlign: 'middle', marginRight: '9px' }}>
                  <Icon name="check" />
                </span>
                <span
                  className="Font--WB Font--S16 Matterhorn-Text"
                  style={{ letterSpacing: '0.2px' }}
                >
                  {intl.formatMessage({ id: 'label.apply' })}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Menu>
  );
}

GPSQualityReportFilter.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  selectedFilterChips: PropTypes.array.isRequired,
};

export default injectIntl(GPSQualityReportFilter);
