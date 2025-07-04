import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import SortButton from '../../../../components/ListUtils/SortButton';
import Checkbox from '../../../../components/CheckBox';
import style from './rowStyle';

function HeaderRow({
  listState,
  changeSort,
  intl,
  handleCheckBoxClick,
  isSelectedAll,
  mode,
}) {
  function handleSort(key) {
    let sortDirection = 'ASC';
    let _key = key;
    if (_key === listState.sortBy) {
      if (listState.sortDirection === 'ASC') {
        sortDirection = 'DESC';
      } else if (listState.sortDirection === 'DESC') {
        sortDirection = '';
        _key = '';
      }
    }
    changeSort({ key: _key, sortDirection });
  }
  function getSortDirection(key) {
    if (key === listState.sortBy) {
      return listState.sortDirection;
    }
    return '';
  }
  const isPrint = mode === 'Print';
  return (
    <thead>
      <tr className="ListMaster__Header" style={style.root}>
        {
          mode !== 'Print' ? (
            <th style={{ flex: '0 1 20px' }}>
              <Checkbox
                checked={isSelectedAll}
                onChange={(event) => handleCheckBoxClick(event.target.checked)}
              />
            </th>
          ) : null
        }
        <th className="ListMaster__Header__Item Ml-30" style={{ ...style.employeeId, marginLeft: 30 }}>
          {intl.formatMessage({ id: 'label.employeeId' })}
          <SortButton
            sortDirection={getSortDirection('empId')}
            onClick={handleSort}
            sortBy="empId"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20 Flex" style={{ ...style.noOfAlertRespondedTo, alignItems: 'center' }}>
          <span className="Flex" style={{ width: 100 }}>
            {intl.formatMessage({ id: 'label.noOfAlertsRespondedTo' })}
          </span>
          <span>
            <SortButton
              sortDirection={getSortDirection('alertsResponded')}
              onClick={handleSort}
              sortBy="alertsResponded"
              isVisible={!isPrint}
            />
          </span>
        </th>
        <th className="ListMaster__Header__Item Ml-20 Flex" style={{ ...style.noOfAlertsClosed, alignItems: 'center' }}>
          <span className="Flex" style={{ width: 83 }}>
            {intl.formatMessage({ id: 'label.noOfAlertsClosed' })}
          </span>
          <span>
            <SortButton
              sortDirection={getSortDirection('alertsClosed')}
              onClick={handleSort}
              sortBy="alertsClosed"
              isVisible={!isPrint}
            />
          </span>
        </th>
        <th className="ListMaster__Header__Item Ml-20 Flex" style={{ ...style.averageRespondTime, alignItems: 'center' }}>
          <span className="Flex" style={{ width: 110 }}>
            {intl.formatMessage({ id: 'label.averageResponseTime' })}
          </span>
          <span>
            <SortButton
              sortDirection={getSortDirection('avgResponseTime')}
              onClick={handleSort}
              sortBy="avgResponseTime"
              isVisible={!isPrint}
            />
          </span>
        </th>
        <th className="ListMaster__Header__Item Ml-20 Flex" style={{ ...style.averageClosingTime, alignItems: 'center' }}>
          <span className="Flex" style={{ width: 90 }}>
            {intl.formatMessage({ id: 'label.averageClosingTime' })}
          </span>
          <span>
            <SortButton
              sortDirection={getSortDirection('avgClosingTime')}
              onClick={handleSort}
              sortBy="avgClosingTime"
              isVisible={!isPrint}
            />
          </span>
        </th>
      </tr>
    </thead>
  );
}

HeaderRow.defaultProps = {
  listState: {},
  changeSort: () => { },
  handleCheckBoxClick: () => { },
};

HeaderRow.propTypes = {
  listState: PropTypes.object,
  changeSort: PropTypes.func,
  intl: PropTypes.object.isRequired,
  handleCheckBoxClick: PropTypes.func,
  isSelectedAll: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
};

export default injectIntl(HeaderRow);
