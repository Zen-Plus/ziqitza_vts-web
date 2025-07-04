import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Menu from '../../../components/Menu';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';
import SelectDrop from '../../../components/SelectDrop';
import ToggleSelect from '../../../components/ToggleSelect';
import SelectedFilterChips from '../../../components/SelectedFilterChips';
import { cloneDeep } from '../../../common/helpers/collectionUtils';
import { StatesContext , withStatesProvider} from '../../../providers/withStateProvider';
import { DistrictsContext , withDistrictsProvider} from '../../../providers/withDistrictProvider';
import { VendorsContext , withVendorsProvider} from '../../../providers/withVendorsProvider';
import { ClientsContext , withClientsProvider} from '../../../providers/withClientsProvider';
import { ParkingBaysContext , withParkingBaysProvider} from '../../../providers/withParkingBaysProvider';
import { ClusterLeadersContext , withClusterLeadersProvider } from '../../../providers/withClusterLeadersProvider';
import withProvider from '../../../common/hocs/withProvider/withProvider';


const SelectState = withProvider({
  getResourcesActionKey: 'getGeographicalRestrictedStatesList',
  loadMoreActionKey: 'getGeographicalRestrictedStatesListLoadMore',
  context: StatesContext,
  contextProvider: withStatesProvider,
  stateKey: 'states'
  }, SelectDrop);

const SelectDistrict = withProvider({
  getResourcesActionKey: 'getGeographicalRestrictedDistrictsList',
  loadMoreActionKey: 'getGeographicalRestrictedDistrictsListLoadMore',
  context: DistrictsContext,
  contextProvider: withDistrictsProvider,
  stateKey: 'districts'
  }, SelectDrop); 

const SelectVendor = withProvider({
  getResourcesActionKey: 'getGeographicalRestrictedVendorsList',
  loadMoreActionKey: 'getGeographicalRestrictedVendorsListLoadMore',
  context: VendorsContext,
  contextProvider: withVendorsProvider,
  stateKey: 'vendors'
  }, SelectDrop);

const SelectClient = withProvider({
  getResourcesActionKey: 'getClientsList',
  loadMoreActionKey: 'getClientsListLoadMore',
  context: ClientsContext,
  contextProvider: withClientsProvider,
  stateKey: 'clients'
  }, SelectDrop);
  
const SelectParkingLocation = withProvider({
  getResourcesActionKey: 'getParkingBaysList',
  loadMoreActionKey: 'getParkingBaysListLoadMore',
  context: ParkingBaysContext,
  contextProvider: withParkingBaysProvider,
  stateKey: 'parkingBays'
  }, SelectDrop);

const SelectClusterLeaders = withProvider({
  getResourcesActionKey: 'getClusterLeadersList',
  loadMoreActionKey: 'getClusterLeadersListLoadMore',
  context: ClusterLeadersContext,
  contextProvider: withClusterLeadersProvider,
  stateKey: 'clusterLeaders'
  }, SelectDrop);

const fieldNames = {
  CLIENT_NAME: "clientName",
  VENDOR: "vendor",
  STATUS: 'status',
  STATE: 'state',
  DISTRICT: 'district',
  CLUSTER_LEADER: 'clusterLeader',
  PARKING_LOCATION: 'parkingLocation',
  VEHICLE_TYPE: 'vehicleType',
  VEHICLE_STATUS: 'vehicleStatus',
};

