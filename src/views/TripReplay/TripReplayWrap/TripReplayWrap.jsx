import React, { useState, useContext, useEffect, useRef } from "react";
import { injectIntl } from "react-intl";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import ReplayMap from "./Map/Map";
import {
  fetchJobData as fetchJobDataApi,
  exportJobData as exportJobDataApi,
  exportGpsPacketData as exportGpsPacketDataApi
} from "../../../api/tripReplay";
import { UserConfigContext } from "../../../providers/withUserConfigProvider";
import { TripReplayPacketContext } from "../../../providers/withTripReplayPacketProvider";
import {
  getInitialJobData,
  createTripReplayPacketPayload,
  convertPacketsIntoLatLng,
  createLocationMarkerList,
} from "./util";
import { NotificationContext } from '../../../providers/withNotificationProvider';
import LoaderWithOverLay from "../../../components/Loader/LoaderWithOverLay";
import Icon from '../../../components/Icon';
import FileSaver from 'file-saver';
import { fileTypes } from '../../../common/helpers/fileTypes';

const TripReplayWrap = ({ intl }) => {
  const [searchValue, setSearchValue] = useState("");
  const searchValueRef = useRef(null);
  const [jobData, setJobData] = useState({ isFetching: false, info: {} });
  const [dataPackets, setDataPackets] = useState([]);
  const [locationsMarker, setLocationsMarker] = useState([]);
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [loader, setLoader] = useState(false);

  const userConfig = useContext(UserConfigContext);
  const tripReplayPacketContext = useContext(TripReplayPacketContext);
  const { pushNotification } = useContext(NotificationContext);
  const {
    isFetching = false,
    isFetchingLoadMore = false,
    info = {},
  } = tripReplayPacketContext.tripReplayPacket;
  const _tripReplayPacketList = info && info.data && info.data.content;


  function exportGpsPacketData(query = {}) {
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
      })
  }

  function exportJobData(query = {}) {
    setLoader(true);
    exportJobDataApi(query, userConfig.userConfig).then((res) => {
      const data = res.body;
      const fileName = 'JobData';
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

  function handleClickOnExportJobData() {
    exportJobData({ jobNumber: searchValueRef.current, fileType: 'EXCEL' });
  }
  function handleClickOnExportGpsPacketData() {
    if (jobData && jobData.info && Object.keys(jobData.info).length) {
      const _query = createTripReplayPacketPayload(jobData.info);
      exportGpsPacketData({ ..._query, fileType: 'EXCEL' });
    }
  }
  function onSearchChange(event) {
    const _value = event && event.target && event.target.value;
    setSearchValue(_value);
  }

  function fetchJobData(query) {
    setJobData({ isFetching: true, info: {} });
    fetchJobDataApi(query, userConfig.userConfig)
      .then((res) => {
        const _data = res && res.body && res.body.data;
        const _values = getInitialJobData(_data);
        if (!Object.keys(_values).length) {
          setNoRecordFound(true);
        }
        setJobData({ isFetching: false, info: _values });
      })
      .catch((error) => {
        setJobData({ isFetching: false, info: {} });
        pushNotification(error);
      });
  }

  function handleSearchClick() {
    searchValueRef.current = searchValue;
    if (searchValue) {
      tripReplayPacketContext.resetTripReplayPacket();
      setJobData({ isFetching: false, info: {} });
      setNoRecordFound(false);
      setDataPackets([]);
      setLocationsMarker([]);
      fetchJobData({
        jobNumber: searchValue,
      });
    }
  }

  useEffect(() => {
    if (jobData && jobData.info && Object.keys(jobData.info).length) {
      const _query = createTripReplayPacketPayload(jobData.info);
      const _locationMarkersList = createLocationMarkerList(jobData.info);
      setLocationsMarker(_locationMarkersList);
      tripReplayPacketContext.getTripReplayPacket(_query, userConfig);
    }
  }, [jobData]);

  useEffect(() => {
    if (_tripReplayPacketList) {
      const _updatePacketsList = convertPacketsIntoLatLng(
        _tripReplayPacketList
      );
      setDataPackets(_updatePacketsList);
      if (
        !isFetching &&
        info.data &&
        _tripReplayPacketList.length < info.data.totalElements
      ) {
        const _query = createTripReplayPacketPayload(jobData.info);
        tripReplayPacketContext.getTripReplayPacketLoadMore(
          { ..._query, pageNumber: info.data.pageable.pageNumber + 1 },
          userConfig
        );
      }
    }
  }, [_tripReplayPacketList]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="TripReplayWrap"
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 28,
        }}
      >
        <div className="Font--S24 WFont--B">
          {intl.formatMessage({ id: "view.tripReplay.title.tripReplay" })}
        </div>
        <div
          style={{
            backgroundColor: "white",
            width: "1200px",
            height: "calc(100% - 80px)",
            marginTop: 28,
          }}
          className="BorderRadius--Base"
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {isFetchingLoadMore || jobData.isFetching || loader ? <LoaderWithOverLay /> : null}
            <div
              style={{ padding: "20px", height: "100%", position: "relative" }}
            >
              <div className="Flex Mt-20">
                <div className="Field">
                  <Input
                    labelText={intl.formatMessage({
                      id: "label.searchParameter",
                    })}
                    maxLength={20}
                    value={intl.formatMessage({ id: "label.jobNumber" })}
                    isReadonly
                  />
                </div>
                <div className="Field SearchValue">
                  <Input
                    labelText={intl.formatMessage({ id: "label.searchValue*" })}
                    placeholder={intl.formatMessage({
                      id: "label.searchValue",
                    })}
                    value={searchValue}
                    onChange={onSearchChange}
                    maxLength={20}
                  />
                </div>
                <div className="Ml-20" style={{ alignSelf: "flex-end" }}>
                  <Button
                    onClick={handleSearchClick}
                    disabled={!searchValue || isFetchingLoadMore || jobData.isFetching}
                  >
                    {intl.formatMessage({ id: "label.search" })}
                  </Button>
                </div>
                <div className="Ml-20" style={{ alignSelf: "flex-end" }}>
                  <Button
                    onClick={handleClickOnExportJobData}
                    disabled={isFetchingLoadMore || jobData.isFetching || !searchValueRef.current}
                  >
                    {intl.formatMessage({ id: "label.exportJobData" })}
                  </Button>
                </div>
                <div className="Ml-20" style={{ alignSelf: "flex-end" }}>
                  <Button
                    onClick={handleClickOnExportGpsPacketData}
                    disabled={isFetchingLoadMore
                      || jobData.isFetching
                      || !searchValueRef.current
                      || (info && info.data && info.data.empty)
                      || !(jobData && jobData.info && Object.keys(jobData.info).length)}
                  >
                    {intl.formatMessage({ id: "label.exportGpsPacketData" })}
                  </Button>
                </div>
              </div>
              {dataPackets.length && !isFetchingLoadMore ? (
                <div>
                  <ReplayMap
                    packetDataList={dataPackets}
                    locationsMarker={locationsMarker}
                    isFetchingLoadMore={isFetchingLoadMore}
                  />
                </div>
              ) : null}
              {noRecordFound || (info && info.data && info.data.empty) ?
                <div
                  style={{
                    width: '25%',
                    margin: '80px auto',
                  }}
                >
                  <div style={{
                    textAlign: 'center',
                  }}
                  >
                    <Icon name="search-not-found" />
                  </div>

                  <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    {intl.formatMessage({ id: 'label.noDataFound' })}
                  </div>
                </div>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(TripReplayWrap);
