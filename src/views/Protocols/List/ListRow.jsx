import React from 'react';
import PropTypes from 'prop-types';
import style from './rowStyle';

function ListRow({
  index,
  details: protocolDetails,
  onSupportingDocumentClick,
}) {

  function handleOnSupportingDocumentClick() {
    onSupportingDocumentClick(protocolDetails.documentResource);
  }
  function handleOnSupportingDocumentKeyPress(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      onSupportingDocumentClick(protocolDetails.documentResource);
    }
  }

  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';
  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '29px', alignItems: 'center' }}>
      <td className="ListMaster__Row__Item Break-All" style={style.protocols}>
        {protocolDetails.name}
      </td>
      <td className="Break_Word Ml-20" style={style.remark}>
        {protocolDetails.remark}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.supportingDocument}>
        <div
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: '200px',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
          className="Warmblue-Text Text-Decoration-Underline"
          onClick={handleOnSupportingDocumentClick}
          onKeyPress={handleOnSupportingDocumentKeyPress}
        >
          {protocolDetails.documentResource && protocolDetails.documentResource.name}
        </div>
      </td>
    </tr>
  );
}

ListRow.defaultProps = {
  details: {},
};

ListRow.propTypes = {
  index: PropTypes.number.isRequired,
  details: PropTypes.object,
  onSupportingDocumentClick: PropTypes.func.isRequired,
};

export default ListRow;
