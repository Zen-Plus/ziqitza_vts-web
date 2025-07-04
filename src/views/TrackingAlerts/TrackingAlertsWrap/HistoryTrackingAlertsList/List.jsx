import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Filter from './HistoryTrackingAlertsFilter';
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
import { fetchHistoryAlertDetails } from '../../../../api/trackingAlerts';
import { NotificationContext } from '../../../../providers/withNotificationProvider';

function List({
  intl,
  setTrackingAlertsView,
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
  const [alertDetails, setAlertDetails] = useCustomState(
    {
      isFetching: false,
      info: [],
    },
  );
  const trackingAlertsInfo = React.useContext(TrackingAlertsContext);
  const userConfig = React.useContext(UserConfigContext);
  const { pushNotification } = React.useContext(NotificationContext);

  const {
    isFetching = false,
    info = {},
  } = trackingAlertsInfo.trackingAlerts;

  const listDetails = (info
    && info.data && info.data.content) || [];

  // Get Alert Details
  const fetchHistoryAlertDetailsStart = () => {
    setAlertDetails({ isFetching: true, info: [] });
  };

  const fetchHistoryAlertDetailsSuccess = (state) => {
    setAlertDetails({ isFetching: false, info: state.data.content });
  };

  const fetchHistoryAlertDetailsError = (error) => {
    pushNotification(error);
    setAlertDetails({ isFetching: false });
    setAlertCountToView({});
  };

  const getAlertDetails = (query) => {
    fetchHistoryAlertDetailsStart();
    fetchHistoryAlertDetails({
      ...query
    }, userConfig.userConfig)
      .then((res) => {
        fetchHistoryAlertDetailsSuccess(res.body);
      })
      .catch((err) => {
        fetchHistoryAlertDetailsError(err);
      });
  };

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

  const handleAlertCountClick = (value) => {
    setAlertCountToView(value);
  };

  const handleAlertDetailsCancel = () => {
    setAlertCountToView({});
  };


  useEffect(() => {
    if (Object.keys(alertCountToView).length) {
      getAlertDetails({ vehicleId: alertCountToView.vehicleId, isHistory: false, jobId: alertCountToView.jobId });
    }
  }, [alertCountToView]);


  useEffect(() => {
    trackingAlertsInfo.getTrackingAlertsList({
      ...listState,
      filter: { ...selectedFilters },
    }, userConfig,
    'history');
  }, [listState]);

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
          <div style={{ padding: '20px', height: '100%', position: 'relative' }}>
            <ListActions
              listDetails={(info && info.data) || {}}
              listState={listState}
              changePageSize={changePageSizeHandle}
              pageBackward={pageBackward}
              pageForward={pageForward}
              isFetching={isFetching}
              searchBoxPlaceholder="label.searchByvehicleRegistrationNumber"
              handleSearchText={handleSearchText}
              components={{ Filter }}
              selectedFilters={selectedFilters}
              handleSubmitFilter={handleSubmitFilter}
              pickListData={pickListData}
              isIconButtonVisible
              iconButtonProps={{
                iconName: 'live',
                labelText: intl.formatMessage({ id: 'label.liveAlerts' }),
                onClick: () => { setTrackingAlertsView({ view: 'liveTrackingAlert' }) },
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
};

export default injectIntl(List);
