import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import DatePicker from '../../../../components/DatePicker';
import { ButtonCustom } from '../../../../components/Button';
import { fieldNames, fields } from './formConfig';
import useForm from '../../../../common/hooks/form';
import { minDate } from '../../../NhmDashboard/utils';

function handleSubmit(values) {
  this.onSubmit(values);
}

function getInitialValues() {
  const _values = {};
  _values[fieldNames.MONTH] = moment();
  return _values;
}

function Form({
  intl,
  ...restProps
}) {
  const {
    values, events,
  } = useForm({
    initialValues: getInitialValues(),
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: () => {},
  });

  const {
    onSubmit, onSelect,
  } = events;

  function disabledDate(current) {
    return (moment().isBefore(current, 'day') || moment(minDate).isAfter(current, 'day'));
  }

  return (
    <div className="FormWrapper">
      <div className="Form Flex flex-wrap">
        <div className="col-sm-6 col-md-4 col-lg-4 d-flex justify-content-center col-12 Mt-10 Field DateRangePickerField">
          <DatePicker
            placeholder={intl.formatMessage({ id: 'label.selectMonth' })}
            labelText={intl.formatMessage({ id: 'label.month' })}
            value={values[fieldNames.MONTH]}
            onChange={onSelect(fieldNames.MONTH)}
            disabledDate={disabledDate}
            allowClear={false}
            picker="month"
            format="MMM YYYY"
          />
        </div>
        <div className="col-sm-6 col-md-2 col-lg-1 col-12 Mt-10">
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
  renderProps: PropTypes.func,
};

export default injectIntl(Form);
