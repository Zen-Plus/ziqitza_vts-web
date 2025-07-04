import React from 'react';
import { injectIntl } from 'react-intl';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';


const { RangePicker } = DatePicker;

function DateRangePicker({
  labelText, format, isReadonly, errorText, intl, ...restProps
}) {
  return (
    <div className="VtsDateRangePicker">
      {
        labelText
        && <div className={`DateRangePicker__Label ${errorText && 'Error'}`}>{labelText}</div>
      }
      {
        !isReadonly
          ? (
            <RangePicker
              placeholder={[intl.formatMessage({ id: 'label.startDate' }), intl.formatMessage({ id: 'label.endDate' })]}
              format={format}
              className={`Box--Shadow ${errorText && 'Error--Border'}`}
              {...restProps}
            />
          )
          : (
            <div className="GrayDark-Text" style={{ marginTop: '10px', wordBreak: 'break-all' }}>
              {restProps.value
              && restProps.value.length
              && dayjs(restProps.value[0]).format(format) - dayjs(restProps.value[1])
                .format(format)}
            </div>
          )
      }
      {
        errorText && <span className="DateRangePicker__Error">{errorText}</span>
      }
    </div>
  );
}

DateRangePicker.defaultProps = {
  labelText: '',
  errorText: '',
  format: 'DD MMM YYYY',
  isReadonly: false,
};

DateRangePicker.propTypes = {
  intl: PropTypes.object.isRequired,
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  format: PropTypes.string,
  isReadonly: PropTypes.bool,
};

export default injectIntl(DateRangePicker);
