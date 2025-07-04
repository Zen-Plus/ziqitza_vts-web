import React from 'react';
import { DatePicker as DatePickerAntd } from 'antd';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { injectIntl } from 'react-intl';

function DatePicker({
  labelText, format, isReadonly, errorText, intl, ...restProps
}) {
  return (
    <div className="VtsDatePicker">
      {
        labelText
        && <div className={`DatePicker__Label ${errorText && 'Error'}`}>{labelText}</div>
      }
      {
        !isReadonly
          ? (
            <DatePickerAntd
              placeholder={intl.formatMessage({ id: 'label.selectDate' })}
              format={format}
              className={`Box--Shadow ${errorText && 'Error--Border'}`}
              {...restProps}
            />
          )
          : (
            <div className="GrayDark-Text" style={{ marginTop: '10px', wordBreak: 'break-all' }}>
              {restProps.value && dayjs(restProps.value).format(format)}
            </div>
          )
      }
      {
        errorText && <span title={errorText} className="DatePicker__Error">{errorText}</span>
      }
    </div>
  );
}

DatePicker.defaultProps = {
  labelText: '',
  errorText: '',
  format: 'DD MMM YYYY',
  isReadonly: false,
};

DatePicker.propTypes = {
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  format: PropTypes.string,
  isReadonly: PropTypes.bool,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(DatePicker);
