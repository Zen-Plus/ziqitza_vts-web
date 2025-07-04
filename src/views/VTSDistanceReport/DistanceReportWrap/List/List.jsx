import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import Filter from './DistanceReportFilter';
import ContentWrap from '../../../../components/ContentWrap';
import ListActions from '../../../../components/ListUtils/ListActions/ListActions';
import useList from '../../../../common/hooks/useList';
import { DistanceReportContext } from '../../../../providers/withDistanceReportsProvider';
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
  setDistanceReportView,
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
  const distanceReportInfo = React.useContext(DistanceReportContext);
  const userConfig = React.useContext(UserConfigContext);
  const [selectedDistanceReports, setSelectedDistanceReport] = useState([]);
  const [selectedDistanceReportsDetails, setSelectedDistanceReportDetails] = useState([]);

  const {
    isFetching = false,
    info = {},
    isFetchingExports,
    isFetchingAll,
  } = distanceReportInfo.distanceReport;
  const data = (info && info.data) || {};
  const listDetails = (data && data.distanceReportResources && data.distanceReportResources.content) || [];
  const fromDate = (data.fromDate && moment(data.fromDate).format('DD MMM YYYY hh:mm A')) || 'NA';
  const toDate = (data.toDate && moment(data.toDate).format('DD MMM YYYY hh:mm A')) || 'NA';
  let dataToPrint = [];
  dataToPrint = selectedDistanceReportsDetails;

  if (info.printAllData) {
    dataToPrint = info.printAllData;
  }

  function changePageSizeHandle(value) {
    setSelectedDistanceReport([]);
    setSelectedDistanceReportDetails([]);
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
      setSelectedDistanceReport([]);
      setSelectedDistanceReportDetails([]);
      setListStateValues({ searchText: val, pageNo: 0 });
    }
  }

  const handleCheckBoxClick = (value) => {
    if (value && listDetails) {
      const _updatedRows = getCheckedRows({ listDetails, selectedRowsIds: selectedDistanceReports, keyToMatch: 'vehicleId' });
      setSelectedDistanceReportDetails([...selectedDistanceReportsDetails,
        ..._updatedRows.selectedNewRowsDetail]);
      setSelectedDistanceReport(_updatedRows._selectedRows);
    } else {
      const _remainingRows = getRemainingCheckedRows({
        listDetails,
        selectedRowsIds: selectedDistanceReports,
        selectedRowsDetails: selectedDistanceReportsDetails,
        keyToMatch: 'vehicleId',
      });
      setSelectedDistanceReportDetails(_remainingRows._selectedRowsDetails);
      setSelectedDistanceReport(_remainingRows._selectedRows);
    }
  };

  function selectDistanceReport(key) {
    const selectedDistanceReport = [...selectedDistanceReports];
    selectedDistanceReport.push(key);
    const selectedDistanceReportsDetail = listDetails
      .filter(
        (listItem) => listItem.vehicleId
        === key,
      );
    setSelectedDistanceReport(selectedDistanceReport);
    setSelectedDistanceReportDetails(
      [...selectedDistanceReportsDetails,
        ...selectedDistanceReportsDetail],
    );
  }

  function deSelectDistanceReport(key) {
    const selectedDistanceReport = [...selectedDistanceReports];
    const index = selectedDistanceReport.indexOf(key);
    const selectedDistanceReportsDetail = selectedDistanceReportsDetails.filter((listItem) => (
      listItem.vehicleId !== key));
    selectedDistanceReport.splice(index, 1);
    setSelectedDistanceReport(selectedDistanceReport);
    setSelectedDistanceReportDetails([...selectedDistanceReportsDetail]);
  }

  const exportAllDistanceReport = (fileType) => () => {
    const {
      sortBy,
      sortDirection,
      searchText,
    } = listState;
    const apiListState = {
      fileName: 'DistanceReport',
      fileType,
      selectedDistanceReports: [],
      sortBy,
      sortDirection,
      searchText,
      filter: { ...selectedFilters, generatedOn: dateRef.current },
    };
    distanceReportInfo.exportDistanceReport(apiListState, userConfig);
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
      fileName: 'DistanceReport',
      fileType,
      selectedDistanceReports,
      sortBy,
      sortDirection,
      searchText,
      filter: {
        ...selectedFilters,
        generatedOn: dateRef.current,
      },
    };
    if (apiListState.selectedDistanceReports.length === listDetails.length) {
      apiListState.pageSize = pageSize;
      apiListState.pageNo = pageNo;
      apiListState.selectedDistanceReports = [];
    }
    distanceReportInfo.exportDistanceReport(apiListState, userConfig);
  };

  function printAllVehiclesAction() {
    distanceReportInfo.printAllDistanceReport(
      {
        ...listState,
        filter: { ...selectedFilters },
      }, userConfig,
    );
  }

  function handleSorting({ key, sortDirection }) {
    setSelectedDistanceReport([]);
    setSelectedDistanceReportDetails([]);
    setListStateValues({ sortBy: key, sortDirection });
  }

  function handleSubmitFilter(filters) {
    setFilters(filters);
    setSelectedDistanceReport([]);
    setSelectedDistanceReportDetails([]);
    setListStateValues({ pageNo: 0 });
  }

  useEffect(() => {
    distanceReportInfo.getDistanceReportList(
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
          {intl.formatMessage({ id: 'view.distanceReport.title.distanceReport' })}
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
              listDetails={(info && info.data && info.data.distanceReportResources) || {}}
              listState={listState}
              changePageSize={changePageSizeHandle}
              pageBackward={pageBackward}
              pageForward={pageForward}
              isFetching={isFetching}
              searchBoxPlaceholder="label.searchByVehicleRegistrationNo"
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
                onClick: () => { setDistanceReportView({ type: 'performanceStats' }); },
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
                        selectedRowsIds: selectedDistanceReports,
                        keyToMatch: 'vehicleId',
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
                            selectDistanceReport={selectDistanceReport}
                            deSelectDistanceReport={deSelectDistanceReport}
                            selectedItems={selectedDistanceReports}
                          />
                        </table>
                      </Scrollbars>
                    )}
                </div>
              </div>
            </ContentWrap>
            {
              selectedDistanceReports.length ? (
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
                  resetPrintAllData={distanceReportInfo.resetAllDistanceReport}
                  exportAction={exportAction}
                  exportAllAction={exportAllDistanceReport}
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
  setDistanceReportView: PropTypes.func.isRequired,
  pickListData: PropTypes.object,
  dateRef: PropTypes.object.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  selectedFilterChips: PropTypes.array.isRequired,
  setSelectedFilterChips: PropTypes.array.isRequired,
};

export default injectIntl(List);
