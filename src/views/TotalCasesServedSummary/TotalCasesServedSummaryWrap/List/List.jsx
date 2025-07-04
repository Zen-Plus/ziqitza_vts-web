import React, { useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ContentWrap from '../../../../components/ContentWrap';
import HeaderRow from './HeaderRow';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import ListRow from './ListRow';
import Icon from '../../../../components/Icon';
import useService from '../../../../common/hooks/useService';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';
import {
  fetchMonthlyCaseServedDetail as fetchMonthlyCaseServedDetailApi,
} from '../../../../api/nhmDashboard';
import useList from '../../../../../../common/hooks/list';
import Export from '../../../../components/Export';
import moment from 'moment';
import ListActions from '../../../../components/ListUtils/ListActions/ListActions';
import Filter from '../TotalCasesServedFilter/Filter'
import { withPickListProvider } from '../../../../providers/withPickListProvider';

function List({ intl, exportAction, pickListData }) {
  const userConfig = useContext(UserConfigContext);
  const [selectedFilters, setFilters] = useState({
      "baseLocationName": [],
      "districtName": [],
      "vehicleTypes": []
  });
  const { listState, setListStateValues } = useList({
    initialState: {
      fromDate: moment().subtract(14, 'days').startOf('day'),
      toDate: moment(),
      pageNo: 0,
      pageSize: 25,
    },
  });

  const {
    data: totalCasesServedData,
    request: totalCasesServedRequest,
    loading: totalCasesServedDataLoading,
  } = useService({
    method: fetchMonthlyCaseServedDetailApi,
    context: userConfig.userConfig,
    initialValues: {},
  });
  
  const listDetails = totalCasesServedData?.data || {};
  const listData = listDetails?.content || [];
  const listItemsCount = Math.min(listState.pageSize, listDetails.totalElements) || 0;

  function pageBackward() {
    setListStateValues({ ...listState, pageNo: listState.pageNo - 1 });
  }

  function pageForward() {
    setListStateValues({ ...listState, pageNo: listState.pageNo + 1 });
  }

  function onDateRangeChange(dates) {
    const [fromDate, toDate] = dates ?? [];

    if(dates === null || dates === undefined) {
      setListStateValues({ fromDate: moment().subtract(14, 'days').startOf('day'), toDate: moment() });
      return;
    }
    
    const { fromDate: origFromDate, toDate: origToDate } = listState;

    if (origFromDate !== fromDate || origToDate !== toDate) {
      setListStateValues({ fromDate, toDate });
    }
  }

  function getRequestQuery() {
    const query = {
      fromDate: listState.fromDate === undefined ? moment().subtract(14, 'days').startOf('day') : listState.fromDate.valueOf(),
      toDate: listState.toDate === undefined ? moment() : listState.toDate.valueOf(),
      pageNo: listState.pageNo,
      pageSize: listState.pageSize,
    };
    return query;
  }

  function handleExportAction(fileType) {
    exportAction({
      fileType,
      fromDate: listState.fromDate.valueOf(),
      toDate: listState.toDate.valueOf(),
      pageNo: listState.pageNo,
      pageSize: listItemsCount,
    }, { ...selectedFilters });
  }

  function handleExportAllAction(fileType) {
    exportAction({
      fileType,
      fromDate: listState.fromDate.valueOf(),
      toDate: listState.toDate.valueOf(),
      pageNo: 0,
      pageSize: listDetails.totalElements,
    }, { ...selectedFilters });
  }

  function disabledDate(current) {
    const today = moment().endOf('day');

    const fromDateMoment = moment(listState.fromDate);
    const toDateMoment = moment(listState.toDate);

    const maxDate = fromDateMoment.isValid()
      ? moment.min(fromDateMoment.clone().add(8, 'days'), today)
      : today;

    const minDate = toDateMoment.isValid()
      ? toDateMoment.clone().subtract(8, 'days').startOf('day')
      : moment().subtract(100, 'years');

    return current && (current.isBefore(minDate) || current.isAfter(maxDate));
  }

  useEffect(() => {
    const query = getRequestQuery();
    const payload = {
        ...selectedFilters,
    };
    totalCasesServedRequest(query, payload);
  }, [listState, selectedFilters]);

  function handleSearchText(val) {
    if (val.trim() !== listState.searchText.trim()) {
      setListStateValues({ searchText: val, pageNo: 0 });
    }
  }

  function handleSubmitFilter(filters) {
    setFilters(filters);
  }

  function changePageSizeHandle(value) {    
    setListStateValues({ ...listState, pageSize: value, pageNo: 0 });
  }

  return (
    <div className="ListDashboardMaster">
      <div style={{ overflowX: 'auto' }}>
        <ContentWrap isFetching={totalCasesServedDataLoading}>
          <div className="d-flex Flex-Space-Between" style={{
            position: 'sticky',
            left: '0',
            padding: '0 6px',
          }}>
            <div style={{ width: '100%' }} className="Mr-16">
              <ListActions
                isSearchEnable={false}
                listDetails={listDetails}
                listState={listState}
                changePageSize={changePageSizeHandle}
                pageBackward={pageBackward}
                pageForward={pageForward}
                isFetching={totalCasesServedDataLoading}
                searchBoxPlaceHolder="label.searchByDistrict"
                handleSearchText={handleSearchText}
                components={{ Filter }}
                selectedFilters={selectedFilters}
                handleSubmitFilter={handleSubmitFilter}
                pickListData={pickListData}
                isDateRangeVisible={true}
                dateRangeValue={[listState.fromDate, listState.toDate]}
                dateRangeRestProps={{
                  onCalendarChange: onDateRangeChange,
                  disabledDate: disabledDate,
                }}
              />
            </div>
              <Export
                type="EXCEL"
                exportAllAction={() => handleExportAllAction("EXCEL")}
                exportAction={() => handleExportAction("EXCEL")}
                listItemsCount={listItemsCount}
                buttonStyle={{
                  background: '#F0F0F0',
                  border: '1px solid #DDDDDD',
                  color: '#131313',
                  minWidth: '6rem',
                }}
                className="Box--Shadow Font--S18 ExcelButton"
              />
          </div>
          <table className="table Mt-10" style={{ minWidth: '1000px' }}>
            <HeaderRow />
            <ListItemIterator listDetails={listData} ListItem={ListRow} />
          </table>
          {!listData.length && (
            <div style={{ width: '25%', margin: '91px auto' }}>
              <div style={{ textAlign: 'center' }}>
                <Icon name="search-not-found" />
              </div>
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                {intl.formatMessage({ id: 'label.noRecordsFound' })}
              </div>
            </div>
          )}
        </ContentWrap>
      </div>
    </div>
  );
}

List.defaultProps = {
  pickListData: {},
};

List.propTypes = {
  intl: PropTypes.object.isRequired,
  exportAction: PropTypes.func,
  pickListData: PropTypes.object,
};

export default injectIntl(withPickListProvider(List, { version: 'v2' }));