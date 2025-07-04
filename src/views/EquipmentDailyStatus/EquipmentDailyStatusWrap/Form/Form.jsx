import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import DateRangePicker from '../../../../components/DateRangePicker';
import { ButtonCustom } from '../../../../components/Button';
import { fieldNames, fields } from './formConfig';
import useForm from '../../../../common/hooks/form';
import { minDate } from '../../../NhmDashboard/utils';

function handleSubmit(values) {
  this.onSubmit(
    values.dateRange[0].startOf('day').valueOf(),
    values.dateRange[1].endOf('day').valueOf()
  );
}

function validate({ values = {} }) {
  const errors = {};
  if (!(values[fieldNames.DATE_RANGE] && values[fieldNames.DATE_RANGE][0]
      && values[fieldNames.DATE_RANGE][1])) {
    errors[fieldNames.DATE_RANGE] = 'validation.require.text.field';
  }
  return errors;
}

function getInitialValues(fromDate, toDate) {
  const _values = {};
  _values[fieldNames.DATE_RANGE] = [moment(fromDate), moment(toDate)];
  return _values;
}

function Form({
  intl,
  fromDate,
  toDate,
  ...restProps
}) {
  const {
    events, errors,
  } = useForm({
    initialValues: getInitialValues(fromDate, toDate),
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: validate.bind({ ...restProps }),
  });

  const {
    onSubmit, onSelect,
  } = events;

  const [dates, setDates] = useState([moment(fromDate), moment(toDate)]);

  function handleCalendarChange(value) {
    setDates(value);
    onSelect(fieldNames.DATE_RANGE)(value);
  }

  function disabledDate(current) {
    if (!dates || dates.length === 0) {
      return (moment().isBefore() > current
        || moment().endOf('day') < moment(current).endOf('day')
        || moment(minDate).isAfter(current, 'day'));
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 31;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 31;
    return (moment().isBefore() > current
      || moment().endOf('day') < moment(current).endOf('day')
      || moment(minDate).isAfter(current, 'day')) || tooEarly || tooLate;
  }

  return (
    <div className="FormWrapper">
      <div className="Form Flex flex-wrap justify-content-between">
        <div className="DateRangePickerField col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center col-12 Mt-10">
          <DateRangePicker
            labelText={intl.formatMessage({ id: 'label.dateRange' })}
            value={dates}
            onCalendarChange={handleCalendarChange}
            disabledDate={disabledDate}
            errorText={errors[fieldNames.DATE_RANGE]
              && intl.formatMessage({ id: errors[fieldNames.DATE_RANGE] })}
          />
        </div>
        <div className="col-sm-12 col-md-2 col-lg-2 col-12 Mt-10">
          <ButtonCustom
            className="ButtonCustom Box--Shadow Font--S18"
            onClick={onSubmit}
            labelText={intl.formatMessage({ id: 'label.submit' })}
            type="link"
          />
        </div>
      </div>
      {
        restProps.renderProps({ onSubmit })
      }
    </div>
  );
}

Form.defaultProps = {
  renderProps: () => {},
};

Form.propTypes = {
  intl: PropTypes.object.isRequired,
  fromDate: PropTypes.number.isRequired,
  toDate: PropTypes.number.isRequired,
  renderProps: PropTypes.func,
};

export default injectIntl(Form);
