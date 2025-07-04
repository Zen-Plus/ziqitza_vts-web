import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import Menu from '../../../../components/Menu';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import SelectedFilterChips from '../../../../components/SelectedFilterChips';
import { cloneDeep } from '../../../../common/helpers/collectionUtils';
import DateRangePicker from '../../../../components/DateRangePicker';


const fieldNames = {
  DATE_RANGE: 'dateRange',
};


function TrackingAlertReportFilter({
  onClickCancel,
  onFilterSubmit,
  intl,
  selectedFilters,
  selectedFilterChips,
}) {
  const [filters, setFilters] = useState(selectedFilters);
  const [selectedFiltersValues, setSelectedFiltersValues] = useState(selectedFilterChips);

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
    setFilters({
      ..._filter,
    });
    setSelectedFiltersValues(_selectedValues);
  };

  const onDeSelect = (value) => {
    let _selectedValues = cloneDeep(selectedFiltersValues);
    const _filter = { ...filters };
      _selectedValues = _selectedValues.filter((values) => values.key !== value.key);
      delete _filter[value.key];
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
    <Menu className="TrackingAlertReportFilterWrap">
      <div className="ZiqitzaVTS">
        <div className="VtsFilter TrackingAlertReportFilter">
          <span className="Arrow-Up" style={{ position: 'absolute', top: '-10px', left: '243px' }} />
          <div className="Flex" style={{ flexWrap: 'wrap' }}>
            <div>
              <DateRangePicker
                labelText={intl.formatMessage({ id: 'label.dateRange' })}
                value={filters.dateRange}
                onChange={(data) => onSelect(data, fieldNames.DATE_RANGE)}
                disabledDate={disabledDate}
                allowClear={false}
                style={{ width: '388px' }}
                showTime={{ format: 'HH:mm' }}
                format="DD MMM YYYY hh:mm A"
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

TrackingAlertReportFilter.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  selectedFilterChips: PropTypes.array.isRequired,
};

export default injectIntl(TrackingAlertReportFilter);
