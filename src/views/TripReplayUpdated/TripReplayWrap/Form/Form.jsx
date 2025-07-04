import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import useForm from '../../../../common/hooks/form';
import SelectDrop from '../../../../components/SelectDrop';
import { fieldNames, fields } from './formConfig';
import DateRangePicker from '../../../../components/DateRangePicker';
import Checkbox from '../../../../components/CheckBox';
import { validateRequire, validateNumber } from '../../../../common/helpers/validators';
import { searchParameter } from '../util';

function handleSubmit(values) {
  this.onSubmit(values);
}

function getInitialValues(values = {}) {
  const _values = { ...values };
  return _values;
}

function validate({ values = {} }) {
  const errors = {};

  if (!values[fieldNames.SEARCH_PARAMETER]) {
    errors[fieldNames.SEARCH_PARAMETER] = 'validation.require.text.field';
  }
  if (!validateRequire(values[fieldNames.SEARCH_VALUE])) {
    errors[fieldNames.SEARCH_VALUE] = 'validation.require.text.field';
  }
  if (values[fieldNames.SEARCH_PARAMETER]
      && values[fieldNames.SEARCH_PARAMETER].id === searchParameter.VEHICLE_REGISTRATION_NUMBER) {

    const startDate = values[fieldNames.DATE_RANGE] && values[fieldNames.DATE_RANGE][0];
    const endDate = values[fieldNames.DATE_RANGE] && values[fieldNames.DATE_RANGE][1];

    if (!(values[fieldNames.DATE_RANGE] && values[fieldNames.DATE_RANGE].length)) {
      errors[fieldNames.DATE_RANGE] = 'validation.require.text.field';
    } else if (startDate && endDate) {
      const diff = moment(endDate).diff(moment(startDate), 'minutes');
      if(diff > 2880) {
        errors[fieldNames.DATE_RANGE] = 'validation.invalid.dateRange.field';
      }
    }
    

    if (startDate && endDate) {
      const maxTime = endDate.diff(startDate, 'minutes');
      const maxMinutes = Math.floor((maxTime / 4));
      if (!(values[fieldNames.PACKET_FREQUENCY])) {
        errors[fieldNames.PACKET_FREQUENCY] = 'validation.require.text.field';
      } else if (!validateNumber(values[fieldNames.PACKET_FREQUENCY])) {
        errors[fieldNames.PACKET_FREQUENCY] = 'validation.invalid.text.data';
      } else if (parseInt(values[fieldNames.PACKET_FREQUENCY], 10) < 1
        || parseInt(values[fieldNames.PACKET_FREQUENCY], 10) > maxMinutes) {
        errors[fieldNames.PACKET_FREQUENCY] = 'validation.invalid.text.number';
      }
    }

    if (!(values[fieldNames.PACKET_FREQUENCY])) {
      errors[fieldNames.PACKET_FREQUENCY] = 'validation.require.text.field';
    } else if (!validateNumber(values[fieldNames.PACKET_FREQUENCY])) {
      errors[fieldNames.PACKET_FREQUENCY] = 'validation.invalid.text.data';
    }
  }

  return errors;
}

