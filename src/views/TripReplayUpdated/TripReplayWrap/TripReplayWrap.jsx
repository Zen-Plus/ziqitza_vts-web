import React, {
  useState, useContext, useEffect,
} from 'react';
import { injectIntl } from 'react-intl';
import FileSaver from 'file-saver';
import PropTypes from 'prop-types';
import Button from '../../../components/Button';
import ReplayMap from './Map/Map';
import {
  exportVehicleGpsPacketInfoData as exportVehicleGpsPacketDataApi,
  exportGpsPacketData as exportGpsPacketDataApi,
  fetchTripReplayJobData as fetchTripReplayJobDataApi,
  fetchTripReplayVehicleData as fetchTripReplayVehicleDataApi,
  fetchTripReplayStData as fetchTripReplayStDataApi,
  fetchJobMilestone as fetchJobMilestoneApi,
  fetchStMilestone as fetchStMilestoneApi,
  exportJobData as exportJobDataApi,
} from '../../../api/tripReplay';
import { withMapConfigProvider } from '../../../providers/withMapConfigProvider';
import { withPickListProvider } from '../../../providers/withPickListProvider';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import { TripReplayPacketContext } from '../../../providers/withTripReplayPacketProvider';
import {
  createTripReplayPacketPayload,
  convertPacketsIntoLatLng,
  createSearchJobPayload,
  createSearchVehiclePayload,
  createSearchStPayload,
  searchParameter,
} from './util';
import { NotificationContext } from '../../../providers/withNotificationProvider';
import LoaderWithOverLay from '../../../components/Loader/LoaderWithOverLay';
import { fileTypes } from '../../../common/helpers/fileTypes';
import Form from './Form';
import TripSummary from './TripSummary';
import TripMilestone from './TripMilestone';
import { overrideErrorCode } from '../../../common/helpers/apiErrors';
import HasPermission from '../../../components/HasPermission';
import resources, { actions } from '../../../common/constants/resources';
import { mapTilePoints, mapApiType } from '../../../common/constants/map';

const { VTS } = resources;

