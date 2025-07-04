import React from 'react';
import PropTypes from 'prop-types';
import style from './rowStyle';

const healthStatusDotColor = {
  SUCCESS: 'Green-dot',
  FAILURE: 'Red-dot',
};

function ListRow({
  index,
  details: clusterDetails,
  handleClusterClick,
}) {
  const handleOnClusterClick = () => {
    handleClusterClick(clusterDetails);
  };
  function handleKeyPressCluster(event) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      handleClusterClick(clusterDetails);
    }
  }

  const backGroundClass = (index % 2) !== 0 ? 'Bg__MASTER' : '';

  return (
    <tr className={`ListMaster__Row ${backGroundClass}`} style={{ paddingLeft: '19px', alignItems: 'center' }}>
      <td
        className="ListMaster__Row__Item Break-All Cursor-Pointer Navigation_Link"
        style={{
          ...style.cluster,
          pointerEvents: 'all',
        }}
      >
        <span
          onClick={handleOnClusterClick}
          onKeyPress={handleKeyPressCluster}
          role="button"
          tabIndex={0}
          style={{ outline: 'none' }}
        >
          {clusterDetails.clusterName}
        </span>
      </td>
      <td className="ListMaster__Row__Item ML-20 Flex" style={style.healthStatus}>
        <span className="Flex JustifyContent--Center" style={{ flex: '0 0 90px' }}>
          {clusterDetails.healthStatus ?
            <div className={`${healthStatusDotColor[clusterDetails.healthStatus]}`} /> : 'NA'}
        </span>
      </td>
      <td className="ListMaster__Row__Item ML-20 Flex Break-All" style={style.networkDelay}>
        <span className="Flex JustifyContent--Center" style={{ flex: '0 0 100px' }}>
          {clusterDetails.networkDelay}
        </span>
      </td>
      <td className="ListMaster__Row__Item ML-20 Flex Break-All" style={style.processingDelay}>
        <span className="Flex JustifyContent--Center" style={{ flex: '0 0 115px' }}>
          {clusterDetails.processingDelay}
        </span>
      </td>
      <td className="ListMaster__Row__Item ML-20 Break-All" style={style.deviceCount}>
        <span className="Flex JustifyContent--Center" style={{ flex: '0 0 87px' }}>
          {clusterDetails.deviceCount || 'NA'}
        </span>
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
  handleClusterClick: PropTypes.func.isRequired,
};

export default ListRow;
