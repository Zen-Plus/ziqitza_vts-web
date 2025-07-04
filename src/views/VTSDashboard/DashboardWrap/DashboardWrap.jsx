import React, { useEffect, useState, useRef } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Filter from './VtsDashboardFilter';
import Setting from './VtsDashboardSetting';
import List from './List';
import Map from './Map';
import DashboardHeaderTabs from './DashboardHeaderTabs';
import VehicleDetails, { VehicleDetailMap } from './VehicleDetails';
import ContentWrap from '../../../components/ContentWrap';
import ListActions from '../../../components/ListUtils/ListActions/ListActions';
import LoaderWithOverLay from '../../../components/Loader/LoaderWithOverLay';
import {
  getCheckedRows,
  getRemainingCheckedRows,
} from '../../../common/helpers/listUtils';
import { isEmpty } from '../../../common/helpers/commonUtils';
import { getHighestPriorityTab } from '../../../common/helpers/vehicles';
import useList from '../../../common/hooks/useList';
import useCustomState from '../../../common/hooks/useCustomState';
import { fetchVehicleCount, fetchVehicleDetails } from '../../../api/vehicles';
import { VehiclesContext } from '../../../providers/withVehiclesProvider';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import { NotificationContext } from '../../../providers/withNotificationProvider';
import { withPickListProvider } from '../../../providers/withPickListProvider';
import { withSystemParameterConfigProvider } from '../../../providers/withSystemParameterConfigProvider';
import { convertStringToLatLong } from '../../../common/helpers/vehicles';
import { validateCommaDeliminator } from '../../../common/helpers/validators';
import { prepareErrorMessage } from '../../../common/helpers/notification';
import CallStatus from './CallStatusModal/CallStatusModal';
import { fetchServiceRequestStatus } from '../../../api/serviceRequest';

const INVALID_LAT_LONG = prepareErrorMessage({ code: 'INVALID_LAT_LONG' });
const VTS_DASHBOARD = 'vtsDashboard';
const AUTO_REFRESH_ON_STATUS = 'ON';

