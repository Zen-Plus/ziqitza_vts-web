import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import Filter from './GPSQualityReportFilter';
import ContentWrap from '../../../../components/ContentWrap';
import ListActions from '../../../../components/ListUtils/ListActions/ListActions';
import useList from '../../../../common/hooks/useList';
import { GPSQualityReportContext } from '../../../../providers/withGPSQualityReportsProvider';
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
  setGPSQualityReportView,
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
  const gpsQualityReportInfo = React.useContext(GPSQualityReportContext);
  const userConfig = React.useContext(UserConfigContext);
  const [selectedGPSQualityReports, setSelectedGPSQualityReport] = useState([]);
  const [selectedGPSQualityReportsDetails, setSelectedGPSQualityReportDetails] = useState([]);

  const {
    isFetching = false,
    info = {},
    isFetchingExports,
    isFetchingAll,
  } = gpsQualityReportInfo.gpsQualityReport;

  const data = (info && info.data) || {};
  const listDetails = (data && data.gpsReportResources && data.gpsReportResources.content) || [];
  const fromDate = (data.fromDate && moment(data.fromDate).format('DD MMM YYYY hh:mm A')) || 'NA';
  const toDate = (data.toDate && moment(data.toDate).format('DD MMM YYYY hh:mm A')) || 'NA';

  let dataToPrint = [];
  dataToPrint = selectedGPSQualityReportsDetails;

  if (info.printAllData) {
    dataToPrint = info.printAllData;
  }

  function changePageSizeHandle(value) {
    setSelectedGPSQualityReport([]);
    setSelectedGPSQualityReportDetails([]);
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
      setSelectedGPSQualityReport([]);
      setSelectedGPSQualityReportDetails([]);
      setListStateValues({ searchText: val, pageNo: 0 });
    }
  }

  const handleCheckBoxClick = (value) => {
    if (value && listDetails) {
      const _updatedRows = getCheckedRows({ listDetails, selectedRowsIds: selectedGPSQualityReports, keyToMatch: 'vehicleId' });
      setSelectedGPSQualityReportDetails([...selectedGPSQualityReportsDetails,
      ..._updatedRows.selectedNewRowsDetail]);
      setSelectedGPSQualityReport(_updatedRows._selectedRows);
    } else {
      const _remainingRows = getRemainingCheckedRows({
        listDetails,
        selectedRowsIds: selectedGPSQualityReports,
        selectedRowsDetails: selectedGPSQualityReportsDetails,
        keyToMatch: 'vehicleId',
      });
      setSelectedGPSQualityReportDetails(_remainingRows._selectedRowsDetails);
      setSelectedGPSQualityReport(_remainingRows._selectedRows);
    }
  };

  function selectGPSQualityReport(key) {
    const selectedGPSQualityReport = [...selectedGPSQualityReports];
    selectedGPSQualityReport.push(key);
    const selectedGPSQualityReportsDetail = listDetails
      .filter(
        (listItem) => listItem.vehicleId
          === key,
      );
    setSelectedGPSQualityReport(selectedGPSQualityReport);
    setSelectedGPSQualityReportDetails(
      [...selectedGPSQualityReportsDetails,
      ...selectedGPSQualityReportsDetail],
    );
  }

  function deSelectGPSQualityReport(key) {
    const selectedGPSQualityReport = [...selectedGPSQualityReports];
    const index = selectedGPSQualityReport.indexOf(key);
    const selectedGPSQualityReportsDetail = selectedGPSQualityReportsDetails.filter((listItem) => (
      listItem.vehicleId !== key));
    selectedGPSQualityReport.splice(index, 1);
    setSelectedGPSQualityReport(selectedGPSQualityReport);
    setSelectedGPSQualityReportDetails([...selectedGPSQualityReportsDetail]);
  }

  const exportAllGPSQualityReport = (fileType) => () => {
    const {
      sortBy,
      sortDirection,
      searchText,
    } = listState;
    const apiListState = {
      fileName: 'GPSQualityReport',
      fileType,
      selectedGPSQualityReports: [],
      sortBy,
      sortDirection,
      searchText,
      filter: { ...selectedFilters, generatedOn: dateRef.current },
    };
    gpsQualityReportInfo.exportGPSQualityReport(apiListState, userConfig);
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
      fileName: 'GPSQualityReport',
      fileType,
      selectedGPSQualityReports,
      sortBy,
      sortDirection,
      searchText,
      filter: {
        ...selectedFilters,
        generatedOn: dateRef.current,
      },
    };
    if (apiListState.selectedGPSQualityReports.length === listDetails.length) {
      apiListState.pageSize = pageSize;
      apiListState.pageNo = pageNo;
      apiListState.selectedGPSQualityReports = [];
    }
    gpsQualityReportInfo.exportGPSQualityReport(apiListState, userConfig);
  };

  function printAllVehiclesAction() {
    gpsQualityReportInfo.printAllGPSQualityReport(
      {
        ...listState,
        filter: { ...selectedFilters },
      }, userConfig,
    );
  }

  function handleSorting({ key, sortDirection }) {
    setSelectedGPSQualityReport([]);
    setSelectedGPSQualityReportDetails([]);
    setListStateValues({ sortBy: key, sortDirection });
  }

  function handleSubmitFilter(filters) {
    setFilters(filters);
    setSelectedGPSQualityReport([]);
    setSelectedGPSQualityReportDetails([]);
    setListStateValues({ pageNo: 0 });
  }

  useEffect(() => {
    gpsQualityReportInfo.getGPSQualityReportList(
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
          {intl.formatMessage({ id: 'view.gpsQualityReport.title.gpsQualityReport' })}
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
              listDetails={(info && info.data && info.data.gpsReportResources) || {}}
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
              pickListData={pickListData}
              selectedFilterChips={selectedFilterChips}
              setSelectedFilterChips={setSelectedFilterChips}
              isIconButtonVisible
              iconButtonProps={{
                iconName: 'stats',
                labelText: intl.formatMessage({ id: 'label.performanceStats' }),
                onClick: () => { setGPSQualityReportView({ type: 'performanceStats' }); },
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
                        selectedRowsIds: selectedGPSQualityReports,
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
                            selectGPSQualityReport={selectGPSQualityReport}
                            deSelectGPSQualityReport={deSelectGPSQualityReport}
                            selectedItems={selectedGPSQualityReports}
                          />
                        </table>
                      </Scrollbars>
                    )}
                </div>
              </div>
            </ContentWrap>
            {
              selectedGPSQualityReports.length ? (
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
                  resetPrintAllData={gpsQualityReportInfo.resetAllGPSQualityReport}
                  exportAction={exportAction}
                  exportAllAction={exportAllGPSQualityReport}
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
  setGPSQualityReportView: PropTypes.func.isRequired,
  pickListData: PropTypes.object,
  dateRef: PropTypes.object.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  selectedFilterChips: PropTypes.array.isRequired,
  setSelectedFilterChips: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default injectIntl(List);
