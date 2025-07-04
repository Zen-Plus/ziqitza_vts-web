import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import DateRangePicker from '../../../../components/DateRangePicker';


function Filter({ intl, onDateRangeChange, initialValues }) {

  const today = moment();
  const [fromDate, toDate] = initialValues;
  const maxDate = moment.min(fromDate.clone().add(1, 'month'), today).endOf('day');
  const minDate = toDate.clone().subtract(1, 'month').add(1, 'day').startOf('day');

  function disabledDate(current) {
    return current && (current.isBefore(minDate) || current.isAfter(maxDate));
  }

  function handleCalendarChange(value) {
    if (value && value[0] && value[1]) {
      onDateRangeChange(value[0], value[1]);
    }
  }

  return (
    <div className="Field DateRangePickerField d-flex">
      <DateRangePicker
        labelText={intl.formatMessage({ id: 'label.date' })}
        value={initialValues}
        onCalendarChange={handleCalendarChange}
        disabledDate={disabledDate}
        format="YYYY-MM-DD"
      />
    </div>
  );
}

Filter.defaultProps = {
  initialValues: {},
  onDateRangeChange: () => {},
}

Filter.propTypes = {
  initialValues: PropTypes.array,
  onDateRangeChange: PropTypes.func,
};

export default injectIntl(Filter);

