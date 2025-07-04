import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Map from './Map';
import ListActions from '../../../components/ListUtils/ListActions/ListActions';
import useList from '../../../common/hooks/useList';
import { withMapConfigProvider } from '../../../providers/withMapConfigProvider';
import { NearbyErvContext } from '../../../providers/withNearbyErvProvider';
import { ParkingBaysContext } from '../../../providers/withParkingBaysProvider';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import { NotificationContext } from '../../../providers/withNotificationProvider';
import { withPickListProvider } from '../../../providers/withPickListProvider';
import { convertStringToLatLong } from '../../../common/helpers/vehicles';
import { prepareErrorMessage } from '../../../common/helpers/notification';
import NearbyErvList from './List';
import useCustomState from '../../../common/hooks/useCustomState';
import VehicleDetails from './VehicleDetails';
import { fetchVehicleDetails } from '../../../api/vehicles';
import LoaderWithOverLay from '../../../components/Loader/LoaderWithOverLay';
import { maxDistanceRange } from './util';
import { mapTilePoints, mapApiType } from '../../../common/constants/map';

const INVALID_LAT_LONG = prepareErrorMessage({ code: 'INVALID_LAT_LONG' });

function NearbyErvWrap({
  intl,
  pickListData,
  mapConfigData,
}) {
  const { listState, setListStateValues } = useList({
    initialState: {
      pageSize: 25,
      pageNo: 0,
      searchText: [],
      nearByVehicleStatus: '',
    },
  });
  const [searchLatlon, setSearchLatLon] = useState(false);
  const [distanceRange, setDistanceRange] = useState(5000);
  const [isVehicleModal, setVehicleModal] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useCustomState({ isFetching: false, vehicleDetail: {} });
  const nearbyErvInfo = React.useContext(NearbyErvContext);
  const parkingBayInfo = React.useContext(ParkingBaysContext);
  const userConfig = React.useContext(UserConfigContext);
  const { pushNotification } = React.useContext(NotificationContext);

  const {
    isFetching = false,
    nearbyErvVehicles = {},
    displayNearbyErvVehicle = {},
  } = nearbyErvInfo.nearbyErv;

  const listDetails = (displayNearbyErvVehicle
    && displayNearbyErvVehicle.data
    && displayNearbyErvVehicle.data.content) || [];

  const parkingBayListDetails = (parkingBayInfo
    && parkingBayInfo.parkingBays
    && parkingBayInfo.parkingBays.info
    && parkingBayInfo.parkingBays.info.data) || [];
    const nearbyErvMapTileObject = mapConfigData && mapConfigData.find((item) => item.touchPoint === mapTilePoints.VTS_NEARBY_ERV_MAP);
    const nearbyErvMapTile = nearbyErvMapTileObject && nearbyErvMapTileObject.mapApiProvider;

  // Get Vehicle Details
  const fetchVehicleDetailsStart = () => {
    setVehicleDetails({ isFetching: true, vehicleDetail: {} });
  }

  const fetchVehicleDetailsSuccess = (_vehicleDetails) => {
    setVehicleDetails({ isFetching: false, vehicleDetail: _vehicleDetails.data });
    setVehicleModal(true);
  }

  const fetchVehicleDetailsError = (error) => {
    pushNotification(error);
    setVehicleDetails({ isFetching: false });
    setVehicleModal(false);
  }
  const getVehicleDetails = (query) => {
    fetchVehicleDetailsStart();
    fetchVehicleDetails({ ...query, userConfig: userConfig.userConfig })
      .then((res) => {
        fetchVehicleDetailsSuccess(res.body);
      })
      .catch((err) => {
        fetchVehicleDetailsError(err);
      });
  }

  function handleSearchText(val) {
    const values = convertStringToLatLong(val);
    if (!val.trim()) {
      setSearchLatLon(false);
      setListStateValues({ searchText: [], pageNo: 0 });
    } else if (values) {
      setListStateValues({ searchText: values, pageNo: 0, nearByVehicleStatus: { id: 'ALL', name: 'All'} });
      setSearchLatLon(values);
    } else {
      pushNotification(INVALID_LAT_LONG);
      setSearchLatLon(false);
      setListStateValues({ searchText: [], pageNo: 0 });
    }
  }

  function handleNearByVehicleStatusSelect(value) {
    setListStateValues({ nearByVehicleStatus: value });
  }

  function handleRefreshClick() {
    setListStateValues({ page: 0 });
  }

  const handleVehicleRegistrationNumberClick = (id) => {
    getVehicleDetails({ vehicleId: id });
  }

  const handleVehicleModalClose = () => {
    setVehicleModal(false);
    setVehicleDetails({ isFetching: false, vehicleDetail: {} });
  }

  useEffect(() => {
    if (!isFetching
      && nearbyErvVehicles
      && nearbyErvVehicles.data
      && nearbyErvVehicles.data.content
      && (nearbyErvVehicles.data.content.length < nearbyErvVehicles.data.totalElements)) {
      nearbyErvInfo.getNearbyErvVehiclesLoadMore(
        {
          ...listState,
          pageNo: nearbyErvVehicles.data.pageable.pageNumber + 1,
        }, userConfig,
      );
    }
    nearbyErvInfo.getDisplayNearbyErvVehicles({ ...listState, sliderValue: distanceRange }, false);
  }, [nearbyErvVehicles]);

  useEffect(() => {
    nearbyErvInfo.getDisplayNearbyErvVehicles({ ...listState, sliderValue: distanceRange }, false);
  }, [distanceRange]);

  useEffect(() => {
    if (listState.searchText.length) {
      nearbyErvInfo.getDisplayNearbyErvVehicles({ ...listState }, true, userConfig);
    }
  }, [listState]);

  useEffect(() => {
    parkingBayInfo.getParkingBaysList({ isNearbyErv: true }, userConfig);
  }, []);

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
    }}
    >
      <div
        className="Flex Font--S24 Font--WB"
        style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 28 }}
      >
        <div style={{ flex: '0 1 179px' }}>
          {intl.formatMessage({ id: 'view.nearbyErv.title.nearbyErv' })}
        </div>
      </div>
      <div
        style={{
          backgroundColor: 'white',
          maxWidth: '1200px',
          height: 'calc(100% - 80px)',
          marginTop: 28,
        }}
        className="BorderRadius--Base"
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {vehicleDetails.isFetching && <LoaderWithOverLay />}
          <div style={{ height: '100%', position: 'relative' }}>
            <div style={{ padding: '20px 20px 0px 20px' }}>
              <ListActions
                listDetails={(nearbyErvVehicles && nearbyErvVehicles.data) || {}}
                listState={listState}
                isFetching={isFetching}
                searchBoxPlaceholder="label.searchByLatLng"
                handleSearchText={handleSearchText}
                pickListData={pickListData}
                isIconButtonVisible
                isPaginationVisible={false}
                isDropSizeVisible={false}
                iconButtonProps={{
                  iconName: 'refresh',
                  labelText: intl.formatMessage({ id: 'label.refresh' }),
                  onClick: handleRefreshClick,
                  iconStyle: { verticalAlign: 'middle', marginRight: 12 },
                  disabled: !searchLatlon,
                }}
                isSliderVisible
                sliderValue={distanceRange}
                sliderRestProps={{
                  max: maxDistanceRange,
                  min: 1,
                  defaultValue: Math.floor(maxDistanceRange / 2),
                  onAfterChange: (value) => setDistanceRange(value),
                  disabled: !searchLatlon,
                }}
                isToggleButtonVisible
                toggleButtonRestProps={{
                  values: pickListData.NearByVehicleStatus || [],
                  selected: listState.nearByVehicleStatus,
                  onSelect: handleNearByVehicleStatusSelect,
                  disabled: !searchLatlon,
                }}
              />
            </div>
            <div style={{
              width: '100%', overflowX: 'auto', height: 'calc(100% - 90px)', overflowY: 'hidden', position: 'relative',
            }}
            >
              <Map
                listDetails={listDetails}
                searchLatLng={searchLatlon}
                isFetching={isFetching}
                distanceRange={distanceRange}
                parkingBayDetails={parkingBayListDetails}
                mapTile={nearbyErvMapTile}
              />
              {listState.searchText && listState.searchText.length
                && (
                  <div style={{
                    width: 'calc(100% - 40px)', position: 'absolute', zIndex: 1, bottom: 10, left: 20,
                  }}
                  >
                    <NearbyErvList
                      searchPoints={searchLatlon}
                      listDetails={listDetails}
                      onVehicleRegistrationNumberClick={handleVehicleRegistrationNumberClick}
                    />
                  </div>
                )}
            </div>
            {isVehicleModal
              && <VehicleDetails
                isVisible={isVehicleModal}
                vehicleDetail={vehicleDetails.vehicleDetail}
                onCancel={handleVehicleModalClose}
                locale={userConfig.userConfig.config && userConfig.userConfig.config.locale}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

NearbyErvWrap.defaultProps = {
  pickListData: {},
  mapConfigData: [],
};

NearbyErvWrap.propTypes = {
  intl: PropTypes.object.isRequired,
  pickListData: PropTypes.object,
  mapConfigData: PropTypes.object,
};

export default injectIntl(withMapConfigProvider(withPickListProvider(NearbyErvWrap, { version: 'v2' }), [
  {
    "mapApi": mapApiType.MAP_TILE,
    "touchPoint": mapTilePoints.VTS_NEARBY_ERV_MAP,
  },
]));
