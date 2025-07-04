import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Menu from '../../../../components/Menu';
import Button from '../../../../components/Button';
import SelectDrop from '../../../../components/SelectDrop';
import SelectedFilterChips from '../../../../components/SelectedFilterChips';
import '../../../../assets/styles/filters.less';
import Icon from '../../../../components/Icon';
import withProvider from '../../../../common/hocs/withProvider/withProvider';
import { DistrictsContext, withDistrictsProvider } from '../../../../providers/withDistrictProvider';
import { ParkingBaysContext, withParkingBaysProvider } from '../../../../providers/withParkingBaysProvider';

const fieldNames = {
  TYPE: 'type',
  DISTRICT: 'district',
  PARKING: 'parking',
};

function Filter({
  onClickCancel,
  onFilterSubmit,
  intl,
  selectedFilters,
  selectedFilterChips,
}) {
  const [filters, setFilters] = useState(selectedFilters);
  const [selectedFiltersValues, setSelectedFiltersValues] = useState(selectedFilterChips);
  const [parkingBayQuery, setParkingBayQuery] = useState(false);

  const SelectParkingLocation = withProvider({
    getResourcesActionKey: 'getParkingBaysList',
    loadMoreActionKey: 'getParkingBaysListLoadMore',
    context: ParkingBaysContext,
    contextProvider: withParkingBaysProvider,
    stateKey: 'parkingBays',
  }, SelectDrop);

  const SelectDistrict = withProvider({
  getResourcesActionKey: 'getProjectDistrictsList',
  loadMoreActionKey: 'getProjectDistrictsListLoadMore',
  context: DistrictsContext,
  contextProvider: withDistrictsProvider,
  stateKey: 'districts',
}, SelectDrop);

  const onSelect = (data, key) => {
    let _selectedValues = [...selectedFiltersValues];
    const index = selectedFiltersValues.findIndex((value) => value.key === key);
    const _filter = { ...filters };
    if (index < 0) {
      _selectedValues.push({
        key,
        name: data.name,
      });
    } else {
      _selectedValues[index].name = data.name;
    }
    _filter[key] = data;
    setFilters({
      ..._filter,
    });
    setSelectedFiltersValues(_selectedValues);
  };

  const onDeSelect = (value) => {
    let _selectedValues = [...selectedFiltersValues];
    const _filter = { ...filters };
    _selectedValues = _selectedValues.filter((values) => values.key !== value.key);
    _filter[value.key] = '';
    setFilters({
      ..._filter,
    });
    setSelectedFiltersValues(_selectedValues);
  };

  const onResetPressed = () => {
    setFilters({
      state: {},
      district: {},
      vendor: {},
      type: '',
      status: '',
    });
    setSelectedFiltersValues([]);
    onApply();
  };

  const onApply = () => {
    const payload = {
      baseLocationName: filters?.parking?.name ? [filters.parking.name] : [],
      districtName: filters?.district?.name ? [filters.district.name] : [],
      vehicleTypes: filters?.type?.name ? [filters.type.name] : [],
    };
    onFilterSubmit(payload);
  };

  useEffect(() => {
      if (filters.district) {
        setParkingBayQuery({ districtIds: filters.district.id });
      } else {
        setParkingBayQuery(false);
      }
    }, [filters.district]);
  
  const vehicleType = [
    {
        "id": "ALS",
        "name": "ALS"
    },
    {
        "id": "BLS",
        "name": "BLS"
    },
    {
        "id": "MV",
        "name": "MV"
    },
    {
        "id": "BLS_M",
        "name": "BLS_M"
    },
    {
        "id": "BLS_S",
        "name": "BLS_S"
    },
    {
        "id": "MV_M",
        "name": "MV_M"
    }
  ];
  return (
    <Menu className="VehicleFilterWrap">
      <div className="VehicleFilter Filter">
        <span className="Arrow-Up" style={{ position: 'absolute', top: '-10px', left: '243px' }} />
        <div className="Flex">
          <div>
            <SelectDrop
              id="TypeSelect"
              dropListValues={vehicleType}
              selectedItem={filters.type}
              onChangeSelect={(data) => onSelect(data, fieldNames.TYPE)}
              labelText={intl.formatMessage({ id: 'label.type' })}
            />
          </div>
          <div className="Ml-20">
            <SelectDistrict 
              id="districtSelect"
              onChangeSelect={(data) => onSelect(data, fieldNames.DISTRICT)}
              labelText={intl.formatMessage({ id: 'label.district' })}
              selectedItem={filters.district}
            />
          </div>
          <div className="Ml-20" >
            <SelectParkingLocation
              labelText={intl.formatMessage({ id: 'label.parkingLocation' })}
              id="ParkingLocationSelect"
              onChangeSelect={(data) => onSelect(data, fieldNames.PARKING)}
              selectedItem={filters.parking}
              query={parkingBayQuery}
              disabled={!filters.district || !parkingBayQuery}
            />
          </div>
        </div>

        {
          selectedFiltersValues && !!selectedFiltersValues.length
          && (
            <div className="Gray50-Text">
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
              style={{ minWidth: '116px' }}
              onClick={onResetPressed}
            >
              <span className="Button-Icon">
                <Icon name="rotate-counterClockWise" />
              </span>
              <span
                className="Button-Label"
              >
                {intl.formatMessage({ id: 'label.reset' })}
              </span>
            </Button>
          </div>
          <div className="Flex">
            <Button
              type="link"
              className="Button-Width"
              style={{ minWidth: '116px' }}
              onClick={() => onClickCancel()}
            >
              <span className="Button-Icon">
                <Icon name="cross-red" />
              </span>
              <span className="Button-Label-Cancel">
                {intl.formatMessage({ id: 'label.cancel' })}
              </span>
            </Button>
            <Button
              type="plain"
              className="Ml-18 Button-Width"
              style={{ minWidth: '116px' }}
              onClick={onApply}
            >
              <span className="Button-Icon">
                <Icon name="check" />
              </span>
              <span className="Button-Label">
                {intl.formatMessage({ id: 'label.apply' })}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Menu>
  );
}

Filter.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  pickListData: PropTypes.object.isRequired,
  selectedFilterChips: PropTypes.array.isRequired,
};

export default (injectIntl(Filter));
