import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import HeaderRow from './HeaderRow';
import ListRow from './ListRow';

function DataTable({
  headerData,
  headerBgColor,
  listData,
  isClickAble,
  onClick,
  isTotalFeedbackTakenClickable,
  onClickTotalFeedbackTaken,
  headerTextColor,
  headerBorderColor,
}) {
  return (
    <div className="DataTableWrapper">
      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ marginBottom: 0 }}>
          <HeaderRow
            headerData={headerData}
            headerBgColor={headerBgColor}
            headerBorderColor={headerBorderColor}
            headerTextColor={headerTextColor}
          />
          <ListRow
            listData={listData}
            listBorderColor={headerBgColor}
            isClickAble={isClickAble}
            isTotalFeedbackTakenClickable={isTotalFeedbackTakenClickable}
            onClick={onClick}
            onClickTotalFeedbackTaken={onClickTotalFeedbackTaken}
          />
        </table>
      </div>
    </div>
  );
}

DataTable.defaultProps = {
  isClickAble: false,
  onClick: () => {},
  isTotalFeedbackTakenClickable: false,
  onClickTotalFeedbackTaken: () => {},
  headerTextColor: '',
};

DataTable.propTypes = {
  headerData: PropTypes.array.isRequired,
  headerBgColor: PropTypes.string.isRequired,
  headerTextColor: PropTypes.string.isRequired,
  listData: PropTypes.array.isRequired,
  isClickAble: PropTypes.bool,
  onClick: PropTypes.func,
  isTotalFeedbackTakenClickable: PropTypes.bool,
  headerBorderColor: PropTypes.string.isRequired,
};

export default injectIntl(DataTable);
