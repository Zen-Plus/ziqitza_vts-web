import React from 'react';
import PropTypes from 'prop-types';
import ListHeaderRow from './ListHeaderRow';
import ListBodyRow from './ListBodyRow';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import ContentWrap from '../../../../components/ContentWrap';

function List({
  isFetching,
  tableData,
  setNhmDashboardView,
  dailyStatusProps,
}) {
  return (
    <div className="ListWrapper">
      <div style={{ overflowX: 'auto' }}>
        <ContentWrap isFetching={isFetching}>
          <table className="table">
            <ListHeaderRow />
            <ListItemIterator
              listDetails={tableData}
              ListItem={ListBodyRow}
              listLength={tableData.length}
              setNhmDashboardView={setNhmDashboardView}
              dailyStatusProps={dailyStatusProps}
            />
          </table>
        </ContentWrap>
      </div>
    </div>
  );
}

List.defaultProps = {
  isFetching: false,
  tableData: [],
  setNhmDashboardView: () => {},
  dailyStatusProps: {},
};

List.propTypes = {
  isFetching: PropTypes.bool,
  tableData: PropTypes.array,
  setNhmDashboardView: PropTypes.func,
  dailyStatusProps: PropTypes.object,
};

export default List;
