import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon';
import SubListRow from './SubListRow';

function ListBodyRow({
  index,
  listLength,
  details,
  setNhmDashboardView,
  dailyStatusProps,
}) {
  const [isListRowExpanded, setIsListRowExpanded] = useState(false);
  // const backGroundClass = index % 2 === 0;
  const isVehicleList = details.vehicles && details.vehicles.length;

  function handleClickExpandIcon() {
    setIsListRowExpanded((pre) => !pre);
  }

  return (
    <>
      <tr className="ListBodyRowWrapper Font--S14 Bg-White Border-Gray">
        <td className={`ListBodyRowText Bg-White Border-Gray`}>
          <div
            role="button"
            onClick={handleClickExpandIcon}
            onKeyPress={() => {}}
            tabIndex={0}
            style={{
              pointerEvents: isVehicleList ? 'all' : 'none',
              opacity: isVehicleList ? 1 : 0.5,
              background: 'white'
            }}
          >
            {isListRowExpanded ? <Icon name="collapse" /> : <Icon name="expand" />}
          </div>
        </td>
        <td className={`ListBodyRowText Bg-White Border-Gray`}>
          {details.districtName}
        </td>
        <td className={`ListBodyRowText Bg-White Border-Gray`}>
          {details.totalAmbulance}
        </td>
        <td className={`ListBodyRowText Bg-White Border-Gray`}>
          {details.onRoad}
        </td>
        <td className={`ListBodyRowText Bg-White Border-Gray`}>
          {details.offRoad}
        </td>
        <td className={`ListBodyRowText Bg-White Border-Gray`}>
          {details.totalEquipment}
        </td>
        <td className={`ListBodyRowText Bg-White Border-Gray`}>
          {details.workingEquipment}
        </td>
        <td className={`ListBodyRowText Bg-White Border-Gray`}>
          {details.notWorkingEquipment}
        </td>
      </tr>
      {isListRowExpanded && (
        <>
          {!!details.vehicles.length &&
            details.vehicles.map((item, _index) => (
              <SubListRow
                index={_index}
                details={item}
                listLength={details.vehicles.length}
                setNhmDashboardView={setNhmDashboardView}
                dailyStatusProps={dailyStatusProps}
              />
            ))
          }
        </>
      )}
    </>
  );
}

ListBodyRow.defaultProps = {
  details: {},
  setNhmDashboardView: () => {},
  dailyStatusProps: {},
};

ListBodyRow.propTypes = {
  index: PropTypes.number.isRequired,
  listLength: PropTypes.number.isRequired,
  details: PropTypes.object,
  setNhmDashboardView: PropTypes.func,
  dailyStatusProps: PropTypes.object,
};

export default ListBodyRow;
