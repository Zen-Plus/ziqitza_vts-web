import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../../components/CheckBox';
import { injectIntl } from 'react-intl';
import SortButton from '../../../components/ListUtils/SortButton';
import style from './rowStyle';

function HeaderRow({
  listState,
  handleCheckBoxClick,
  changeSort,
  isSelectedAll,
  mode,
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
  const isPrint = mode === 'Print';

  return (
    <thead>
      <tr className="ListMaster__Header" style={{ ...style.root, paddingBottom: '4px', paddingTop: '4px' }}>
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
        <th className="ListMaster__Header__Item Break_All Ml-20" style={style.vendor}>
          {intl.formatMessage({ id: 'label.vendor' })}
          <SortButton
            sortDirection={getSortDirection('vendorName')}
            onClick={handleSort}
            sortBy="vendorName"
            isVisible={!isPrint}
          />
        </th>
        <th className="ListMaster__Header__Item Ml-10 Flex" style={style.vehicleRegNo}>
            {intl.formatMessage({ id: 'label.vehicleRegNo' })}
            <SortButton
              sortDirection={getSortDirection('vehicleRegistrationNumber')}
              onClick={handleSort}
              sortBy="vehicleRegistrationNumber"
              isVisible={!isPrint}
            />
        </th>
        <th className="ListMaster__Header__Item Break_All Ml-20 Flex" style={style.tripId}>
            {intl.formatMessage({ id: 'label.trip/jobId' })}
            <SortButton
              sortDirection={getSortDirection('jobNumber')}
              onClick={handleSort}
              sortBy="jobNumber"
              isVisible={!isPrint}
            />
        </th>
        <th className="ListMaster__Header__Item Ml-20 Flex" style={style.requestType}>
            {intl.formatMessage({ id: 'label.requestType' })}
            <SortButton
              sortDirection={getSortDirection('requestType')}
              onClick={handleSort}
              sortBy="requestType"
              isVisible={!isPrint}
            />
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.startTime}>
            {intl.formatMessage({ id: 'label.startTime' })}
            <SortButton
              sortDirection={getSortDirection('startDate')}
              onClick={handleSort}
              sortBy="startDate"
              isVisible={!isPrint}
            />
        </th>
        <th className="ListMaster__Header__Item" style={style.endTime}>
            {intl.formatMessage({ id: 'label.endTime' })}
            <SortButton
              sortDirection={getSortDirection('endDate')}
              onClick={handleSort}
              sortBy="endDate"
              isVisible={!isPrint}
            />
        </th>
        <th className="ListMaster__Header__Item" style={style.tripStatus}>
            {intl.formatMessage({ id: 'label.tripStatus' })}
            <SortButton
              sortDirection={getSortDirection('tripStatus')}
              onClick={handleSort}
              sortBy="tripStatus"
              isVisible={!isPrint}
            />
        </th>
        <th className="ListMaster__Header__Item Ml-10 Flex" style={style.timeTaken}>
            {`${intl.formatMessage({ id: 'label.timeTaken' })} (hh:mm:ss)`}
            <SortButton
              sortDirection={getSortDirection('timeTaken')}
              onClick={handleSort}
              sortBy="timeTaken"
              isVisible={!isPrint}
            />
        </th>
        <th className="ListMaster__Header__Item Ml-10" style={style.distanceStatus}>
            {intl.formatMessage({ id: 'label.distanceStatus' })}
        </th>
        <th className="ListMaster__Header__Item Ml-10" style={style.closureStatus}>
            {intl.formatMessage({ id: 'label.closureStatus' })}
        </th>
        <th className="ListMaster__Header__Item" style={style.distance}>
            {intl.formatMessage({ id: 'label.distance' })}
            <SortButton
              sortDirection={getSortDirection('distance')}
              onClick={handleSort}
              sortBy="distance"
              isVisible={!isPrint}
            />
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.alertsGenerated}>
            {intl.formatMessage({ id: 'label.noOfAlertsGenerated' })}
            <SortButton
              sortDirection={getSortDirection('alertCount')}
              onClick={handleSort}
              sortBy="alertCount"
              isVisible={!isPrint}
            />
        </th>
      </tr>
    </thead>
  );
}

HeaderRow.defaultProps = {
  listState: {},
  handleCheckBoxClick: () => { },
  isSelectedAll: false,
  mode: '',
};

HeaderRow.propTypes = {
  handleCheckBoxClick: PropTypes.func,
  listState: PropTypes.object,
  changeSort: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  isSelectedAll: PropTypes.bool,
  mode: PropTypes.string,
};

export default injectIntl(HeaderRow);