function VtsDashboardFilter({
  onClickCancel,
  onFilterSubmit,
  intl,
  selectedFilters,
  pickListData,
  selectedFilterChips,
}) {
  const [filters, setFilters] = useState(selectedFilters);
  const [selectedFiltersValues, setSelectedFiltersValues] = useState(selectedFilterChips);
  const [districtQuery, setDistrictQuery] = useState(false);
  const [parkingBayQuery, setParkingBayQuery] = useState(false);
  const [clusterLeaderQuery, setClusterLeaderQuery] = useState(false);

  useEffect(() => {
    if(filters.state){
      setDistrictQuery({ stateId: filters.state.id });
    }else{
      setDistrictQuery(false);
    }
  }, [filters.state])

  useEffect(() => {
    if(filters.district && filters.state){
      setParkingBayQuery({ districtIds: filters.district.id, stateIds: filters.state.id });
      setClusterLeaderQuery({ parkingBayDistrictIds: filters.district.id, parkingBayStateIds: filters.state.id });
    }else {
      setParkingBayQuery(false);
      setClusterLeaderQuery(false);
    }
  }, [filters.district])

  const onSelect = (data, key) => {
    let _selectedValues = cloneDeep(selectedFiltersValues);
    const index = selectedFiltersValues.findIndex((value) => value.key === key);
    const _filter = { ...filters };
    if (index < 0) {
      _selectedValues.push({
        key,
        name: data.name,
      });
      _filter[key] = data;
    } else {
      _selectedValues = [
        ..._selectedValues.slice(0, index),
        ..._selectedValues.slice(index + 1),
      ];
      _selectedValues.push({
        key,
        name: data.name,
      });
      _filter[key] = data;
    }
    if (key === fieldNames.STATE) {
      _selectedValues = _selectedValues.filter((values) => (
        [fieldNames.VENDOR, fieldNames.CLIENT_NAME, fieldNames.STATE, fieldNames.VEHICLE_STATUS, fieldNames.VEHICLE_TYPE].includes(values.key)));
       delete _filter[fieldNames.DISTRICT];
       delete _filter[fieldNames.PARKING_LOCATION];
       delete _filter[fieldNames.CLUSTER_LEADER];
    }else if (key === fieldNames.DISTRICT) {
      _selectedValues = _selectedValues.filter((values) => (
        [fieldNames.VENDOR, fieldNames.CLIENT_NAME,fieldNames.DISTRICT, fieldNames.STATE, fieldNames.VEHICLE_STATUS, fieldNames.VEHICLE_TYPE].includes(values.key)));
       delete _filter[fieldNames.PARKING_LOCATION];
       delete _filter[fieldNames.CLUSTER_LEADER];
    }
    setFilters({
      ..._filter,
    });
    setSelectedFiltersValues(_selectedValues);
  };

  const onDeSelect = (value) => {
    let _selectedValues = cloneDeep(selectedFiltersValues);
    const _filter = { ...filters };
    if(value.key === fieldNames.STATE){
      _selectedValues = _selectedValues.filter((values) => (
        [fieldNames.VENDOR, fieldNames.CLIENT_NAME, fieldNames.VEHICLE_STATUS, fieldNames.VEHICLE_TYPE].includes(values.key)));
        delete _filter[fieldNames.STATE];
        delete _filter[fieldNames.DISTRICT];
        delete _filter[fieldNames.PARKING_LOCATION];
        delete _filter[fieldNames.CLUSTER_LEADER];
    }else if(value.key === fieldNames.DISTRICT){
      _selectedValues = _selectedValues.filter((values) => (
        [fieldNames.VENDOR, fieldNames.CLIENT_NAME,fieldNames.STATE, fieldNames.VEHICLE_STATUS, fieldNames.VEHICLE_TYPE].includes(values.key)));
        delete _filter[fieldNames.DISTRICT];
        delete _filter[fieldNames.PARKING_LOCATION];
        delete _filter[fieldNames.CLUSTER_LEADER];
    }else{
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
        <div className="VtsFilter VtsDashBoardFilter">
          <span className="Arrow-Up" style={{ position: 'absolute', top: '-10px', left: '243px' }} />
          <div className="Flex" style={{ flexWrap: 'wrap' }}>
            <div>
              <SelectClient
                labelText={intl.formatMessage({ id: 'label.clientName' })}
                id="ClientNameSelect"
                onChangeSelect={(data) => onSelect(data, fieldNames.CLIENT_NAME)}
                selectedItem={filters.clientName}
              />
            </div>
            <div className="Ml-20">
              <SelectVendor
                labelText={intl.formatMessage({ id: 'label.vendor' })}
                id="VendorSelect"
                onChangeSelect={(data) => onSelect(data, fieldNames.VENDOR)}
                selectedItem={filters.vendor}
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
            <div>
              <SelectDistrict
                labelText={intl.formatMessage({ id: 'label.district' })}
                id="DistrictSelect"
                onChangeSelect={(data) => onSelect(data, fieldNames.DISTRICT)}
                query={districtQuery}
                disabled={!filters.state || !districtQuery}
                selectedItem={filters.district}
              />
            </div>
            <div className="Ml-20">
              <SelectClusterLeaders
                labelText={intl.formatMessage({ id: 'label.clusterLeader' })}
                id="ClusterLeadSelect"
                onChangeSelect={(data) => onSelect(data, fieldNames.CLUSTER_LEADER)}
                selectedItem={filters.clusterLeader}
                query={clusterLeaderQuery}
                disabled={!filters.district || !clusterLeaderQuery}
              />
            </div>
            <div className="Ml-20">
              <SelectParkingLocation
                labelText={intl.formatMessage({ id: 'label.parkingLocation' })}
                id="ParkingLocationSelect"
                onChangeSelect={(data) => onSelect(data, fieldNames.PARKING_LOCATION)}
                selectedItem={filters.parkingLocation}
                query={parkingBayQuery}
                disabled={!filters.district || !parkingBayQuery}
              />
            </div>
            <div>
              <SelectDrop
                labelText={intl.formatMessage({ id: 'label.vehicleType' })}
                id="VehicleTypeSelect"
                dropListValues={pickListData.VehicleType}
                onChangeSelect={(data) => onSelect(data, fieldNames.VEHICLE_TYPE)}
                selectedItem={filters.vehicleType}
              />
            </div>
            <div className="Ml-20">
              <ToggleSelect
                selected={filters.vehicleStatus}
                values={pickListData.VtsVehicleStatus || []}
                labelText={intl.formatMessage({ id: 'label.vehicleStatus' })}
                onSelect={(data) => onSelect(data, fieldNames.VEHICLE_STATUS)}
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

VtsDashboardFilter.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  pickListData: PropTypes.object.isRequired,
  selectedFilterChips: PropTypes.array.isRequired,
};

export default injectIntl(VtsDashboardFilter);
