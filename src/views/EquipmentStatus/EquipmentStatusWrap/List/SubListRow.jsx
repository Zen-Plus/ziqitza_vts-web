import React from 'react';
import PropTypes from 'prop-types';
import navigation from '../../../NhmDashboard/navigation';

function SubListRow({
  index,
  listLength,
  details,
  setNhmDashboardView,
  dailyStatusProps,
}) {
  const backGroundClass = index % 2 === 0;

  return (
    <tr className="ListBodyRowWrapper Font--S14" style={{
      borderTop: index === 0 ? '10px solid #fff' : '',
      borderBottom: index === listLength - 1 ? '10px solid #fff' : ''
    }}>
      <td rowSpan={1} style={{ borderBottomWidth: 0 }} />
      <td className={`ListBodyRowText ${backGroundClass ? '' : 'ListBodyRowBgColor'}`}>
        {details.vehicleRegistrationNumber}
      </td>
      <td className={`ListBodyRowText ${backGroundClass ? '' : 'ListBodyRowBgColor'}`}>
        {1}
      </td>
      <td className={`ListBodyRowText ${backGroundClass ? '' : 'ListBodyRowBgColor'}`}>
        {details.onRoad}
      </td>
      <td className={`ListBodyRowText ${backGroundClass ? '' : 'ListBodyRowBgColor'}`}>
        {details.offRoad}
      </td>
      <td className={`ListBodyRowText ${backGroundClass ? '' : 'ListBodyRowBgColor'}`}>
        <div
          role="button"
          onClick={() => {
            setNhmDashboardView({ type: navigation.EQUIPMENT_DAILY_STATUS, query: {
              ...dailyStatusProps,
              vehicleRegistrationNumber: details.vehicleRegistrationNumber,
              vehicleId: details.vehicleId,
            } });
          }}
          onKeyPress={() => {}}
          tabIndex={0}
          className="Text-Decoration-Underline Warmblue-Text"
        >
          {details.totalEquipment}
        </div>
      </td>
      <td className={`ListBodyRowText ${backGroundClass ? '' : 'ListBodyRowBgColor'}`}>
        {details.workingEquipment}
      </td>
      <td className={`ListBodyRowText ${backGroundClass ? '' : 'ListBodyRowBgColor'}`}>
        {details.notWorkingEquipment}
      </td>
    </tr>
  );
}

SubListRow.defaultProps = {
  details: {},
  setNhmDashboardView: () => {},
  dailyStatusProps: {},
};

SubListRow.propTypes = {
  index: PropTypes.number.isRequired,
  listLength: PropTypes.number.isRequired,
  details: PropTypes.object,
  setNhmDashboardView: PropTypes.func,
  dailyStatusProps: PropTypes.object,
};

export default SubListRow;
