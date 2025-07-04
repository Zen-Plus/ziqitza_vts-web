import React from 'react';
import { Input as InputAntd } from 'antd';
import PropTypes from 'prop-types';

function Input({
  labelText, className, errorText, isReadonly, ...restProps
}) {
  return (
    <div className="Input">
      {
        labelText
        && <div className={`Input__Label ${errorText && 'Error'}`}>{labelText}</div>
      }
      {
        isReadonly
          ? (
            <div className="GrayDark-Text Input__Value" style={{ marginTop: '17px', wordBreak: 'break-all' }}>
              {restProps.value}
            </div>
          )
          : (
            <>
              <InputAntd className={`Box--Shadow ${errorText && 'Error--Border'} ${className}`} {...restProps} />
              {
                errorText && <span className="Input__Error">{errorText}</span>
              }
            </>
          )
      }
    </div>
  );
}

Input.defaultProps = {
  labelText: '',
  errorText: '',
  maxLength: 30,
  className: '',
  isReadonly: false,
};

Input.propTypes = {
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string,
  isReadonly: PropTypes.bool,
};

export default Input;
