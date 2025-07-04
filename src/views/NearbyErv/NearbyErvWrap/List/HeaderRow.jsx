import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import SortButton from '../../../../components/ListUtils/SortButton';
import style from './rowStyle';

function HeaderRow({
  listState,
  changeSort,
  intl,
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
      <tr className="ListMaster__Header" style={{ ...style.root, width: 1130 }}>
        <th className="ListMaster__Header__Item" style={style.vehicleRegNo}>
          {intl.formatMessage({ id: 'label.vehRegNo' })}
          <SortButton
            sortDirection={getSortDirection('registrationNumber')}
            onClick={handleSort}
            sortBy="registrationNumber"
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.aerialDistance}>
          {intl.formatMessage({ id: 'label.aerialDistance' })}
          <SortButton
            sortDirection={getSortDirection('aerialDistance')}
            onClick={handleSort}
            sortBy="aerialDistance"
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.roadDistance}>
          {intl.formatMessage({ id: 'label.roadDistance' })}
          <SortButton
            sortDirection={getSortDirection('roadDistance')}
            onClick={handleSort}
            sortBy="roadDistance"
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.parkingLocation}>
          {intl.formatMessage({ id: 'label.parkingLocation' })}
          <SortButton
            sortDirection={getSortDirection('parkingLocation')}
            onClick={handleSort}
            sortBy="parkingLocation"
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.trackingStatus}>
          {intl.formatMessage({ id: 'label.trackingStatus' })}
          <SortButton
            sortDirection={getSortDirection('trackingStatusValue')}
            onClick={handleSort}
            sortBy="trackingStatusValue"
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.vehicleStatus}>
          {intl.formatMessage({ id: 'label.vehicleStatus' })}
          <SortButton
            sortDirection={getSortDirection('milestoneValue')}
            onClick={handleSort}
            sortBy="milestoneValue"
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.lastReportedLocation}>
          {intl.formatMessage({ id: 'label.lastReportedLocation' })}
          <SortButton
            sortDirection={getSortDirection('lastReportedLocation')}
            onClick={handleSort}
            sortBy="lastReportedLocation"
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
  intl: PropTypes.object.isRequired,
  listState: PropTypes.object,
  changeSort: PropTypes.func.isRequired,
};

export default injectIntl(HeaderRow);
