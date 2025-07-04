import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import useForm from '../../../../common/hooks/form';
import { fieldNames, fields } from './formConfig';
import { DistrictsContext, withDistrictsProvider } from '../../../../providers/withDistrictProvider';
import { ReportFilterContext, withReportFilterProvider } from '../../../../providers/withReportFilterProvider';
import SelectDrop from '../../../../components/SelectDrop';
import { ButtonCustom } from '../../../../components/Button';
import withProvider from '../../../../common/hocs/withProvider/withProvider';
import { minDate } from '../../../NhmDashboard/utils';


function handleSubmit(values) {
  this.onSubmit(values);
}


const SelectDistrict = withProvider({
  getResourcesActionKey: 'getProjectDistrictsList',
  loadMoreActionKey: 'getProjectDistrictsListLoadMore',
  context: DistrictsContext,
  contextProvider: withDistrictsProvider,
  stateKey: 'districts',
}, SelectDrop);

const SelectVehicle = withProvider({
  getResourcesActionKey: 'getReportFilterList',
  loadMoreActionKey: 'getReportFilterListLoadMore',
  context: ReportFilterContext,
  contextProvider: withReportFilterProvider,
  stateKey: 'reportFilter',
}, SelectDrop);


function validate({ values = {} }) {
  const errors = {};
  if (!values[fieldNames.FROM_DATE]) {
    errors[fieldNames.FROM_DATE] = 'validation.require.text.field';
  }
  return errors;
}


function disabledDate(current) {
  return (moment().isBefore(current, 'day') || moment(minDate).isAfter(current, 'day'));
}


function getInitialValues(values = {}){
  const _values = { ...values };
  _values.fromDate = moment();
  return _values;
}

function Filter({ intl, onReset, initialValues, ...restProps }) {
  const [vehicleQuery, setVehicleQuery] = useState(false);
  const {
    values, events, errors, reset,
  } = useForm({
    initialValues: getInitialValues(),
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: validate.bind({ ...restProps }),
  });
  const { onSubmit, onSelect } = events;

  useEffect(() => {
      if(values[fieldNames.DISTRICT] && values[fieldNames.DISTRICT].id) {
        setVehicleQuery({ districtId: [values[fieldNames.DISTRICT].id] })
      } else {
        setVehicleQuery(false);
      }
  }, [values[fieldNames.DISTRICT]])

  function handleResetClick() {
    reset();
    onReset();
  }
  return (
    <div className="MedicineInventoryFilterWrap mt-3">
      <div className="Form">
        <div className="row">
          <div className="Field DateRangePickerField col-sm-6 col-lg-2 d-flex justify-content-center mt-2 mt-md-1">
            <DatePicker
              labelText={intl.formatMessage({ id: 'label.date' })}
              value={values[fieldNames.FROM_DATE]}
              errorText={errors[fieldNames.FROM_DATE]
                && intl.formatMessage({ id: errors[fieldNames.FROM_DATE] })}
              onChange={onSelect(fieldNames.FROM_DATE)}
              disabledDate={disabledDate}
              allowClear={false}
              format="YYYY-MM-DD"
            />
          </div>
          <div className="Field col-sm-6 col-lg-3 mt-3 mt-sm-2 mt-md-1">
            <SelectDistrict
              labelText={intl.formatMessage({ id: 'label.district' })}
              id="DistrictSelect"
              onChangeSelect={onSelect(fieldNames.DISTRICT)}
              selectedItem={values[fieldNames.DISTRICT]}
            />
          </div>
          <div className="Field col-sm-6 col-lg-4 mt-3 mt-sm-2 mt-md-1">
            <SelectVehicle
              labelText={intl.formatMessage({ id: 'label.vehicleRegistrationNo' })}
              id="VehicleRegistrationNuber"
              onChangeSelect={onSelect(fieldNames.VEHICLE_REGISTRATION_NO)}
              selectedItem={values[fieldNames.VEHICLE_REGISTRATION_NO]}
              query={vehicleQuery}
              disabled={!vehicleQuery}
            />
          </div>
          <div className="col-lg-1 col-sm-3 mt-3 mt-sm-4 mt-md-3">
            <ButtonCustom
              className="Box--Shadow"
              onClick={onSubmit}
              labelText={intl.formatMessage({ id: 'label.submit' })}
              type="link"
            />
          </div>
          <div className="col-lg-1 col-sm-3 mt-3 mt-sm-4 mt-md-3 ms-lg-3">
            <ButtonCustom
              className="Box--Shadow"
              onClick={handleResetClick}
              labelText={intl.formatMessage({ id: 'label.reset' })}
              type="link"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Filter.defaultProps = {
  initialValues: {},
}

Filter.propTypes = {
  initialValues: PropTypes.object,
};

export default injectIntl(Filter);

