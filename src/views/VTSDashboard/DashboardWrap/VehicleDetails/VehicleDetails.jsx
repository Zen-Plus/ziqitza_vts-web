import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Icon from '../../../../components/Icon';
import Input from '../../../../components/Input';
import Modal from '../../../../components/Modal';
import { getFieldValue, fieldNames, getDateAndTime, getColorClassForBatteryLevel } from '../../../../common/helpers/vehicles';

function VehicleDetails(props) {
  const { intl, selectedVehicle, setVehicleDetailVisiblity, isListView, vehicleDetail, setVehicleDetails, locale } = props;

  const { date, time } = getDateAndTime({ locale, timeStamp: vehicleDetail.lastPacketArrived });

  const onCancel = () => {
    setVehicleDetailVisiblity({ selectedVehicleToView: null });
    setVehicleDetails({ vehicleDetail: {} });
  }

  return (
    <Modal
      width={1200}
      visible={!!selectedVehicle}
      footer={false}
      maskClosable={false}
      centered
      onCancel={onCancel}
      wrapClassName="Vehicle-Details-Modal"
    >
      <div className='ZiqitzaVTS'>
        <div className="Font--WB Font--S20 Flex Mr-35 Align-Items-Center Flex-Space-Between Ml-10">
          <span>
            {intl.formatMessage({ id: 'view.vtsDashboard.vehicleDetailsModal.title.heading' })}
            {' '}
            {vehicleDetail.lastPacketArrived
              ? intl.formatMessage({ id: 'view.vtsDashboard.vehicleDetailsModal.title.time' }, {
                date,
                time,
              })
              : intl.formatMessage({ id: 'label.noHistoryOrLiveData'}) 
            }
          </span>
          {isListView
            && <span
              className='Flex Font--S16 Cursor-Pointer Align-Items-Center'
              onClick={() => setVehicleDetailVisiblity({ isSelectedVehicleMapVisible: true })}
            >
              <Icon name='map' />
              <span className='Ml-8'>
                {intl.formatMessage({ id: 'view.vtsDashboard.vehicleDetailsMapModal.title' })}
              </span>
            </span>
          }
        </div>
        <div className="Mt-20 Ml-10 Divider-Bottom-Gray90" style={{ marginRight: '10px' }} />
        <div className="Flex Mt-20 Form-Wrap">
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.vehicalRegNo|IMEINo' })}
              value={getFieldValue(fieldNames['vehicalRegNo|IMEINo'], vehicleDetail)}
              isReadonly
            />
          </div>
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.make|model' })}
              value={getFieldValue(fieldNames['make|model'], vehicleDetail)}
              isReadonly
            />
          </div>
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.vehicleOwner|number' })}
              value={getFieldValue(fieldNames['vehicleOwner|number'], vehicleDetail)}
              isReadonly
            />
          </div>
          {
            vehicleDetail && vehicleDetail.clusterLeaderName1 && vehicleDetail.clusterLeaderNumber1
            &&
            <div className="Field">
              <Input
                labelText={intl.formatMessage({ id: 'label.clusterLeader1|number1' })}
                value={getFieldValue(fieldNames['clusterLeader1|number1'], vehicleDetail)}
                isReadonly
              />
            </div>
          }
          {
            vehicleDetail && vehicleDetail.clusterLeaderName2 && vehicleDetail.clusterLeaderNumber2
            &&
            <div className="Field">
              <Input
                labelText={intl.formatMessage({ id: 'label.clusterLeader2|number2' })}
                value={getFieldValue(fieldNames['clusterLeader2|number2'], vehicleDetail)}
                isReadonly
              />
            </div>}
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.district|parkingLoc' })}
              value={getFieldValue(fieldNames['district|parkingLoc'], vehicleDetail)}
              isReadonly
            />
          </div>
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.pilotContact1|contact2' })}
              value={getFieldValue(fieldNames['pilotContact1|contact2'], vehicleDetail)}
              isReadonly
            />
          </div>
        </div>
        <div className="Font--WB Ml-10 Mt-40 Font--S20">
          <span>
            {intl.formatMessage({ id: 'view.vtsDashboard.vehicleDetails.additionalInfo' })}
          </span>
        </div>
        <div className="Flex Mt-20 Form-Wrap Vehicle-Details-Add-Info">
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.lastReportedLocation' })}
              value={getFieldValue(fieldNames['lastReportedLocation'], vehicleDetail)}
              isReadonly
            />
          </div>
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.offRoadreason' })}
              value={getFieldValue(fieldNames['offRoadreason'], vehicleDetail)}
              isReadonly
            />
          </div>
          {vehicleDetail && vehicleDetail.isObdDeviceInstalled
            &&
            <div className="Field">
              <Input
                labelText={intl.formatMessage({ id: 'label.speedObd' })}
                value={getFieldValue(fieldNames['speedObd'], vehicleDetail)}
                isReadonly
              />
            </div>
          }
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.odometerReadingGps' })}
              value={getFieldValue(fieldNames['odometerReadingGps'], vehicleDetail)}
              isReadonly
            />
          </div>
          {vehicleDetail && vehicleDetail.isObdDeviceInstalled
            &&
            <div className="Field">
              <Input
                labelText={intl.formatMessage({ id: 'label.odometerReadingObd' })}
                value={getFieldValue(fieldNames['odometerReadingObd'], vehicleDetail)}
                isReadonly
              />
            </div>
          }
          <div className={`Field Mb-6 ${getColorClassForBatteryLevel(vehicleDetail.gpsbatteryLevel)}`}>
            <Input
              labelText={intl.formatMessage({ id: 'label.gpsBatteryLevel' })}
              value={getFieldValue(fieldNames['gpsBatteryLevel'], vehicleDetail)}
              isReadonly
            />
          </div>
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.speedGps' })}
              value={getFieldValue(fieldNames['speedGps'], vehicleDetail)}
              isReadonly
            />
          </div>
          {vehicleDetail && vehicleDetail.isObdDeviceInstalled
            &&
            <>
              <div className="Field">
                <Input
                  labelText={intl.formatMessage({ id: 'label.fuelSensorReading' })}
                  value={getFieldValue(fieldNames['fuelSensorReading'], vehicleDetail)}
                  isReadonly
                />
              </div>
              <div className="Field Mb-6">
                <Input
                  labelText={intl.formatMessage({ id: 'label.acceleratorSensor' })}
                  value={getFieldValue(fieldNames['acceleratorSensor'], vehicleDetail)}
                  isReadonly
                />
              </div>
              <div className="Field Mb-6">
                <Input
                  labelText={intl.formatMessage({ id: 'label.tyreAirPressure' })}
                  value={getFieldValue(fieldNames['tyreAirPressure'], vehicleDetail)}
                  isReadonly
                />
              </div>
              <div className="Field Mb-6">
                <Input
                  labelText={intl.formatMessage({ id: 'label.engineControlUnit' })}
                  value={getFieldValue(fieldNames['engineControlUnit'], vehicleDetail)}
                  isReadonly
                />
              </div>
              <div className="Field Mb-6">
                <Input
                  labelText={intl.formatMessage({ id: 'label.safetyBelt' })}
                  value={getFieldValue(fieldNames['safetyBelt'], vehicleDetail)}
                  isReadonly
                />
              </div>
            </>
          }
        </div>
      </div>
    </Modal>
  );
}

VehicleDetails.propTypes = {
  selectedVehicle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  setVehicleDetailVisiblity: PropTypes.func.isRequired,
  isListView: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
  vehicleDetail: PropTypes.object.isRequired,
  setVehicleDetails: PropTypes.func.isRequired,
}

export default injectIntl(VehicleDetails);