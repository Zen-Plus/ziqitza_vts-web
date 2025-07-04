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
        <th className="ListMaster__Header__Item Break_All Ml-10" style={style.vendor}>
          {intl.formatMessage({ id: 'label.vendor' })}
          <SortButton
            sortDirection={getSortDirection('vendorName')}
            onClick={handleSort}
            sortBy="vendorName"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Ml-15" style={style.vehicleRegNo}>
          {intl.formatMessage({ id: 'label.vehicleRegNo' })}
          <SortButton
            sortDirection={getSortDirection('vehicleRegistrationNumber')}
            onClick={handleSort}
            sortBy="vehicleRegistrationNumber"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Ml-15" style={isPrint ? style.printNoOfTrips :style.noOfTrips}>
          {intl.formatMessage({ id: 'label.noOfTrips' })}
          <SortButton
            sortDirection={getSortDirection('tripCount')}
            onClick={handleSort}
            sortBy="tripCount"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Ml-15" style={style.distance}>
          {intl.formatMessage({ id: 'label.distance' })}
          <SortButton
            sortDirection={getSortDirection('distance')}
            onClick={handleSort}
            sortBy="distance"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Break_All Ml-15 Flex" style={style.distanceOnRoad}>
          {intl.formatMessage({ id: 'label.distanceOnRoad' })}
          <SortButton
            sortDirection={getSortDirection('onRoadDistance')}
            onClick={handleSort}
            sortBy="onRoadDistance"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Break_All Ml-15 Flex" style={style.distanceOffRoad}>
          {intl.formatMessage({ id: 'label.distanceOffRoad' })}
          <SortButton
            sortDirection={getSortDirection('offRoadDistance')}
            onClick={handleSort}
            sortBy="offRoadDistance"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Ml-15 Flex" style={style.unauthorisedMovementDistance}>
          {intl.formatMessage({ id: 'label.unauthorisedMovementDistance' })}
          <SortButton
            sortDirection={getSortDirection('unauthorizedDistance')}
            onClick={handleSort}
            sortBy="unauthorizedDistance"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Break_All Ml-15 Flex" style={style.noOfAlertsGenerated}>
          {intl.formatMessage({ id: 'label.noOfAlertsGenerated' })}
          <SortButton
            sortDirection={getSortDirection('alertCount')}
            onClick={handleSort}
            sortBy="alertCount"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Ml-15 Flex" style={style.averageMileage}>
          {intl.formatMessage({ id: 'label.averageMileage' })}
          <SortButton
            sortDirection={getSortDirection('avgMileage')}
            onClick={handleSort}
            sortBy="avgMileage"
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
