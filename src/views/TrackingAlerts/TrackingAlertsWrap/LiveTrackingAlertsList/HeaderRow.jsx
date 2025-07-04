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
      <tr className="ListMaster__Header" style={style.root}>
        <th className="ListMaster__Header__Item" style={style.jobId}>
          {intl.formatMessage({ id: 'label.jobId' })}
          <SortButton
            sortDirection={getSortDirection('jobId')}
            onClick={handleSort}
            sortBy="jobId"
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.vehicleRegisterationNo}>
          {intl.formatMessage({ id: 'label.vehicleRegistrationNo' })}
          <SortButton
            sortDirection={getSortDirection('vehicleRegistrationNumber')}
            onClick={handleSort}
            sortBy="vehicleRegistrationNumber"
          />
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.jobAssignmentTime}>
          {intl.formatMessage({ id: 'label.jobAssignmentTime' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.alertCount}>
          {intl.formatMessage({ id: 'label.alertCount' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.openAlert}>
          <span className="Flex" style={{ width: '135px' }}>
            {intl.formatMessage({ id: 'label.openAlert' })}
          </span>
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
