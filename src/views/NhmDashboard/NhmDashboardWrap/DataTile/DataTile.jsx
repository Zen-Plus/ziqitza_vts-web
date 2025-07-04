import React from 'react';
import PropTypes from 'prop-types';
import { isNullOrUndefined } from '../../../../common/helpers/collectionUtils';
import Icon from '../../../../components/Icon/Icon';

function DataTile({
  headerBgColor,
  headerText,
  keyOne,
  keyTwo,
  keyOneIcon,
  keyTwoIcon,
  totalCallsValue,
  caseAssignedValue,
}) {
  return (
    <div className="DataTileWrapper">
      <div className="Head" style={{ backgroundColor: '#F0F0F0', color: '#1E1E1E' }}>
        {headerText}
      </div>
      <div className="Flex">
        <div className="col-6 Column Flex Flex-Direction-Column ColumnOne Align-Items-Start" style={{ borderColor: headerBgColor }}>
          <div className="KeyStyle"><Icon name={keyOneIcon} height={28} width={28} />{keyOne}</div>
          <div className="ValueStyle">
            {!isNullOrUndefined(totalCallsValue) ? totalCallsValue : 'NA'}
          </div>
        </div>
        <div className="col-6 Column Flex Flex-Direction-Column Align-Items-Start">
          <div className="KeyStyle"><Icon style={{ marginRight: '4px' }} name={keyTwoIcon} height={28} width={28} />{keyTwo}</div>
          <div className="ValueStyle">
            {!isNullOrUndefined(caseAssignedValue) ? caseAssignedValue : 'NA'}
          </div>
        </div>
      </div>
    </div>
  );
}

DataTile.propTypes = {
  headerBgColor: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  keyOne: PropTypes.string.isRequired,
  keyTwo: PropTypes.string.isRequired,
  totalCallsValue: PropTypes.string.isRequired,
  caseAssignedValue: PropTypes.string.isRequired,
  keyOneIcon: PropTypes.string.isRequired,
  keyTwoIcon: PropTypes.string.isRequired,
};

export default DataTile;
