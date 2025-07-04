import React from 'react';
import PropTypes from 'prop-types';
import { isNullOrUndefined } from '../../../../common/helpers/collectionUtils';

function ListRow({
  listData,
  listBgColor,
  listBorderColor,
  isClickAble,
  onClick,
  isTotalFeedbackTakenClickable,
  onClickTotalFeedbackTaken,
}) {
  return (
    <tr className="ListMaster__Row ListRow">
      <td 
        className="ListMaster__Row__Item ListText"
        style={{ backgroundColor: listBgColor, borderColor: listBorderColor }}
      >
        <div
          role="button"
          onClick={onClick}
          onKeyPress={() => {}}
          tabIndex={0}
          className={`${isClickAble ? 'Cursor-Pointer Text-Decoration-Underline Warmblue-Text' : 'Cursor-Default'}`}
        >
          {!isNullOrUndefined(listData[0]) ? listData[0] : 'NA'}
        </div>
      </td>
      <td 
        className="ListMaster__Row__Item ListText"
        style={{ backgroundColor: listBgColor, borderColor: listBorderColor }}
      >
        <div
          role="button"
          onClick={!isNullOrUndefined(listData[1]) && onClickTotalFeedbackTaken}
          onKeyPress={() => {}}
          tabIndex={0}
          className={`${!isNullOrUndefined(listData[1]) && isTotalFeedbackTakenClickable? 'Cursor-Pointer Text-Decoration-Underline Warmblue-Text' : 'Cursor-Default'}`}
        >
         {!isNullOrUndefined(listData[1]) ? listData[1] : 'NA'}
        </div>
      </td>
      {listData[2] && <td 
        className="ListMaster__Row__Item ListText"
        style={{ backgroundColor: listBgColor, borderColor: listBorderColor }}
      >
        {!isNullOrUndefined(listData[2]) ? listData[2] : 'NA'}
      </td>}
    </tr>
  );
}

ListRow.defaultProps = {
  isClickAble: false,
  onClick: () => {},
  isTotalFeedbackTakenClickable: false,
  onClickTotalFeedbackTaken: () => {},
  listBgColor: '',
};

ListRow.propTypes = {
  listData: PropTypes.array.isRequired,
  listBgColor: PropTypes.string.isRequired,
  listBorderColor: PropTypes.string.isRequired,
  isClickAble: PropTypes.bool,
  isTotalFeedbackTakenClickable: PropTypes.bool,
  onClick: PropTypes.func,
  onClickTotalFeedbackTaken: PropTypes.func,
};

export default ListRow;
