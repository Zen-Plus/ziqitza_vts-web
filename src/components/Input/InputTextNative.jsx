import React from 'react';
import PropTypes from 'prop-types';

function InputTextNative({
  labelText, className, errorText, value, isReadonly, ...restProps
}) {
  return (
    <div className="InputText-Native">
      {
        labelText
        && <div className={`InputText-Native__Label ${errorText && 'Error'}`}>{labelText}</div>
      }
      {
        isReadonly
          ? (
            <div className="GrayDark-Text InputText-Native__Value" style={{ marginTop: '17px', wordBreak: 'break-all' }}>
              {value}
            </div>
          )
          : (
            <>
              <input className={`Box--Shadow ${errorText && 'Error--Border'} ${className}`} value={value} {...restProps} />
              {
                errorText && <span className="InputText-Native__Error">{errorText}</span>
              }
            </>
          )
      }
    </div>
  );
}

InputTextNative.defaultProps = {
  labelText: '',
  errorText: '',
  maxLength: 30,
  className: '',
  isReadonly: false,
  value: '',
};

InputTextNative.propTypes = {
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string,
  isReadonly: PropTypes.bool,
  value: PropTypes.string,
};

export default InputTextNative;