function DashboardWrap({
  intl,
  pickListData,
  systemParameterConfigData,
}) {
  const { listState, setListStateValues } = useList({
    initialState: {
      pageSize: 25,
      pageNo: 0,
      sortBy: 'lastOffroadOrJobTime',
      sortDirection: 'ASC',
      searchText: '',
      trackingStatus: null,
    },
  });
  const [callStatusDetails, setCallStatusDetails] = useState(null);
  const [isCallStatusModal, setIsCallStatusModal] = useState(false);
  const [serviceRequestStatus, setServiceRequestStatus] = useState({});
  const [selectedFilters, setFilters] = useState({});
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedVehiclesDetails, setSelectedVehiclesDetails] = useState([]);
  const [searchCenter, setSearchCenter] = useState(false);
  const autoRefreshObject = systemParameterConfigData && systemParameterConfigData.find((value) => (value.key === VTS_DASHBOARD));
  const autoRefreshInterval = autoRefreshObject && autoRefreshObject.value;
  const autoRefreshOnStatusObject = pickListData && pickListData.AutoRefreshStatus
  && pickListData.AutoRefreshStatus.find((value) => (value.id === AUTO_REFRESH_ON_STATUS));
  const [selectedSettings, setSettings] = useState(
    {
      autoRefresh: autoRefreshOnStatusObject,
      refreshInterval: autoRefreshInterval
    }
  );
  const [vehicleConfig, setVehicleConfig] = useCustomState({
    isListView: true,
    selectedVehicleToView: null,
    distanceRange: 5000,
    isSelectedVehicleMapVisible: false,
    mapClicked: false,
  });
  const [vehicleCount, setVehicleCount] = useCustomState({ isFetching: false, vehiclesCount: {} });
  const [vehicleDetails, setVehicleDetails] = useCustomState({ isFetching: false, vehicleDetail: {} });
  const searchBarRef = useRef(null);
  const intervalRef = useRef(null);
  const { isListView, selectedVehicleToView, distanceRange, isSelectedVehicleMapVisible } = vehicleConfig;

  const vehiclesInfo = React.useContext(VehiclesContext);
  const userConfig = React.useContext(UserConfigContext);
  const { pushNotification } = React.useContext(NotificationContext);

  const {
    isFetching = false,
    info = {},
  } = vehiclesInfo.vehicles;

  const listDetails = (info && info.data && info.data.content) || [];

  function changePageSizeHandle(value) {
    setSelectedVehicles([]);
    setSelectedVehiclesDetails([]);
    setListStateValues({ pageSize: value, pageNo: 0 });
  }

  function pageBackward() {
    setListStateValues({ pageNo: listState.pageNo - 1 });
  }

  function pageForward() {
    setListStateValues({ pageNo: listState.pageNo + 1 });
  }

  function handleSearchText(val) {
    if (val.trim() !== listState.searchText.trim() || searchCenter) {
      setSelectedVehicles([]);
      setSelectedVehiclesDetails([]);
      if (!isListView && validateCommaDeliminator(val)) {
        const values = convertStringToLatLong(val)
        if (values) {
          setSearchCenter(values);
        } else {
          pushNotification(INVALID_LAT_LONG);
          setSearchCenter(false);
        }
      } else {
        setSearchCenter(false);
        setListStateValues({ searchText: val, pageNo: 0 });
      }
    }
  }

  const handleCheckBoxClick = (value) => {
    if (value && listDetails) {
      const _updatedRows = getCheckedRows({
        listDetails,
        selectedRowsIds: selectedVehicles,
      });
      setSelectedVehiclesDetails([...selectedVehiclesDetails,
      ..._updatedRows.selectedNewRowsDetail]);
      setSelectedVehicles(_updatedRows._selectedRows);
    } else {
      const _remainingRows = getRemainingCheckedRows({
        listDetails,
        selectedRowsIds: selectedVehicles,
        selectedRowsDetails: selectedVehiclesDetails,
      });
      setSelectedVehiclesDetails(_remainingRows._selectedRowsDetails);
      setSelectedVehicles(_remainingRows._selectedRows);
    }
  };

  function handleClickJobNumber(values) {
    if(!values || !values.serviceRequestId || !values.jobId) {
      return;
    }
    const payload = { id: values.serviceRequestId, jobId: values.jobId };
    setServiceRequestStatus({
      isProcessing : true,
      info : null,
    })
    setCallStatusDetails({ id: values.serviceRequestId, jobId: values.jobId });

    fetchServiceRequestStatus(payload, userConfig.userConfig)
      .then(res => {
        const { body: { data } } = res;
        setServiceRequestStatus({
          info: {
            data : {
              ...data,
            },
          },
          isProcessing : false,
        })
        setIsCallStatusModal(true);
      })
      .catch(err => {
        pushNotification(err);
        setIsCallStatusModal(false);
      })
  }

  function onCallStatusModalSaveClick(values) {
    const payload = { ...callStatusDetails, milestoneReportedType: values && values.id };
    fetchServiceRequestStatus(payload, userConfig.userConfig)
      .then(res => {
        const { body: { data } } = res;
        setServiceRequestStatus({
          info: {
            data : {
              ...data,
            },
          },
          isProcessing : false,
        })
      })
      .catch(err => {
        pushNotification(err);
      });
  }

  function onCallStatusModalCancelClick() {
    setCallStatusDetails({});
    setIsCallStatusModal(false);
    setServiceRequestStatus({});
  }

  function selectVehicle(key) {
    const selectedHospital = [...selectedVehicles];
    selectedHospital.push(key);
    const selectedHospitalsDetail = listDetails.filter((listItem) => listItem.id === key);
    setSelectedVehicles(selectedHospital);
    setSelectedVehiclesDetails([...selectedVehiclesDetails,
    ...selectedHospitalsDetail]);
  }

  function deSelectVehicle(key) {
    const selectedHospital = [...selectedVehicles];
    const index = selectedHospital.indexOf(key);
    const selectedHospitalsDetail = selectedVehiclesDetails.filter(
      (listItem) => listItem.id !== key,
    );
    selectedHospital.splice(index, 1);
    setSelectedVehicles(selectedHospital);
    setSelectedVehiclesDetails([...selectedHospitalsDetail]);
  }

  function handleSorting({ key, sortDirection }) {
    setSelectedVehicles([]);
    setSelectedVehiclesDetails([]);
    setListStateValues({ sortBy: key, sortDirection });
  }
  function handleSubmitFilter(filters) {
    setFilters(filters);
    setSelectedVehicles([]);
    setSelectedVehiclesDetails([]);
    setListStateValues({ pageNo: 0 });
  }

  function handleSubmitSetting(settings) {
    setSettings(settings);
  }
  // Get Vehicle Count
  const fetchVehicleCountStart = () => {
    setVehicleCount({ isFetching: true });
  }

  const fetchVehicleCountSuccess = (_vehiclesCount) => {
    setVehicleCount({ isFetching: false, vehiclesCount: _vehiclesCount.data });
    if (!listState.trackingStatus) {
      const selectedTab = getHighestPriorityTab(_vehiclesCount.data);
      setListStateValues({ trackingStatus: selectedTab });
    }
  }

  const fetchVehicleCountError = (error) => {
    pushNotification(error);
    setVehicleCount({ isFetching: false });
  }

  const getVehicleCount = () => {
    fetchVehicleCountStart();
    fetchVehicleCount({ userConfig: userConfig.userConfig })
      .then((res) => {
        fetchVehicleCountSuccess(res.body);
      })
      .catch((err) => {
        fetchVehicleCountError(err);
      });
  }

  // Get Vehicle Details
  const fetchVehicleDetailsStart = () => {
    setVehicleDetails({ isFetching: true, vehicleDetail: {} });
  }

  const fetchVehicleDetailsSuccess = (_vehicleDetails) => {
    setVehicleDetails({ isFetching: false, vehicleDetail: _vehicleDetails.data });
  }

  const fetchVehicleDetailsError = (error) => {
    pushNotification(error);
    setVehicleDetails({ isFetching: false });
    setVehicleConfig({ selectedVehicleToView: null, isSelectedVehicleMapVisible: false });
  }

  const getVehicleDetails = () => {
    fetchVehicleDetailsStart();
    fetchVehicleDetails({ vehicleId: selectedVehicleToView.id, userConfig: userConfig.userConfig })
      .then((res) => {
        fetchVehicleDetailsSuccess(res.body);
      })
      .catch((err) => {
        fetchVehicleDetailsError(err);
      });
  }

  const handleSelectTab = (val) => {
    const { trackingStatus } = val;
    if (listState.trackingStatus !== trackingStatus) {
      setSelectedVehicles([]);
      setSelectedVehiclesDetails([]);
      setListStateValues({ trackingStatus, searchText: '', pageNo: 0 });
      setVehicleConfig({ mapClicked: false })
      setSearchCenter(false);
      if (searchBarRef && searchBarRef.current) {
        searchBarRef.current.reset();
      }
    }
  }

  useEffect(() => {
    setListStateValues({ searchText: '' });
    setSearchCenter(false);
    setVehicleConfig({ mapClicked: false })
    if (searchBarRef && searchBarRef.current) {
      searchBarRef.current.reset();
    }
  }, [isListView]);

  useEffect(() => {
    if (!isListView && !isFetching && info && info.data && (listDetails.length < info.data.totalElements)) {
      vehiclesInfo.getVehiclesForMapViewLoadMore({ ...listState, pageNo: info.data.pageable.pageNumber + 1, selectedVehicles, filter: { ...selectedFilters } }, userConfig);
    }
  }, [listDetails]);

  useEffect(() => {
    if (listState.trackingStatus) {
      getVehicleCount();
      vehiclesInfo.getVehiclesList({ ...listState, selectedVehicles, filter: { ...selectedFilters } }, userConfig, isListView);
    }
  }, [listState]);

  useEffect(() => {
    if (selectedVehicleToView) {
      getVehicleDetails();
    }
  }, [selectedVehicleToView]);

  useEffect(() => {
    getVehicleCount();
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (selectedSettings
      && selectedSettings.autoRefresh
      && autoRefreshOnStatusObject
      && selectedSettings.autoRefresh.id === autoRefreshOnStatusObject.id
      && selectedSettings.refreshInterval
    ) {
      intervalRef.current = setInterval(() => {
        getVehicleCount();
        vehiclesInfo.getVehiclesList({ ...listState, selectedVehicles, filter: { ...selectedFilters } }, userConfig, isListView);
      }, selectedSettings.refreshInterval * 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    }
  }, [listState, selectedSettings]);

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
    }}
    >
      {(vehicleCount.isFetching || vehicleDetails.isFetching) && <LoaderWithOverLay />}
      <div
        className="Flex Font--S24 Font--WB Mt-20"
        style={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ flex: '0 1 179px' }}>
          {intl.formatMessage({ id: 'view.vehicles.title.vtsDashboard' })}
        </div>

        {listState.trackingStatus &&
          <DashboardHeaderTabs
            selectedTab={listState.trackingStatus}
            setSelectedTab={handleSelectTab}
            vehiclesCount={vehicleCount.vehiclesCount}
          />
        }
      </div>
      <div
        style={{
          backgroundColor: 'white',
          maxWidth: '1200px',
          height: 'calc(100% - 80px)',
        }}
        className="Mt-20 BorderRadius--Base"
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div style={{ padding: '20px', height: '100%', position: 'relative' }}>
            <ListActions
              listDetails={(info && info.data) || {}}
              listState={listState}
              changePageSize={changePageSizeHandle}
              pageBackward={pageBackward}
              pageForward={pageForward}
              isFetching={isFetching}
              searchBoxPlaceholder="label.searchByVehicleRegistrationNo"
              handleSearchText={handleSearchText}
              components={{ Filter, Setting }}
              settingRestProps={{
                settingIconName: 'settings',
                defaultRefreshInterval: autoRefreshInterval
              }}
              selectedFilters={selectedFilters}
              handleSubmitFilter={handleSubmitFilter}
              selectedSettings={selectedSettings}
              handleSubmitSetting={handleSubmitSetting}
              pickListData={pickListData}
              isIconButtonVisible={true}
              isPaginationVisible={isListView}
              isDropSizeVisible={isListView}
              searchBarRef={searchBarRef}
              iconButtonProps={{
                iconName: isListView ? 'view-map' : 'view-list',
                labelText: intl.formatMessage({ id: isListView ? 'label.viewMap' : 'label.viewList' }),
                onClick: () => setVehicleConfig({ isListView: !isListView, distanceRange: 5000 }),
                iconStyle: { verticalAlign: 'middle', marginRight: 12 }
              }}
              isSliderVisible={!isListView}
              sliderValue={distanceRange}
              sliderRestProps={{
                max: 50000,
                min: 1,
                defaultValue: 5000,
                onChange: (value) => setVehicleConfig({ distanceRange: value }),
                disabled: !searchCenter,
              }}
            />
            <ContentWrap isFetching={isFetching && isListView}>
              <div style={{
                width: '100%', overflowX: 'auto', height: 'calc(100% - 65px)', overflowY: 'hidden',
              }}
              >
                {isListView
                  ? <List
                    handleCheckBoxClick={handleCheckBoxClick}
                    handleSorting={handleSorting}
                    listState={listState}
                    listDetails={listDetails}
                    selectVehicle={selectVehicle}
                    deSelectVehicle={deSelectVehicle}
                    selectedVehicles={selectedVehicles}
                    setVehicleConfig={setVehicleConfig}
                    handleClickJobNumber={handleClickJobNumber}
                  />
                  : <Map
                    listDetails={listDetails}
                    setVehicleConfig={setVehicleConfig}
                    vehicleConfig={vehicleConfig}
                    searchCenter={searchCenter}
                    isFetching={isFetching}
                  />
                }
              </div>
            </ContentWrap>
            {!!(selectedVehicleToView && !isEmpty(vehicleDetails.vehicleDetail))
              && <VehicleDetails
                selectedVehicle={selectedVehicleToView.id}
                setVehicleDetailVisiblity={setVehicleConfig}
                isListView={isListView}
                vehicleDetail={vehicleDetails.vehicleDetail}
                setVehicleDetails={setVehicleDetails}
                locale={userConfig.userConfig.config && userConfig.userConfig.config.locale}
              />
            }
            {!!(selectedVehicleToView && isSelectedVehicleMapVisible && !isEmpty(vehicleDetails.vehicleDetail))
              && <VehicleDetailMap
                isModalVisible={isSelectedVehicleMapVisible}
                selectedVehicleDetails={vehicleDetails.vehicleDetail}
                setVehicleDetailMapVisiblity={setVehicleConfig}
                setVehicleDetails={setVehicleDetails}
              />
            }
            {
              isCallStatusModal
              && serviceRequestStatus
              && serviceRequestStatus.info
              && serviceRequestStatus.info.data
              && Object.keys(serviceRequestStatus.info.data).length
              && (
              <CallStatus
                isVisible={isCallStatusModal}
                onCancel={onCallStatusModalCancelClick}
                onSubmit={onCallStatusModalSaveClick}
                details={serviceRequestStatus}
              />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardWrap.defaultProps = {
  pickListData: {},
};

DashboardWrap.propTypes = {
  intl: PropTypes.object.isRequired,
  pickListData: PropTypes.object,
};

export default injectIntl(withSystemParameterConfigProvider(withPickListProvider(DashboardWrap, { version: 'v2' })));