const TripReplayWrap = ({ intl, pickListData, user, mapConfigData, }) => {
  const [searchData, setSearchData] = useState({});
  const [tripSummartData, setTripSummaryData] = useState({});
  const [tripMilestoneData, setTripMilestoneData] = useState({ visible: false, data: [] });
  const [loader, setLoader] = useState(false);
  const [isMapVisible, setMapVisiblity] = useState(false);
  const [dataPackets, setDataPackets] = useState([]);
  const [locationRequired, setLocationRequired] = useState(false);

  const userConfig = useContext(UserConfigContext);
  const tripReplayPacketContext = useContext(TripReplayPacketContext);
  const { pushNotification } = useContext(NotificationContext);
  const {
    isFetching = false,
    isFetchingLoadMore = false,
    info = {},
  } = tripReplayPacketContext.tripReplayPacket;
  const _tripReplayPacketList = info && info.data && info.data.content;
  const isSearchSt = searchData
    && searchData.searchParameter
      && (searchData.searchParameter.id === searchParameter.FUEL_TICKET_ID
        || searchData.searchParameter.id === searchParameter.OFF_ROAD_TICKET_ID)
  const tripReplayMapTileObject = mapConfigData && mapConfigData.find((item) => item.touchPoint === mapTilePoints.TRIP_REPLAY_MAP);
  const tripReplayMapTile = tripReplayMapTileObject && tripReplayMapTileObject.mapApiProvider;

  function fetchTripReplayJobData(query) {
    setLoader(true);
    setTripSummaryData({});
    setDataPackets([]);
    setTripMilestoneData({ visible: false, data: [] });
    fetchTripReplayJobDataApi(query, userConfig.userConfig).then((res) => {
      const { body: { data } } = res;
      if (data) {
        setTripSummaryData(data);
      } else {
        setTripSummaryData({});
      }
      setLoader(false);
    }).catch((error) => {
      const _error = overrideErrorCode({
        error,
        toOverride: 'ZQTZA0004',
        withCodes: ['JobNotFound', 'JobMedical', 'JobCancelled', 'JobNotClose', 'JobTimeExceed', 'DistanceInProgress'],
      });
      pushNotification(_error);
      setLoader(false);
    });
  }

  function fetchTripReplayStData(query) {
    setLoader(true);
    setTripSummaryData({});
    setDataPackets([]);
    setTripMilestoneData({ visible: false, data: [] });
    fetchTripReplayStDataApi(query, userConfig.userConfig).then((res) => {
      const { body: { data } } = res;
      if (data) {
        setTripSummaryData(data);
      } else {
        setTripSummaryData({});
      }
      setLoader(false);
    }).catch((error) => {
      const _error = overrideErrorCode({
        error,
        toOverride: 'ZQTZA0004',
        withCodes: ['SupportTicketNotFound', 'DistanceInProgress', 'SupportTicketNotClosed', 'SupportTicketTimeExceed'],
      });
      pushNotification(_error);
      setLoader(false);
    });
  }

  function fetchTripReplayVehicleData(query, values) {
    setLoader(true);
    setTripSummaryData({});
    setDataPackets([]);
    setTripMilestoneData({ visible: false, data: [] });
    fetchTripReplayVehicleDataApi(query, userConfig.userConfig)
      .then((res) => {
        setLoader(false);
        const { body: { data } } = res;
        if (data) {
          setSearchData({ ...values, imei: data });
        }
      }).catch((error) => {
        const _error = overrideErrorCode({
          error,
          toOverride: 'ZQTZA0004',
          withCodes: ['VehicleRegistrationNumber' ],
        });
        pushNotification(_error);
        setLoader(false);
      });
  }

  function handleSearchClick(values = {}) {
    tripReplayPacketContext.resetTripReplayPacket();
    setMapVisiblity(false);
    setSearchData(values);
    if (values.searchParameter && values.searchParameter.id === searchParameter.JOB_ID) {
      const _payload = createSearchJobPayload(values);
      fetchTripReplayJobData(_payload);
    } else if (values.searchParameter
        && values.searchParameter.id === searchParameter.VEHICLE_REGISTRATION_NUMBER) {
      const _payload = createSearchVehiclePayload(values);
      fetchTripReplayVehicleData(_payload, values);
    } else if (values.searchParameter
        && (values.searchParameter.id === searchParameter.FUEL_TICKET_ID
            || values.searchParameter.id === searchParameter.OFF_ROAD_TICKET_ID)) {
      const _payload = createSearchStPayload(values);
      fetchTripReplayStData(_payload);
    }
  }

  function exportVehicleGpsPacketData(query = {}) {
    setLoader(true);
    exportVehicleGpsPacketDataApi(query, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const fileName = 'GpsPacketData';
        const metadata = {
          type: fileTypes[query.fileType].type,
        };
        const fileNameWithExt = `${fileName}${new Date().toISOString()}${fileTypes[query.fileType].ext}`;
        const file = new File([data], fileNameWithExt, metadata);
        FileSaver.saveAs(file, fileNameWithExt);
        setLoader(false);
      }).catch((error) => {
        setLoader(false);
        pushNotification(error);
      });
  }

  function exportJobStGpsPacketData(query = {}) {
    setLoader(true);
    exportGpsPacketDataApi(query, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const fileName = 'GpsPacketData';
        const metadata = {
          type: fileTypes[query.fileType].type,
        };
        const fileNameWithExt = `${fileName}${new Date().toISOString()}${fileTypes[query.fileType].ext}`;
        const file = new File([data], fileNameWithExt, metadata);
        FileSaver.saveAs(file, fileNameWithExt);
        setLoader(false);
      }).catch((error) => {
        setLoader(false);
        pushNotification(error);
      });
  }

  function exportJobMilestoneData(query = {}) {
    setLoader(true);
    exportJobDataApi(query, userConfig.userConfig).then((res) => {
      const data = res.body;
      const fileName = 'JobMilestoneData';
      const metadata = {
        type: fileTypes[query.fileType].type,
      };
      const fileNameWithExt = `${fileName}${new Date().toISOString()}${fileTypes[query.fileType].ext}`;
      const file = new File([data], fileNameWithExt, metadata);
      FileSaver.saveAs(file, fileNameWithExt);
      setLoader(false);
    }).catch((error) => {
      setLoader(false);
      pushNotification(error);
    })
  }

  function handleClickOnExportMilestoneData() {
    if (searchData.searchParameter
      && (searchData.searchParameter.id === searchParameter.JOB_ID)) {
      const _query = { jobNumber: searchData && searchData.searchValue };
      exportJobMilestoneData({ ..._query, fileType: 'EXCEL' });
    }
  }

  function handleClickOnExportGpsPacketData() {

    if (searchData.searchParameter
      && (searchData.searchParameter.id === searchParameter.VEHICLE_REGISTRATION_NUMBER)) {
      const _query = createTripReplayPacketPayload(tripSummartData, searchData, locationRequired);
      exportVehicleGpsPacketData({ ..._query, fileType: 'EXCEL' });
    } else {
      const _query = createTripReplayPacketPayload(tripSummartData);
      exportJobStGpsPacketData({ ..._query, fileType: 'EXCEL' });
    }
    
  }

  function fetchJobMilestone(query, isLocationRequired) {
    setLoader(true);
    setTripMilestoneData({ visible: false, data: [] });
    fetchJobMilestoneApi(query, userConfig.userConfig)
      .then((res) => {
        const { body: { data } } = res;
        if (data) {
          setTripMilestoneData({ visible: isLocationRequired, data });
        } else {
          setTripMilestoneData({ visible: isLocationRequired, data: [] });
        }
        setLoader(false);
      }).catch((err) => {
        setTripMilestoneData({ visible: false, data: [] });
        setLoader(false);
        pushNotification(err);
      });
  }

  function fetchStMilestone(query, isLocationRequired) {
    setLoader(true);
    setTripMilestoneData({ visible: false, data: [] });
    fetchStMilestoneApi(query, userConfig.userConfig)
      .then((res) => {
        const { body: { data } } = res;
        if (data) {
          setTripMilestoneData({ visible: isLocationRequired, data });
        } else {
          setTripMilestoneData({ visible: isLocationRequired, data: [] });
        }
        setLoader(false);
      }).catch((err) => {
        pushNotification(err);
        setTripMilestoneData({ visible: false, data: [] });
        setLoader(false);
      });
  }

  function handleTripMileStoneShow(isLocationRequired = false) {
    if (searchData.searchParameter && searchData.searchParameter.id === searchParameter.JOB_ID) {
      const _payload = createSearchJobPayload(searchData, isLocationRequired);
      fetchJobMilestone(_payload, isLocationRequired);
    } else if (searchData.searchParameter
        && (searchData.searchParameter.id === searchParameter.FUEL_TICKET_ID
        || searchData.searchParameter.id === searchParameter.OFF_ROAD_TICKET_ID)) {
      const _payload = createSearchStPayload(searchData, isLocationRequired);
      fetchStMilestone(_payload, isLocationRequired);
    }
  }

  function fetchTripReplayPacketInfo(key = '') {
    if (tripSummartData && Object.keys(tripSummartData).length && !key) {
      const _query = createTripReplayPacketPayload(tripSummartData);
      tripReplayPacketContext.getTripReplayPacketInfo(_query, userConfig);
    }
    if (key === searchParameter.VEHICLE_REGISTRATION_NUMBER) {
      const _payload = createTripReplayPacketPayload(tripSummartData, { ...searchData });
      setMapVisiblity(true);
      tripReplayPacketContext.getTripReplayPacketInfo(_payload, userConfig);
    }
  }

  function handleReplayClick() {
    setMapVisiblity(true);
    if (searchData.searchParameter && searchData.searchParameter.id === searchParameter.VEHICLE_REGISTRATION_NUMBER) {
      fetchTripReplayPacketInfo(searchParameter.VEHICLE_REGISTRATION_NUMBER);
    } else {
      fetchTripReplayPacketInfo();
      if (tripMilestoneData && !tripMilestoneData.visible) {
        handleTripMileStoneShow(false);
      }
    }
  }

  function handleLocationRequiredClick() {
    setLocationRequired((value) => !value);
  }

  useEffect(() => {
    if (_tripReplayPacketList) {
      const _updatePacketsList = convertPacketsIntoLatLng(
        _tripReplayPacketList,
      );
      setDataPackets(_updatePacketsList);
      if (
        !isFetching
      && info.data
      && _tripReplayPacketList.length < info.data.totalElements
      ) {
        const _query = createTripReplayPacketPayload(tripSummartData, searchData);
        tripReplayPacketContext.getTripReplayPacketInfoLoadMore(
          { ..._query, pageNumber: info.data.pageable.pageNumber + 1 },
          userConfig,
        );
      }
    }
  }, [_tripReplayPacketList]);


  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        className="TripReplayWrap"
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 28,
        }}
      >
        <div className="Font--S24 Font--WB">
          {intl.formatMessage({ id: 'view.tripReplay.title.tripReplay' })}
        </div>
        <div
          style={{
            backgroundColor: 'white',
            width: '1200px',
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
            {loader ? <LoaderWithOverLay /> : null}
            <div
              style={{ padding: '20px', height: '100%', position: 'relative' }}
            >
              <div>
                <Form
                  onSubmit={handleSearchClick}
                  pickListData={pickListData}
                  locationRequired={locationRequired}
                  onLocationRequiredClick={handleLocationRequiredClick}
                />
              </div>
              <div className="Flex Mt-20">
                {tripSummartData && !!Object.keys(tripSummartData).length
                && (
                  <div style={{ flex: 1, marginRight: 20 }}>
                    {tripSummartData && !!Object.keys(tripSummartData).length && (
                    <div className="">
                      <TripSummary
                        details={tripSummartData}
                        isSearchSt={isSearchSt}
                      />
                    </div>
                    )}
                      <div className="Mt-20" style={{ minHeight: 220 }}>
                        {(tripMilestoneData.visible)
                          ? <TripMilestone details={tripMilestoneData.data} /> : (
                            <div style={{ textAlign: 'right' }}>
                              <Button type="default" onClick={() => handleTripMileStoneShow(true)} className="Font--S14" style={{ width: 175 }}>
                                {intl.formatMessage({ id: 'label.showTripMilestone' })}
                              </Button>
                            </div>
                          )}
                      </div>
                      <div className="Flex" style={{ justifyContent: 'flex-end' }}>
                        <HasPermission
                        resourceKey={VTS.TRIP_REPLAY.resourceKey}
                        permissions={[actions.CREATE]}
                        user={user}
                        >
                          {(searchData.searchParameter
                            && searchData.searchParameter.id === searchParameter.JOB_ID)
                            && (
                            <Button onClick={handleClickOnExportMilestoneData} type="default" className="Font--S14 Mt-20 Mr-20" style={{ width: 275 }}>
                            {intl.formatMessage({ id: 'label.exportMilestoneData' })}
                          </Button>
                          )}
                          <Button onClick={handleClickOnExportGpsPacketData} type="default" className="Font--S14 Mt-20" style={{ width: 275 }}>
                            {intl.formatMessage({ id: 'label.exportGpsPacketDetails' })}
                          </Button>
                        </HasPermission>
                      </div>
                  </div>
                )}
                {((tripSummartData && !!Object.keys(tripSummartData).length)
                  || (searchData.searchParameter
                      && searchData.searchParameter.id
                        === searchParameter.VEHICLE_REGISTRATION_NUMBER && searchData.imei))
              && (
              <div style={{ flex: 1 }}>
                <ReplayMap
                  isMapVisible={isMapVisible}
                  locationsMarker={tripMilestoneData.data}
                  packetDataList={dataPackets}
                  isProcessing={isFetching || isFetchingLoadMore}
                  onReplayClick={handleReplayClick}
                  searchParameterValue={searchData && searchData.searchParameter && searchData.searchParameter.id}
                  mapTile={tripReplayMapTile}
                />
                {(searchData.searchParameter
                  && searchData.searchParameter.id === searchParameter.VEHICLE_REGISTRATION_NUMBER)
                && (
                  <HasPermission
                  resourceKey={VTS.TRIP_REPLAY.resourceKey}
                  permissions={[actions.CREATE]}
                  user={user}
                  >
                    <div className="Mt-20" style={{ textAlign: 'right', marginRight: 20 }}>
                      <Button onClick={handleClickOnExportGpsPacketData} type="default" className="Font--S14" style={{ width: 275 }}>
                        {intl.formatMessage({ id: 'label.exportGpsPacketDetails' })}
                      </Button>
                    </div>
                </HasPermission>
                )}
              </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TripReplayWrap.defaultProps = {
  mapConfigData: [],
};

TripReplayWrap.propTypes = {
  intl: PropTypes.object.isRequired,
  pickListData: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  mapConfigData: PropTypes.object,
};

export default withMapConfigProvider(withPickListProvider(injectIntl(TripReplayWrap), { version: 'v1' }), [
  {
    "mapApi": mapApiType.MAP_TILE,
    "touchPoint": mapTilePoints.TRIP_REPLAY_MAP,
  }
]);
