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
        <th className="ListMaster__Header__Item Ml-24" style={style.vehicleRegNo}>
          {intl.formatMessage({ id: 'label.vehicleRegNo' })}
          <SortButton
            sortDirection={getSortDirection('vehicleRegistrationNumber')}
            onClick={handleSort}
            sortBy="vehicleRegistrationNumber"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.deviceImei}>
          {intl.formatMessage({ id: 'label.deviceImei' })}
          <SortButton
            sortDirection={getSortDirection('deviceId')}
            onClick={handleSort}
            sortBy="deviceId"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.deviceModel}>
          {intl.formatMessage({ id: 'label.deviceModel' })}
          <SortButton
            sortDirection={getSortDirection('deviceModel')}
            onClick={handleSort}
            sortBy="deviceModel"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.simCard}>
          {intl.formatMessage({ id: 'label.simCardProvider' })}
          <SortButton
            sortDirection={getSortDirection('simCardProvider')}
            onClick={handleSort}
            sortBy="simCardProvider"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20 Flex" style={style.GpsPacketLoss}>
          {intl.formatMessage({ id: 'label.gpsPacketLoss' })}
          <SortButton
            sortDirection={getSortDirection('lossPercentage')}
            onClick={handleSort}
            sortBy="lossPercentage"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20 Flex" style={style.GpsPacketDisrepancy}>
          {intl.formatMessage({ id: 'label.gpsPacketDiscrepancy' })}
          <SortButton
            sortDirection={getSortDirection('discrepancyPercentage')}
            onClick={handleSort}
            sortBy="discrepancyPercentage"
            isVisible={!isPrint}
          />
        </th>
      </tr>
    </thead>
  );
}

HeaderRow.defaultProps = {
  listState: {},
};

HeaderRow.propTypes = {
  listState: PropTypes.object,
  changeSort: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HeaderRow);
