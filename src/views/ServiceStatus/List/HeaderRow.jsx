import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import SortButton from '../../../components/ListUtils/SortButton';
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
        <th className="ListMaster__Header__Item" style={style.cluster}>
          {intl.formatMessage({ id: 'label.cluster' })}
          <SortButton
            sortDirection={getSortDirection('clusterName')}
            onClick={handleSort}
            sortBy="clusterName"
          />
        </th>
        <th className="ListMaster__Header__Item ML-20" style={style.healthStatus}>
          {intl.formatMessage({ id: 'label.healthStatus' })}
          <SortButton
            sortDirection={getSortDirection('healthStatus')}
            onClick={handleSort}
            sortBy="healthStatus"
          />
        </th>
        <th className="ListMaster__Header__Item ML-20" style={style.networkDelay}>
          {intl.formatMessage({ id: 'label.networkDelay' })}
          <SortButton
            sortDirection={getSortDirection('networkDelay')}
            onClick={handleSort}
            sortBy="networkDelay"
          />
        </th>
        <th className="ListMaster__Header__Item ML-20" style={style.processingDelay}>
          {intl.formatMessage({ id: 'label.processingDelay' })}
          <SortButton
            sortDirection={getSortDirection('processingDelay')}
            onClick={handleSort}
            sortBy="processingDelay"
          />
        </th>
        <th className="ListMaster__Header__Item ML-20" style={style.deviceCount}>
          <span className="Flex" style={{ width: '135px' }}>
            {intl.formatMessage({ id: 'label.deviceCount' })}
            <SortButton
              sortDirection={getSortDirection('deviceCount')}
              onClick={handleSort}
              sortBy="deviceCount"
            />
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
