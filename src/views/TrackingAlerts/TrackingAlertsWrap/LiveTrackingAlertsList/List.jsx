import React, { useState, useEffect, useRef } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Filter from './LiveTrackingAlertsFilter';
import HeaderRow from './HeaderRow';
import ListRow from './ListRow';
import AlertDetails from '../AlertDetails';
import Icon from '../../../../components/Icon';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import Scrollbars from '../../../../components/Scrollbar';
import ContentWrap from '../../../../components/ContentWrap';
import ListActions from '../../../../components/ListUtils/ListActions/ListActions';
import useCustomState from '../../../../common/hooks/useCustomState';
import useList from '../../../../common/hooks/useList';
import { TrackingAlertsContext } from '../../../../providers/withTrakingAlertsProvider';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';
import { fetchAlertDetails, checkAlertLock, updateAlert } from '../../../../api/trackingAlerts';
import AlertReasonModal from '../AlertReason';
import { NotificationContext } from '../../../../providers/withNotificationProvider';
import { createAlertPayload } from './util';
import { prepareErrorMessage } from '../../../../common/helpers/notification';
import LoaderWithOverLay from '../../../../components/Loader/LoaderWithOverLay';
import VehicleDetails from '../VehicleDetails';
import { fetchVehicleDetails } from '../../../../api/vehicles';
import Setting from './LiveTrackingAlertReportSetting';


const ALERT_ALREADY_PICKED = prepareErrorMessage({ code: 'ALERT_ALREADY_PICKED' });
const AUTO_REFRESH_ON_STATUS = 'ON';