function Form({
  initialValues, pickListData, onLocationRequiredClick, locationRequired, ...restProps
}) {
  const {
    values, errors, events,
  } = useForm({
    initialValues: getInitialValues(initialValues),
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: validate.bind(restProps),
  });
  const [dates, setDates] = useState(undefined);

  const {
    intl,
  } = restProps;
  const {
    onBlur, onKeyUp, onChange, onSubmit, onSelect,
  } = events;

  const startDate = values[fieldNames.DATE_RANGE] && values[fieldNames.DATE_RANGE][0];
  const endDate = values[fieldNames.DATE_RANGE] && values[fieldNames.DATE_RANGE][1];
  let maxPackets = null;
  if (startDate && endDate) {
    const maxTime = endDate.diff(startDate, 'minutes');
    maxPackets = Math.floor((maxTime / 4));
  }
  

  function disabledDate(current) {
    if (!dates || dates.length === 0) {
      return (moment().subtract(3, 'months') > current
        || moment().endOf('day') < moment(current).endOf('day'));
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 2;
    const tooEarly = dates[2] && dates[1].diff(current, 'days') > 2;
    return (moment().subtract(3, 'months') > current
      || moment().endOf('day') < moment(current).endOf('day')) || tooEarly || tooLate;
  }

  function handleCalendarChange(value) {
    setDates(value);
  }

  useEffect(() => {
    setDates(undefined);
  }, [values[fieldNames.SEARCH_PARAMETER]]);

  return (
    <div className="Flex" style={{ justifyContent: 'space-between', padding: 0 }}>
      <div className="Flex" style={{ flexWrap: 'wrap', width: 885, marginLeft: '-10px' }}>
        <div className="Field SearchPrameterDropDown">
          <SelectDrop
            id="SelectSearchParameter"
            dropListValues={pickListData.TripReplayParameter}
            onChangeSelect={onSelect(fieldNames.SEARCH_PARAMETER)}
            selectedItem={values[fieldNames.SEARCH_PARAMETER]}
            labelText={intl.formatMessage({ id: 'label.searchParameter' })}
            errorText={errors[fieldNames.SEARCH_PARAMETER]
              && intl.formatMessage({ id: errors[fieldNames.SEARCH_PARAMETER] })}
          />
        </div>
        <div className="Field">
          <Input
            name={fieldNames.SEARCH_VALUE}
            labelText={intl.formatMessage({ id: 'label.searchValue' })}
            placeholder={intl.formatMessage({ id: 'label.searchValue' })}
            value={values[fieldNames.SEARCH_VALUE]}
            errorText={errors[fieldNames.SEARCH_VALUE]
                && intl.formatMessage({ id: errors[fieldNames.SEARCH_VALUE] })}
            maxLength={40}
            disabled={!values[fieldNames.SEARCH_PARAMETER]}
            onBlur={onBlur}
            onKeyUp={onKeyUp}
            onChange={onChange}
          />
        </div>
        {values[fieldNames.SEARCH_PARAMETER]
          && values[fieldNames.SEARCH_PARAMETER].id === searchParameter.VEHICLE_REGISTRATION_NUMBER
          ? (
            <>
              <div className="Field">
                <DateRangePicker
                  labelText={intl.formatMessage({ id: 'label.dateRange' })}
                  value={dates}
                  onChange={(value) => onSelect(fieldNames.DATE_RANGE)(value)}
                  onCalendarChange={handleCalendarChange}
                  allowClear
                  showTime={{ format: 'HH:mm' }}
                  style={{ width: '300px' }}
                  disabledDate={disabledDate}
                  format="DD MMM YYYY HH:mm"
                  errorText={errors[fieldNames.DATE_RANGE]
                    && intl.formatMessage({ id: errors[fieldNames.DATE_RANGE] }, { day: 2 })}
                />
              </div>
              <div className="Font--WB Field Mt-20" style={{ letterSpacing: '0.3px', alignItems: 'center' }}>
                <Checkbox
                  checked={locationRequired}
                  name={fieldNames.LOCATION_REQUIRED}
                  onChange={onLocationRequiredClick}
                />
                <span className="Ml-12">
                  {intl.formatMessage({ id: 'label.locationRequired' })}
                </span>
              </div>
              <div className="Field">
                <Input
                  name={fieldNames.PACKET_FREQUENCY}
                  labelText={intl.formatMessage({ id: 'label.packetFrequencyInMins' })}
                  placeholder={intl.formatMessage({ id: 'label.packetFrequencyInMins' })}
                  value={values[fieldNames.PACKET_FREQUENCY]}
                  errorText={errors[fieldNames.PACKET_FREQUENCY]
                && intl.formatMessage({ id: errors[fieldNames.PACKET_FREQUENCY] }, {
                  min: 1,
                  max: maxPackets,
                })}
                  maxLength={20}
                  onBlur={onBlur}
                  onKeyUp={onKeyUp}
                  onChange={onChange}
                />
              </div>
            </>
          )
          : null}
      </div>
      <div>
        <Button
          style={{ width: '255px', borderRadius: '4px' }}
          type="default"
          onClick={onSubmit}
        >
          {intl.formatMessage({ id: 'label.search' })}
        </Button>
      </div>
    </div>
  );
}

Form.defaultProps = {
  isProcessing: false,
  renderProps: () => { },
  onCancel: () => { },
  initialValues: {},
};

Form.propTypes = {
  intl: PropTypes.object.isRequired,
  onCancel: PropTypes.func,
  isProcessing: PropTypes.bool,
  initialValues: PropTypes.object,
  renderProps: PropTypes.func,
  pickListData: PropTypes.object.isRequired,
  locationRequired: PropTypes.bool.isRequired,
  onLocationRequiredClick: PropTypes.func.isRequired,
};

export default injectIntl(Form);
