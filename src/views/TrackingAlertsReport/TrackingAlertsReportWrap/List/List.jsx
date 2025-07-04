import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import Filter from './TrackingAlertReportStatsFilter';
import ContentWrap from '../../../../components/ContentWrap';
import ListActions from '../../../../components/ListUtils/ListActions/ListActions';
import useList from '../../../../common/hooks/useList';
import { TrackingAlertsReportContext } from '../../../../providers/withTrackingAlertsReportProvider';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';
import HeaderRow from './HeaderRow';
import Icon from '../../../../components/Icon';
import Scrollbars from '../../../../components/Scrollbar';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import ListRow from './ListRow';
import ActionsFooter from '../../../../components/ActionsFooter';
import LoaderWithOverLay from '../../../../components/Loader/LoaderWithOverLay';
import {
  getCheckedRows,
  getRemainingCheckedRows,
  checkForSelectedAll,
} from '../../../../common/helpers/listUtils';
import { getPrintTitleHeading } from './util';

function List({
  intl,
  setTrackingAlertsReportView,
  pickListData,
  dateRef,
  selectedFilters,
  setFilters,
  selectedFilterChips,
  setSelectedFilterChips,
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
  const trackingAlertsReportInfo = React.useContext(TrackingAlertsReportContext);
  const userConfig = React.useContext(UserConfigContext);
  const [selectedTrackingAlertsReports, setSelectedTrackingAlertsReport] = useState([]);
  const [selectedTrackingAlertsReportsDetails, setSelectedTrackingAlertsReportDetails] = useState([]);

  const {
    isFetching = false,
    info = {},
    isFetchingExports,
    isFetchingAll,
  } = trackingAlertsReportInfo.trackingAlertsReport;
  const data = (info && info.data) || {};
  const listDetails = (data && data.trackingAlertReportResources && data.trackingAlertReportResources.content) || [];
  const fromDate = (data.fromDate && moment(data.fromDate).format('DD MMM YYYY hh:mm A')) || 'NA';
  const toDate = (data.toDate && moment(data.toDate).format('DD MMM YYYY hh:mm A')) || 'NA';

  let dataToPrint = [];
  dataToPrint = selectedTrackingAlertsReportsDetails;
  if (info.printAllData) {
    dataToPrint = info.printAllData;
  }

  function changePageSizeHandle(value) {
    setSelectedTrackingAlertsReport([]);
    setSelectedTrackingAlertsReportDetails([]);
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
      setSelectedTrackingAlertsReport([]);
      setSelectedTrackingAlertsReportDetails([]);
      setListStateValues({ searchText: val, pageNo: 0 });
    }
  }

  const handleCheckBoxClick = (value) => {
    if (value && listDetails) {
      const _updatedRows = getCheckedRows({ listDetails, selectedRowsIds: selectedTrackingAlertsReports, keyToMatch: 'userId' });
      setSelectedTrackingAlertsReportDetails([...selectedTrackingAlertsReportsDetails,
      ..._updatedRows.selectedNewRowsDetail]);
      setSelectedTrackingAlertsReport(_updatedRows._selectedRows);
    } else {
      const _remainingRows = getRemainingCheckedRows({
        listDetails,
        selectedRowsIds: selectedTrackingAlertsReports,
        selectedRowsDetails: selectedTrackingAlertsReportsDetails,
        keyToMatch: 'userId',
      });
      setSelectedTrackingAlertsReportDetails(_remainingRows._selectedRowsDetails);
      setSelectedTrackingAlertsReport(_remainingRows._selectedRows);
    }
  };

  function selectTrackingAlertsReport(key) {
    const selectedTrackingAlertsReport = [...selectedTrackingAlertsReports];
    selectedTrackingAlertsReport.push(key);
    const selectedTrackingAlertsReportsDetail = listDetails
      .filter(
        (listItem) => listItem.userId
          === key,
      );
    setSelectedTrackingAlertsReport(selectedTrackingAlertsReport);
    setSelectedTrackingAlertsReportDetails(
      [...selectedTrackingAlertsReportsDetails,
      ...selectedTrackingAlertsReportsDetail],
    );
  }

  function deSelectTrackingAlertsReport(key) {
    const selectedTrackingAlertsReport = [...selectedTrackingAlertsReports];
    const index = selectedTrackingAlertsReport.indexOf(key);
    const selectedTrackingAlertsReportsDetail = selectedTrackingAlertsReportsDetails.filter((listItem) => (
      listItem.userId !== key));
    selectedTrackingAlertsReport.splice(index, 1);
    setSelectedTrackingAlertsReport(selectedTrackingAlertsReport);
    setSelectedTrackingAlertsReportDetails([...selectedTrackingAlertsReportsDetail]);
  }

  const exportAllTrackingAlertsReport = (fileType) => () => {
    const {
      sortBy,
      sortDirection,
      searchText,
    } = listState;
    const apiListState = {
      fileName: 'TrackingAlertsReport',
      fileType,
      selectedTrackingAlertsReports: [],
      sortBy,
      sortDirection,
      searchText,
      filter: { ...selectedFilters, generatedOn: dateRef.current },
    };
    trackingAlertsReportInfo.exportTrackingAlertsReport(apiListState, userConfig);
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
      fileName: 'TrackingAlertsReport',
      fileType,
      selectedTrackingAlertsReports,
      sortBy,
      sortDirection,
      searchText,
      filter: {
        ...selectedFilters,
        generatedOn: dateRef.current,
      },
    };
    if (apiListState.selectedTrackingAlertsReports.length === listDetails.length) {
      apiListState.pageSize = pageSize;
      apiListState.pageNo = pageNo;
      apiListState.selectedTrackingAlertsReports = [];
    }
    trackingAlertsReportInfo.exportTrackingAlertsReport(apiListState, userConfig);
  };

  function printAllVehiclesAction() {
    trackingAlertsReportInfo.printAllTrackingAlertsReport(
      {
        ...listState,
        filter: { ...selectedFilters },
      }, userConfig,
    );
  }

  function handleSorting({ key, sortDirection }) {
    setSelectedTrackingAlertsReport([]);
    setSelectedTrackingAlertsReportDetails([]);
    setListStateValues({ sortBy: key, sortDirection });
  }

  function handleSubmitFilter(filters) {
    setFilters(filters);
    setSelectedTrackingAlertsReport([]);
    setSelectedTrackingAlertsReportDetails([]);
    setListStateValues({ pageNo: 0 });
  }

  useEffect(() => {
    trackingAlertsReportInfo.getTrackingAlertsReportList(
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
          {intl.formatMessage({ id: 'view.trackingAlertReport.title.trackingAlertReport' })}
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
              listDetails={(info && info.data && info.data.trackingAlertReportResources) || {}}
              listState={listState}
              changePageSize={changePageSizeHandle}
              pageBackward={pageBackward}
              pageForward={pageForward}
              isFetching={isFetching}
              searchBoxPlaceholder="label.searchByEmployeeID"
              handleSearchText={handleSearchText}
              components={{ Filter }}
              selectedFilters={selectedFilters}
              handleSubmitFilter={handleSubmitFilter}
              selectedFilterChips={selectedFilterChips}
              setSelectedFilterChips={setSelectedFilterChips}
              pickListData={pickListData}
              isIconButtonVisible
              iconButtonProps={{
                iconName: 'stats',
                labelText: intl.formatMessage({ id: 'label.performanceStats' }),
                onClick: () => { setTrackingAlertsReportView({ type: 'performanceStats' }); },
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
                      handleCheckBoxClick={handleCheckBoxClick}
                      isSelectedAll={checkForSelectedAll({
                        listDetails,
                        selectedRowsIds: selectedTrackingAlertsReports,
                        keyToMatch: 'userId',
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
                            selectTrackingAlertsReport={selectTrackingAlertsReport}
                            deSelectTrackingAlertsReport={deSelectTrackingAlertsReport}
                            selectedItems={selectedTrackingAlertsReports}
                          />
                        </table>
                      </Scrollbars>
                    )}
                </div>
              </div>
            </ContentWrap>
            {
              selectedTrackingAlertsReports.length ? (
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
                  resetPrintAllData={trackingAlertsReportInfo.resetAllTrackingAlertsReport}
                  exportAction={exportAction}
                  exportAllAction={exportAllTrackingAlertsReport}
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
};

List.propTypes = {
  intl: PropTypes.object.isRequired,
  setTrackingAlertsReportView: PropTypes.func.isRequired,
  pickListData: PropTypes.object,
  dateRef: PropTypes.object.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  selectedFilterChips: PropTypes.array.isRequired,
  setSelectedFilterChips: PropTypes.array.isRequired,
};

export default injectIntl(List);
