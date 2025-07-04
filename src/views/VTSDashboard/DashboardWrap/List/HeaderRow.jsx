import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Checkbox from '../../../../components/CheckBox';
import SortButton from '../../../../components/ListUtils/SortButton';
import style from './rowStyle';

function HeaderRow({
  handleCheckBoxClick,
  listState,
  changeSort,
  intl,
  isSelectedAll,
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
  return (
    <thead>
      <tr className="ListMaster__Header" style={style.root}>
        <th style={{ flex: '0 1 20px' }}>
          <Checkbox
            checked={isSelectedAll}
            onChange={(event) => handleCheckBoxClick(event.target.checked)}
          />
        </th>
        <th className="ListMaster__Header__Item" style={style.registerationNo}>
          {intl.formatMessage({ id: 'label.registrationNo' })}
          <SortButton
            sortDirection={getSortDirection('vehicleRegistrationNumber')}
            onClick={handleSort}
            sortBy="vehicleRegistrationNumber"
          />
        </th>
        <th className="ListMaster__Header__Item" style={style.jobNumber}>
          {intl.formatMessage({ id: 'label.jobNumber' })}
        </th>
        <th className="ListMaster__Header__Item ML-20" style={style.trackingStatus}>
          {intl.formatMessage({ id: 'label.vehicleStatus' })}
          <SortButton
            sortDirection={getSortDirection('trackingStatus')}
            onClick={handleSort}
            sortBy="trackingStatus"
          />
        </th>
        <th className="ListMaster__Header__Item ML-23" style={style.vehicleStatus}>
          {intl.formatMessage({ id: 'label.trackingStatus' })}
          <SortButton
            sortDirection={getSortDirection('milestone')}
            onClick={handleSort}
            sortBy="milestone"
          />
        </th>
        <th className="ListMaster__Header__Item ML-23" style={style.timeSinceLastJob}>
          <span style={{ width: '116px', display: 'flex' }}>
            {intl.formatMessage({ id: 'label.timeSinceLastJob' })}
            <SortButton
              sortDirection={getSortDirection('lastOffroadOrJobTime')}
              onClick={handleSort}
              sortBy="lastOffroadOrJobTime"
            />
          </span>
        </th>
        <th className="ListMaster__Header__Item ML-23" style={style.currentLocation}>
          {intl.formatMessage({ id: 'label.currentLocation' })}
        </th>
        <th className="ListMaster__Header__Item ML-23" style={style.deviceStatus}>
          {intl.formatMessage({ id: 'label.deviceStatus' })}
          <SortButton
            sortDirection={getSortDirection('deviceStatus')}
            onClick={handleSort}
            sortBy="deviceStatus"
          />
        </th>
        <th className="ListMaster__Header__Item Break_All ML-20" style={style.actions}>
          {intl.formatMessage({ id: 'label.actions' })}
        </th>
      </tr>
    </thead>
  );
}

HeaderRow.defaultProps = {
  handleCheckBoxClick: () => { },
  listState: {},
  isSelectedAll: false,
};

HeaderRow.propTypes = {
  handleCheckBoxClick: PropTypes.func,
  listState: PropTypes.object,
  changeSort: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  isSelectedAll: PropTypes.bool,
};

export default injectIntl(HeaderRow);
