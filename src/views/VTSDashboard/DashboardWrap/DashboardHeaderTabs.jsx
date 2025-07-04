import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Button from '../../../components/Button';
import { trackingStatusEnums } from '../../../common/constants/vehicleStatuses';
import Icon from '../../../components/Icon';
import { vehicleStatus } from '../../../common/helpers/vehicles';

function DashboardHeaderTabs({ intl, selectedTab, setSelectedTab, vehiclesCount }) {
  const handleClickTab = (event) => {
    setSelectedTab({ trackingStatus: event.target.name });
  };

  const getSelectedClass = (tab) => (selectedTab === tab && 'selected-dashboard-header-button');

  return (
    <div className='Flex'>
      <Button
        className={`Flex Font--S12 Border-None dashboard-header-buttons Font--WB Pl-12 ${getSelectedClass(trackingStatusEnums.ALL)}`}
        type="plain"
        name={trackingStatusEnums.ALL}
        onClick={handleClickTab}
      >
        <span>
          {intl.formatMessage({ id: 'label.all' })}
        </span>
        <span>
          <span className={`Mr-8 Font--S18 ${vehicleStatus.ALL}`}>{vehiclesCount[vehicleStatus.ALL]}</span>
        </span>
      </Button>

      <Button
        className={`Flex Font--S12 Border-None dashboard-header-buttons Font--WB Pl-12 Ml-10 ${getSelectedClass(trackingStatusEnums.MOVING)}`}
        type="plain"
        name={trackingStatusEnums.MOVING}
        onClick={handleClickTab}
      >
        <span>
          {intl.formatMessage({ id: 'label.moving' })}
        </span>
        <span>
          <span className={`Mr-8 Font--S18 ${vehicleStatus.MOVING}`}>{vehiclesCount[vehicleStatus.MOVING]}</span>
          <Icon name="moving-vehicles" />
        </span>
      </Button>

      <Button
        className={`Flex Font--S12 Border-None dashboard-header-buttons Font--WB Pl-12 Ml-10 ${getSelectedClass(trackingStatusEnums.PARKED)}`}
        type="plain"
        name={trackingStatusEnums.PARKED}
        onClick={handleClickTab}
      >
        <span>
          {intl.formatMessage({ id: 'label.halt' })}
        </span>
        <span>
          <span className={`Mr-8 Font--S18 ${vehicleStatus.PARKED}`}>{vehiclesCount[vehicleStatus.PARKED]}</span>
          <Icon name="parked-vehicles" />
        </span>
      </Button>

      <Button
        className={`Flex Font--S12 Border-None dashboard-header-buttons Font--WB Pl-12 Ml-10 ${getSelectedClass(trackingStatusEnums.UNAUTHORIZED)}`}
        type="plain"
        name={trackingStatusEnums.UNAUTHORIZED}
        onClick={handleClickTab}
        title={intl.formatMessage({ id: 'label.unauthMove' })}
      >
        <span
          style={{
            textOverflow: 'ellipsis',
            width: '90px',
            display: 'block',
            overflow: 'hidden',
            paddingBottom: 1,
            paddingTop: 2
          }}
        >
          {intl.formatMessage({ id: 'label.unauthMove' })}
        </span>
        <span>
          <span className={`Mr-8 Font--S18 ${vehicleStatus.UNAUTHORIZED}`}>{vehiclesCount[vehicleStatus.UNAUTHORIZED]}</span>
          <Icon name="unauthorised-vehicles" />
        </span>
      </Button>
      <Button
        className={`Flex Font--S12 Border-None dashboard-header-buttons Font--WB Pl-12 Ml-10 ${getSelectedClass(trackingStatusEnums.NO_RESPONSE)}`}
        type="plain"
        name={trackingStatusEnums.NO_RESPONSE}
        onClick={handleClickTab}
      >
        <span>
          {intl.formatMessage({ id: 'label.noResponse' })}
        </span>
        <span className='Flex'>
          <span className={`Mr-8 Font--S18 ${vehicleStatus.NO_RESPONSE}`}>{vehiclesCount[vehicleStatus.NO_RESPONSE]}</span>
          <Icon name="no-response-vehicles" />
        </span>
      </Button>
      <Button
        className={`Flex Font--S12 Border-None dashboard-header-buttons Font--WB Pl-12 Ml-10 ${getSelectedClass(trackingStatusEnums.DEVICE_MALFUNCTIONING)}`}
        type="plain"
        name={trackingStatusEnums.DEVICE_MALFUNCTIONING}
        onClick={handleClickTab}
      >
        <span className="Device_Malfunctioning_Tab">
          {intl.formatMessage({ id: 'label.deviceMalfunctioning' })}
        </span>
        <span className='Flex'>
          <span className={`Mr-8 Font--S18 ${vehicleStatus.DEVICE_MALFUNCTIONING}`}>{vehiclesCount[vehicleStatus.DEVICE_MALFUNCTIONING]}</span>
          <Icon name="device-malfunctioning-vehicles" />
        </span>
      </Button>
    </div>
  );
}

DashboardHeaderTabs.propTypes = {
  intl: PropTypes.object.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
  vehiclesCount: PropTypes.object.isRequired,
};

export default injectIntl(DashboardHeaderTabs);