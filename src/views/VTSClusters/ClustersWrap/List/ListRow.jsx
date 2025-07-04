import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Icon from '../../../../components/Icon';
import style from './rowStyle';

function ListRow({
  index,
  details: clusterDetails,
  onDeleteClick,
  handleEditClick,
  intl,
}) {

  function handleOnDeleteClick() {
    onDeleteClick(clusterDetails);
  }
  function handleOnDeletePress(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      onDeleteClick(clusterDetails);
    }
  }
  function handleOnEditClick() {
    handleEditClick(clusterDetails);
  }
  function handleOnEditPress(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      handleEditClick(clusterDetails);
    }
  }

  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';
  const protocols = clusterDetails.protocols.length
    && clusterDetails.protocols.map((val) => val.name).join(', ');
  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center' }}>
      <td className="ListMaster__Row__Item Break-All Ml-10" style={style.clusters}>
        {clusterDetails.name}
      </td>
      <td className="Break_Word Ml-20" style={style.receiverPort}>
        {clusterDetails.receiverPort}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.protocols}>
        <div
          title={protocols}
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: '420px',
            whiteSpace: 'nowrap',
            cursor: 'default',
          }}
        >
          {protocols}
        </div>
      </td>
      <td
        className="ListMaster__Row__Item"
        style={
          {
            display: 'flex',
            justifyContent: 'center',
          }
        }
      >
        <div
          title={intl.formatMessage({ id: 'label.edit' })}
          className="Cursor-Pointer"
          style={{ marginLeft: '20px', outline: 'none' }}
          onClick={handleOnEditClick}
          onKeyPress={handleOnEditPress}
        >
          <Icon name="edit" />
        </div>
        <div
          title={intl.formatMessage({ id: 'label.delete' })}
          className="Cursor-Pointer"
          style={{ marginLeft: '20px', outline: 'none' }}
          onClick={handleOnDeleteClick}
          onKeyPress={handleOnDeletePress}
        >
          <Icon name="delete" />
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
  intl: PropTypes.object.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default injectIntl(ListRow);
