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
  fetchAmbulanceSummary as fetchAmbulanceSummaryApi,
} from '../../../../api/nhmDashboard';
import useList from '../../../../../../common/hooks/list';
import Export from '../../../../components/Export';
import { withPickListProvider } from '../../../../providers/withPickListProvider';
import ListActions from '../../../../components/ListUtils/ListActions/ListActions';
import Filter from '../TotalAmbulanceSummaryFilter/Filter';

function List({ intl, exportAction, pickListData }) {
  const userConfig = useContext(UserConfigContext);
  const { listState, setListStateValues } = useList({
    initialState: {
      pageNo: 0,
      pageSize: 25,
    },
  });

  const [selectedFilters, setFilters] = useState({
    "baseLocationName": [],
    "districtName": [],
    "vehicleTypes": []
  });

  const {
    data: ambulanceSummaryData,
    request: ambulanceSummaryRequest,
    loading: ambulanceSummaryDataLoading,
  } = useService({
    method: fetchAmbulanceSummaryApi,
    context: userConfig.userConfig,
    initialValues: {},
  });

  const listDetails = ambulanceSummaryData?.data || {};
  const listData = listDetails?.content || [];
  const listItemsCount = Math.min(listState.pageSize, listDetails.totalElements) || 0;

  let initialItemNumber = 0;
  let finalItemNumber = 0;
  let totalItemNumber = 0;
  if (listDetails.totalElements !== 0) {
    initialItemNumber = listDetails.number * listDetails.size + 1;
    finalItemNumber = (initialItemNumber + listDetails.size <= listDetails.totalElements)
      ? initialItemNumber + listDetails.size - 1 : listDetails.totalElements;
    totalItemNumber = listDetails.totalElements;
  }

  function pageBackward() {
    setListStateValues({ pageNo: listState.pageNo - 1 });
  }

  function pageForward() {
    setListStateValues({ pageNo: listState.pageNo + 1 });
  }

  function getRequestQuery() {
    const query = {
      pageNo: listState.pageNo,
      pageSize: listState.pageSize,
    };
    return query;
  }

  function handleExportAction(fileType) {
    exportAction({
      fileType,
      pageNo: listState.pageNo,
      pageSize: listItemsCount,
    }, { ...selectedFilters });
  }

  function handleExportAllAction(fileType) {
    exportAction({
      fileType,
      pageNo: 0,
      pageSize: listDetails.totalElements,
    }, { ...selectedFilters });
  }

  function handleSubmitFilter(filters) {
    setFilters(filters);
  }

  function changePageSizeHandle(value) {    
    setListStateValues({ pageSize: value, pageNo: 0 });
  }

  useEffect(() => {
    const query = getRequestQuery();
    const payload = {
        ...selectedFilters,
    };
    ambulanceSummaryRequest(query, payload);
  }, [listState, selectedFilters]);

  return (
    <div className="ListDashboardMaster">
      <div style={{ overflowX: 'auto' }}>
        <ContentWrap isFetching={ambulanceSummaryDataLoading}>
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
                isFetching={ambulanceSummaryDataLoading}
                components={{ Filter }}
                selectedFilters={selectedFilters}
                handleSubmitFilter={handleSubmitFilter}
                pickListData={pickListData}
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