function List({
  intl,
  setTrackingAlertsView,
  setSettings,
  selectedSettings,
  pickListData,
}) {
  const { listState, setListStateValues } = useList({
    initialState: {
      pageSize: 25,
      pageNo: 0,
      sortBy: '',
      sortDirection: '',
      searchText: '',
    },
  });

  const [selectedFilters, setFilters] = useState({});
  const [alertCountToView, setAlertCountToView] = useState({});
  const [openAlertToView, setOpenAlertToView] = useState({});
  const [overLayLoader, setOverLayLoader] = useState(false);
  const [alertDetails, setAlertDetails] = useCustomState(
    {
      isFetching: false,
      info: [],
    },
  );
  const [isVehicleModal, setVehicleModal] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useCustomState({ isFetching: false, vehicleDetail: {} });
  const trackingAlertsInfo = React.useContext(TrackingAlertsContext);
  const userConfig = React.useContext(UserConfigContext);
  const { pushNotification } = React.useContext(NotificationContext);
  const intervalRef = useRef(null);
  const {
    isFetching = false,
    info = {},
  } = trackingAlertsInfo.trackingAlerts;

  const listDetails = (info
    && info.data && info.data.content) || [];

  // Get Alert Details
  const fetchAlertDetailsStart = () => {
    setAlertDetails({ isFetching: true, info: [] });
  };

  const fetchAlertDetailsSuccess = (state) => {
    setAlertDetails({ isFetching: false, info: state.data.content });
  };

  const fetchAlertDetailsError = (error) => {
    pushNotification(error);
    setAlertDetails({ isFetching: false });
    setAlertCountToView({});
  };

  const getAlertDetails = (query) => {
    fetchAlertDetailsStart();
    fetchAlertDetails({
      ...query
    }, userConfig.userConfig)
      .then((res) => {
        fetchAlertDetailsSuccess(res.body);
      })
      .catch((err) => {
        fetchAlertDetailsError(err);
      });
  };
  // Get Vehicle Details
  const fetchVehicleDetailsStart = () => {
    setOverLayLoader(true);
    setVehicleDetails({ isFetching: true, vehicleDetail: {} });
  }

  const fetchVehicleDetailsSuccess = (_vehicleDetails) => {
    setOverLayLoader(false);
    setVehicleDetails({ isFetching: false, vehicleDetail: _vehicleDetails.data });
    setVehicleModal(true);
  }

  const fetchVehicleDetailsError = (error) => {
    setOverLayLoader(false);
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

  function changePageSizeHandle(value) {
    setListStateValues({ pageSize: value, pageNo: 0 });
  }

  function pageBackward() {
    setListStateValues({ pageNo: listState.pageNo - 1 });
  }

  function pageForward() {
    setListStateValues({ pageNo: listState.pageNo + 1 });
  }

  function handleSearchText(val) {
    if (val.trim() !== listState.searchText.trim()) {
      setListStateValues({ searchText: val, pageNo: 0 });
    }
  }


  function handleSorting({ key, sortDirection }) {
    setListStateValues({ sortBy: key, sortDirection });
  }

  function handleSubmitFilter(filters) {
    setFilters(filters);
    setListStateValues({ pageNo: 0 });
  }
  function handleSubmitSetting(settings) {
    setSettings(settings);
  }

  const handleAlertCountClick = (value) => {
    setAlertCountToView(value);
  };

  const handleAlertDetailsCancel = () => {
    setAlertCountToView({});
  };

  const handleOpenAlertClick = (value) => {
    setOverLayLoader(true)
    checkAlertLock({ id: value.alertId, isLocked: true }, userConfig.userConfig)
      .then(() => {
        setOpenAlertToView(value);
        setOverLayLoader(false);
      }).catch((error) => {
        const { apierror } = error;
        if (apierror.code === 'ZQTZA0018') {
          pushNotification(ALERT_ALREADY_PICKED);
        } else {
          pushNotification(error);
        }
        setOverLayLoader(false);
      });
  };
  const handleAlertReasonModalClose = () => {
    checkAlertLock({ id: openAlertToView.alertId, isLocked: false }, userConfig.userConfig)
    .catch((error) => {
        pushNotification(error);
    });
    setOpenAlertToView({});
    setAlertDetails({ info: {} });
    setVehicleModal(false);
    setVehicleDetails({ isFetching: false, vehicleDetail: {} });
  };
  const handleAlertReasonModalCloseClick = (values, name) => {
    const payload = createAlertPayload(values);

    if (name === 'closeException') {
      payload.isCloseException = true;
    } else if (name === 'close') {
      payload.isCloseException = false;
    }

    updateAlert({ ...payload }, userConfig.userConfig)
      .then(() => {
        handleAlertReasonModalClose();
        setListStateValues({});
      })
      .catch((error) => { pushNotification(error) });
  };
  const handleVehicleRegistrationNumberViewClick = (id) => {
    getVehicleDetails({ vehicleId: id });
  }

  const handleVehicleModalClose = () => {
    setVehicleModal(false);
    setVehicleDetails({ isFetching: false, vehicleDetail: {} });
  }

  useEffect(() => {
    if (Object.keys(alertCountToView).length) {
      getAlertDetails({ vehicleId: alertCountToView.vehicleId, isHistory: false, jobId: alertCountToView.jobId });
    }
  }, [alertCountToView]);

  useEffect(() => {
    if (Object.keys(openAlertToView).length) {
      getAlertDetails({ alertId: openAlertToView.alertId, isHistory: false });
    }
  }, [openAlertToView]);

  useEffect(() => {
    trackingAlertsInfo.getTrackingAlertsList({
      ...listState,
      filter: { ...selectedFilters },
    }, userConfig,
    'live');
  }, [listState]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const _autoRefreshOnStatusObject = pickListData 
    && pickListData.AutoRefreshStatus
    && pickListData.AutoRefreshStatus.length
    && pickListData.AutoRefreshStatus.find((value) => (value.id === AUTO_REFRESH_ON_STATUS));
    
    if (openAlertToView
      && !Object.keys(openAlertToView).length
      && selectedSettings
      && selectedSettings.autoRefresh
      && selectedSettings.autoRefresh.id === _autoRefreshOnStatusObject.id
      && selectedSettings.refreshInterval
      ) {
      intervalRef.current = setInterval(() => {
        setListStateValues({ pageNo: 0 });
      }, selectedSettings.refreshInterval * 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    }
  }, [openAlertToView, listState, selectedSettings])

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
    }}
    >
      <div
        className="Flex Font--S24 Font--WB"
        style={{ alignItems: 'center', marginTop: '28px' }}
      >
        {intl.formatMessage({ id: 'view.trackingAlerts.title.trackingAlertsDashboard' })}
      </div>
      <div
        style={{
          backgroundColor: 'white',
          maxWidth: '1200px',
          height: 'calc(100% - 80px)',
          marginTop: '28px',
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
          {overLayLoader && <LoaderWithOverLay />}
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
              selectedFilters={selectedFilters}
              handleSubmitFilter={handleSubmitFilter}
              selectedSettings={selectedSettings}
              handleSubmitSetting={handleSubmitSetting}
              pickListData={pickListData}
              isIconButtonVisible
              iconButtonProps={{
                iconName: 'history',
                labelText: intl.formatMessage({ id: 'label.alertsHistory' }),
                onClick: () => { setTrackingAlertsView({ type: 'historyTrackingAlerts' }) },
                iconStyle: { verticalAlign: 'middle', marginRight: 8 },
                disabled: isFetching,
              }}
            />

            <ContentWrap isFetching={isFetching}>
              <div style={{
                width: '100%', overflowX: 'auto', height: 'calc(100% - 65px)', overflowY: 'hidden',
              }}
              >
                <div style={{ minWidth: '1160px', height: '100%' }}>
                  <table className="ListMaster Width-Full">
                    <HeaderRow
                      changeSort={handleSorting}
                      listState={listState}
                    />
                  </table>
                  {!listDetails.length
                    ? (
                      <div
                        style={{
                          width: '25%',
                          margin: '91px auto',
                        }}
                      >
                        <div style={{
                          textAlign: 'center',
                        }}
                        >
                          <Icon name="search-not-found" />
                        </div>

                        <div style={{ marginTop: '24px', textAlign: 'center' }}>
                          {intl.formatMessage({ id: 'label.noRecordsFound' })}
                        </div>
                      </div>
                    ) : (
                      <Scrollbars style={{ height: 'calc(100% - 50px)' }}>
                        <table className="ListMaster">
                          <ListItemIterator
                            listDetails={listDetails}
                            ListItem={ListRow}
                            handleAlertCountClick={handleAlertCountClick}
                            handleOpenAlertClick={handleOpenAlertClick}
                          />
                        </table>
                      </Scrollbars>
                    )}
                </div>
              </div>
            </ContentWrap>
            {!!Object.keys(alertCountToView).length
              && (
                <AlertDetails
                  selectedAlert={alertCountToView}
                  onCancel={handleAlertDetailsCancel}
                  alertDetails={alertDetails}
                />
              )}
            {!!Object.keys(openAlertToView).length
              && alertDetails && alertDetails.info
              && !!alertDetails.info.length
              && (
                <AlertReasonModal
                  details={alertDetails}
                  visible={!!openAlertToView}
                  handleAlertReasonModalClose={handleAlertReasonModalClose}
                  onSubmit={handleAlertReasonModalCloseClick}
                  pushNotification={pushNotification}
                  onVehicleRegistrationViewClick={handleVehicleRegistrationNumberViewClick}
                />
              )}
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

List.defaultProps = {
  pickListData: {},
};

List.propTypes = {
  intl: PropTypes.object.isRequired,
  setTrackingAlertsView: PropTypes.func.isRequired,
  pickListData: PropTypes.object,  
  setSettings: PropTypes.object.isRequired,
  selectedSettings: PropTypes.func.isRequired,
};

export default injectIntl(List);
