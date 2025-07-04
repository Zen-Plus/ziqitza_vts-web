import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import dayjs from 'dayjs';
import style from './rowStyle';
import Icon from '../../../../components/Icon';

function ListRow({
  index,
  intl,
  details: alertCountDetails,
  onViewClick,
}) {
  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';
  const areActionDisabled = alertCountDetails.alertStatus === 'Autoclosed' ? true : false;

  const handleonViewClick = () => {
    onViewClick(alertCountDetails);
  }
  function handleOnViewPress(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      onViewClick(alertCountDetails);
    }
  }
  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center' }}>
      <td className="ListMaster__Row__Item" style={style.ruleName}>
        {alertCountDetails.ruleName}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.alertGenerationTime}>
        {alertCountDetails.generatedOn ?
          dayjs(alertCountDetails.generatedOn).format('h:mma, DD MMM YYYY') : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Ml-20 Break-All" style={style.alertClosingTime}>
        {alertCountDetails.closedOn ?
          dayjs(alertCountDetails.closedOn).format('h:mma, DD MMM YYYY') : 'NA'}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-20" style={style.alertStatus}>
        {alertCountDetails.alertStatus}
      </td>
      <td className="ListMaster__Row__Item Break-All Ml-20" style={style.readStatus}>
        {alertCountDetails.isRead ? 'Read' : 'Unread'}
      </td>
      <td
        className="ListMaster__Row__Item Ml-20"
        style={
          {
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'all',
          }
        }
      >
        <div
          title={intl.formatMessage({ id: 'label.view' })}
          className="Cursor-Pointer"
          style={{
            marginLeft: '20px',
            outline: 'none',
            pointerEvents: areActionDisabled ? 'none' : 'all',
          }}
          onClick={handleonViewClick}
          onKeyPress={handleOnViewPress}
        > {
          areActionDisabled
          ? 'NA'
          : <Icon name="view" />
          }
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
};

export default injectIntl(ListRow);
