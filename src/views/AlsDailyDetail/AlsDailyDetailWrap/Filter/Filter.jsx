import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import DateRangePicker from '../../../../components/DateRangePicker';
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

function Filter({ intl, onReset, initialValues, ...restProps }) {
  const [dates, setDates] = useState([moment().startOf('month').startOf('day'), moment().endOf('day')]);
  const {
    values, events, errors, reset,
  } = useForm({
    initialValues: getInitialValues(),
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: validate.bind({ ...restProps }),
  });
  const { onSubmit, onSelect } = events;

  function handleResetClick() {
    reset();
    setDates([moment().startOf('month').startOf('day'), moment().endOf('day')]);
    onReset();
  }

  function handleCalendarChange(value) {
    setDates(value);
    onSelect(fieldNames.FROM_DATE)(value);
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
    <div className="MedicineInventoryFilterWrap mt-3">
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
          <div className="Field col-sm-6 col-lg-3 mt-3 mt-sm-2 mt-md-1">
            <SelectDistrict
              labelText={intl.formatMessage({ id: 'label.district' })}
              id="DistrictSelect"
              onChangeSelect={onSelect(fieldNames.DISTRICT)}
              selectedItem={values[fieldNames.DISTRICT]}
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

