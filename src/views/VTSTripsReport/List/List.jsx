import React, { useEffect, useState, useRef } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import Filter from './TripsReportFilter';
import TripDetails from '../TripDetails';
import ContentWrap from '../../../components/ContentWrap';
import ListActions from '../../../components/ListUtils/ListActions/ListActions';
import useList from '../../../common/hooks/useList';
import useCustomState from '../../../common/hooks/useCustomState';
import { TripsReportContext } from '../../../providers/withTripsReportsProvider';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import HeaderRow from './HeaderRow';
import Icon from '../../../components/Icon';
import Scrollbars from '../../../components/Scrollbar';
import ListItemIterator from '../../../components/ListUtils/ListItemIterator';
import ListRow from './ListRow';
import ActionsFooter from '../../../components/ActionsFooter';
import { NotificationContext } from '../../../providers/withNotificationProvider';
import LoaderWithOverLay from '../../../components/Loader/LoaderWithOverLay';
import { fetchTripDetails } from '../../../api/tripsReport';
import {
  getCheckedRows,
  getRemainingCheckedRows,
  checkForSelectedAll,
} from '../../../common/helpers/listUtils';
import { getPrintTitleHeading } from '../util';
import { withPickListProvider } from '../../../providers/withPickListProvider';

function List({
  intl,
  pickListData,
  isZhlReport,
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
  const tripsReportInfo = React.useContext(TripsReportContext);
  const userConfig = React.useContext(UserConfigContext);
  const { pushNotification } = React.useContext(NotificationContext);
  const [tripIdToView, setTripIdToView] = useState({});
  const [selectedTripsReports, setSelectedTripsReport] = useState([]);
  const [selectedTripsReportsDetails, setSelectedTripsReportDetails] = useState([]);
  const [selectedFilters, setFilters] = useState({});
  const dateRef = useRef();
  const [tripDetails, setTripDetails] = useCustomState(
    {
      isFetching: false,
      info: [],
    },
  );

  const {
    isFetching = false,
    info = {},
    isFetchingExports,
    isFetchingAll,
  } = tripsReportInfo.tripsReport;
  
  const data = (info && info.data) || {};
  const listDetails = (data && data.tripReportResources && data.tripReportResources.content) || [];
  const fromDate = (data.fromDate && moment(data.fromDate).format('DD MMM YYYY hh:mm A')) || 'NA';
  const toDate = (data.toDate && moment(data.toDate).format('DD MMM YYYY hh:mm A')) || 'NA';
  let dataToPrint = [];
  dataToPrint = selectedTripsReportsDetails;

  if (info.printAllData) {
    dataToPrint = info.printAllData;
  }

  // Get Trip Details
  const fetchTripDetailsStart = () => {
    setTripDetails({ isFetching: true, info: [] });
  };

  const fetchTripDetailsSuccess = (state) => {
    setTripDetails({ isFetching: false, info: state.data });
  };

  const fetchTripDetailsError = (error) => {
    pushNotification(error);
    setTripDetails({ isFetching: false });
    setTripIdToView({});
  };

  const getTripDetails = (query) => {
    fetchTripDetailsStart();
    fetchTripDetails({
      ...query
    }, userConfig.userConfig)
      .then((res) => {
        fetchTripDetailsSuccess(res.body);
      })
      .catch((err) => {
        fetchTripDetailsError(err);
      });
  };

  function changePageSizeHandle(value) {
    setSelectedTripsReport([]);
    setSelectedTripsReportDetails([]);
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
      setSelectedTripsReport([]);
      setSelectedTripsReportDetails([]);
      setListStateValues({ searchText: val, pageNo: 0 });
    }
  }

  const handleCheckBoxClick = (value) => {
    if (value && listDetails) {
      const _updatedRows = getCheckedRows({ listDetails, selectedRowsIds: selectedTripsReports, keyToMatch: 'id' });
      setSelectedTripsReportDetails([...selectedTripsReportsDetails,
        ..._updatedRows.selectedNewRowsDetail]);
      setSelectedTripsReport(_updatedRows._selectedRows);
    } else {
      const _remainingRows = getRemainingCheckedRows({
        listDetails,
        selectedRowsIds: selectedTripsReports,
        selectedRowsDetails: selectedTripsReportsDetails,
        keyToMatch: 'id',
      });
      setSelectedTripsReportDetails(_remainingRows._selectedRowsDetails);
      setSelectedTripsReport(_remainingRows._selectedRows);
    }
  };

  function selectTripsReport(key) {
    const selectedTripsReport = [...selectedTripsReports];
    selectedTripsReport.push(key);
    const selectedTripsReportsDetail = listDetails
      .filter(
        (listItem) => listItem.id
        === key,
      );
    setSelectedTripsReport(selectedTripsReport);
    setSelectedTripsReportDetails(
      [...selectedTripsReportsDetails,
        ...selectedTripsReportsDetail],
    );
  }

  function deSelectTripsReport(key) {
    const selectedTripsReport = [...selectedTripsReports];
    const index = selectedTripsReport.indexOf(key);
    const selectedTripsReportsDetail = selectedTripsReportsDetails.filter((listItem) => (
      listItem.id !== key));
    selectedTripsReport.splice(index, 1);
    setSelectedTripsReport(selectedTripsReport);
    setSelectedTripsReportDetails([...selectedTripsReportsDetail]);
  }

  const exportAllTripsReport = (fileType) => () => {
    const {
      sortBy,
      sortDirection,
      searchText,
    } = listState;
    const apiListState = {
      fileName: 'TripsReport',
      fileType,
      selectedTripsReports: [],
      sortBy,
      sortDirection,
      searchText,
      filter: { ...selectedFilters, generatedOn: dateRef.current },
      crewDistanceRequired: isZhlReport
    };
    tripsReportInfo.exportTripsReport(apiListState, userConfig);
  };

  const exportAction = (fileType) => () => {
    const {
      pageSize,
      pageNo,
      sortBy,
      sortDirection,
      searchText,
    } = listState;
    const apiListState = {
      fileName: 'TripsReport',
      fileType,
      selectedTripsReports,
      sortBy,
      sortDirection,
      searchText,
      filter: {
        ...selectedFilters,
        generatedOn: dateRef.current,
      },
      crewDistanceRequired: isZhlReport,
    };
    if (apiListState.selectedTripsReports.length === listDetails.length) {
      apiListState.pageSize = pageSize;
      apiListState.pageNo = pageNo;
      apiListState.selectedTripsReports = [];
    }
    tripsReportInfo.exportTripsReport(apiListState, userConfig);
  };

  function printAllVehiclesAction() {
    tripsReportInfo.printAllTripsReport(
      {
        ...listState,
        filter: { ...selectedFilters, crewDistanceRequired: isZhlReport },
      }, userConfig,
    );
  }

  function handleSorting({ key, sortDirection }) {
    setSelectedTripsReport([]);
    setSelectedTripsReportDetails([]);
    setListStateValues({ sortBy: key, sortDirection });
  }

  function handleSubmitFilter(filters) {
    setFilters(filters);
    setSelectedTripsReport([]);
    setSelectedTripsReportDetails([]);
    setListStateValues({ pageNo: 0 });
  }

  const handleTripIdClick = (value) => {
    setTripIdToView(value);
  };

  const handleTripDetailsCancel = () => {
    setTripIdToView({});
  };

  useEffect(() => {
    dateRef.current = moment();

    return () => {
        dateRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (Object.keys(tripIdToView).length) {
      getTripDetails({ jobId: tripIdToView.jobId });
    }
  }, [tripIdToView]);

  useEffect(() => {
    tripsReportInfo.getTripsReportList(
      {
        ...listState,
        filter: { ...selectedFilters },
      }, userConfig,
    );
  }, [listState]);

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
    }}
    >
      <div
        className="Flex Font--S24 Font--WB"
        style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 28 }}
      >
        <div>
          {intl.formatMessage({ id: isZhlReport ? 'view.zhlTripsReport.title.zhlTripsReport' : 'view.tripsReport.title.tripsReport' })}
        </div>
        <div className="Font--S12" style={{ textTransform: 'uppercase' }}>
        {intl.formatMessage({ id: 'label.reportDateRange' }, { fromDate, toDate })}  
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
          {(isFetchingExports || isFetchingAll) && <LoaderWithOverLay />}
          <div style={{ padding: '20px', height: '100%', position: 'relative' }}>
            <ListActions
              listDetails={(info && info.data && info.data.tripReportResources) || {}}
              listState={listState}
              changePageSize={changePageSizeHandle}
              pageBackward={pageBackward}
              pageForward={pageForward}
              isFetching={isFetching}
              handleSearchText={handleSearchText}
              components={{ Filter }}
              selectedFilters={selectedFilters}
              searchBoxPlaceholder="label.searchByVehicleRegistrationNoJobID"
              handleSubmitFilter={handleSubmitFilter}
              pickListData={pickListData}
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
                      handleCheckBoxClick={handleCheckBoxClick}
                      isSelectedAll={checkForSelectedAll({
                        listDetails,
                        selectedRowsIds: selectedTripsReports,
                        keyToMatch: 'id',
                      })}
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
                            handleTripIdClick={handleTripIdClick}
                            selectTripsReport={selectTripsReport}
                            deSelectTripsReport={deSelectTripsReport}
                            selectedItems={selectedTripsReports}
                          />
                        </table>
                      </Scrollbars>
                    )}
                </div>
              </div>
            </ContentWrap>
            {!!Object.keys(tripIdToView).length
              && (
                <TripDetails
                  selectedTrip={tripIdToView}
                  onCancel={handleTripDetailsCancel}
                  tripDetails={tripDetails}
                />
              )}
            {
              selectedTripsReports.length ? (
                <ActionsFooter
                  Components={{ TableHead: HeaderRow, TableBody: ListRow, TableClass: 'ListMaster' }}
                  dataToPrint={dataToPrint}
                  printTitleHeading={
                    getPrintTitleHeading(
                      {
                        ...selectedFilters,
                        generatedOn: dateRef.current,
                      },
                    )
                  }
                  printStatus={!!info.printAllData}
                  completePrintAction={printAllVehiclesAction}
                  resetPrintAllData={tripsReportInfo.resetAllTripsReport}
                  exportAction={exportAction}
                  exportAllAction={exportAllTripsReport}
                  rootStyle={{ bottom: '0px', left: '20px', right: '20px' }}
                />
              ) : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

List.defaultProps = {
  pickListData: {},
  isZhlReport: false,
};

List.propTypes = {
  intl: PropTypes.object.isRequired,
  pickListData: PropTypes.object,
  isZhlReport: PropTypes.bool,
};

export default injectIntl(withPickListProvider(List, { version: 'v2' }));
                