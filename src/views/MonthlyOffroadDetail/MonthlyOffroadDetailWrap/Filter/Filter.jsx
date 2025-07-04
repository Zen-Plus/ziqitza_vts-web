import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import DatePicker from '../../../../components/DatePicker';
import useForm from '../../../../common/hooks/form';
import { fieldNames, fields } from './formConfig';
import { ButtonCustom } from '../../../../components/Button';
import { minDate } from '../../../NhmDashboard/utils';


function handleSubmit(values) {
  this.onSubmit(values);
}


function validate({ values = {} }) {
  const errors = {};
  if (!(values[fieldNames.MONTH])
  ) {
    errors[fieldNames.MONTH] = 'validation.require.text.field';
  }

  return errors;
}

function getInitialValues(values = {}) {
  const _values = { ...values };
  _values[fieldNames.MONTH] = moment();

  return _values;
}

function Filter({ intl, initialValues, ...restProps }) {
  const {
    values, events,
  } = useForm({
    initialValues: getInitialValues(),
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: validate.bind({ ...restProps }),
  });
  const { onSubmit, onSelect } = events;


  function disabledDate(current) {
    return (moment().isBefore(current, 'day') || moment(minDate).isAfter(current, 'day'));
  }

  return (
    <div className="MedicineInventoryFilterWrap mt-3">
      <div className="Form">
        <div className="row">
          <div className="Field DateRangePickerField MonthlyOffroadWrapper col-sm-6 col-lg-4 d-flex justify-content-center mt-2 mt-md-1">
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

          <div className="col-lg-1 col-sm-3 mt-3 mt-sm-4 mt-md-3" style={{ marginBottom: '10px' }}>
            <ButtonCustom
              className="Box--Shadow"
              onClick={onSubmit}
              labelText={intl.formatMessage({ id: 'label.submit' })}
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
};

Filter.propTypes = {
  initialValues: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Filter);
