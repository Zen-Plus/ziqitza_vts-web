import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import DateRangePicker from '../../../../components/DateRangePicker';
import useForm from '../../../../common/hooks/form';
import { fieldNames, fields } from './formConfig';
import { ButtonCustom } from '../../../../components/Button';
import { minDate } from '../../../NhmDashboard/utils';


function handleSubmit(values) {
  this.onSubmit(values);
}


function validate({ values = {} }) {
  const errors = {};
  if (!(values[fieldNames.FROM_DATE] && values[fieldNames.FROM_DATE][0]
    && values[fieldNames.FROM_DATE][1])) {
    errors[fieldNames.FROM_DATE] = 'validation.require.text.field';
  }
  return errors;
}

function getInitialValues(values = {}) {
  const _values = { ...values };
  _values.date = [moment().startOf('month').startOf('day'), moment().endOf('day')];
  return _values;
}

function Filter({ intl, initialValues, ...restProps }) {
  const [dates, setDates] = useState([moment().startOf('month').startOf('day'), moment().endOf('day')]);
  const {
    values, events, errors,
  } = useForm({
    initialValues: getInitialValues(),
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: validate.bind({ ...restProps }),
  });
  const { onSubmit, onSelect } = events;


  function handleCalendarChange(value) {
    setDates(value);
    onSelect(fieldNames.FROM_DATE)(value);
  }

  function disabledDate(current) {
    return (moment().isBefore(current, 'day') || moment(minDate).isAfter(current, 'day'));
  }

  return (
    <div className="TotalFeedbackTakenFilterWrap mt-3 Ph-5">
      <div className="Form">
        <div className="row">
          <div className="Field DateRangePickerField col-sm-6 col-lg-4 d-flex justify-content-center mt-2 mt-md-1">
            <DateRangePicker
              labelText={intl.formatMessage({ id: 'label.date' })}
              value={dates}
              errorText={errors[fieldNames.FROM_DATE]
                && intl.formatMessage({ id: errors[fieldNames.FROM_DATE] })}
              onCalendarChange={handleCalendarChange}
              disabledDate={disabledDate}
              format="YYYY-MM-DD"
            />
          </div>
          <div className="col-lg-1 col-sm-3 mt-3 mt-sm-4 mt-md-3">
            <ButtonCustom
              className="Box--Shadow Bg-Head-Gray Border"
              onClick={onSubmit}
              labelText={intl.formatMessage({ id: 'label.submit' })}
              type="link"
              labelClassName="NeutralDark"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Filter.defaultProps = {
  initialValues: {},
};

Filter.propTypes = {
  initialValues: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Filter);

