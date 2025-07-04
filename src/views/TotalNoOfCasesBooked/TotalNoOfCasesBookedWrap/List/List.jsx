import React, { useContext, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ContentWrap from '../../../../components/ContentWrap';
import HeaderRow from './HeaderRow';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import ListRow from './ListRow';
import Icon from '../../../../components/Icon';
import Button from '../../../../components/Button';
import useService from '../../../../common/hooks/useService';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';
import {
  fetchTodayBookedCaseDetail as fetchTodayBookedCaseDetailApi,
} from '../../../../api/nhmDashboard';
import useList from '../../../../../../common/hooks/list';
import Export from '../../../../components/Export';
import moment from 'moment';


function List({ intl, exportAction }) {
  const userConfig = useContext(UserConfigContext);
  const { listState, setListStateValues } = useList({
    initialState: {
      fromDate: moment().startOf('day'),
      toDate: moment(),
      pageNo: 0,
      pageSize: 25,
    },
  });

  const {
    data: todayBookedCasesData,
    request: todayBookedCasesRequest,
    loading: todayBookedCasesDataLoading,
  } = useService({
    method: fetchTodayBookedCaseDetailApi,
    context: userConfig.userConfig,
    initialValues: {},
  });

  const listDetails = todayBookedCasesData?.data || {};
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
    setListStateValues({
      ...listState,
      fromDate: moment(listState.fromDate), // Convert to Moment object
      toDate: moment(listState.toDate),     // Convert to Moment object
      pageNo: listState.pageNo - 1,
    });
  }

  function pageForward() {
    setListStateValues({
      ...listState,
      fromDate: moment(listState.fromDate), // Convert to Moment object
      toDate: moment(listState.toDate),     // Convert to Moment object
      pageNo: listState.pageNo + 1,
    });
  }

  function getRequestQuery() {
    console.log(listState, 'fromDate');
    const query = {
      fromDate: listState.fromDate.valueOf(),
      toDate: listState.toDate.valueOf(),
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
    });
  }

  function handleExportAllAction(fileType) {
    exportAction({
      fileType,
      fromDate: listState.fromDate.valueOf(),
      toDate: listState.toDate.valueOf(),
      pageNo: 0,
      pageSize: listDetails.totalElements,
    });
  }

  useEffect(() => {
    const query = getRequestQuery();
    todayBookedCasesRequest(query);
  }, [listState]);

  return (
    <div className="ListDashboardMaster">
      <div style={{ overflowX: 'auto' }}>
        <ContentWrap isFetching={todayBookedCasesDataLoading}>
          <div className="d-flex Flex-Space-Between" style={{
            flexDirection: 'row-reverse',
            marginBottom: '1.5rem',
            alignItems: 'end',
            position: 'sticky',
            left: '0',
            padding: '0 6px',
          }}>
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

          <div className="d-flex" style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
            <span className="d-flex Flex-Direction-Row">
              <Button
                className="Border-None"
                disabled={listDetails.first || todayBookedCasesDataLoading}
                onClick={pageBackward}
                style={{
                  backgroundColor: 'transparent',
                }}
              >
                <Icon name="backward" />
              </Button>
              <Button
                className="Border-None"
                disabled={listDetails.last || todayBookedCasesDataLoading}
                onClick={pageForward}
                style={{
                  backgroundColor: 'transparent',
                }}
              >
                <Icon name="forward" />
              </Button>
            </span>
            <span style={{ transform: 'translateY(3px)'}}>
              {initialItemNumber || 0}
              {' - '}
              {finalItemNumber || 0}
              {' of '}
              {totalItemNumber || 0}
            </span>
          </div>
        </ContentWrap>
      </div>
    </div>
  );
}

List.defaultProps = {
};

List.propTypes = {
  intl: PropTypes.object.isRequired,
  exportAction: PropTypes.func,
};

export default injectIntl(List);
