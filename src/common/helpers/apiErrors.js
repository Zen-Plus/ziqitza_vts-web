export function overrideErrorCode({
    error, toOverride, withCode, withCodes = [],
  }) {
    const _error = error;
    if (_error && _error.apierror && _error.apierror.code === toOverride) {
      if (withCodes.length) {
        const errorCode = _error.apierror.message.split('|')[0];
        if (withCodes.includes(errorCode)) {
          _error.apierror.code = `${toOverride}_${errorCode}`;
        }
      } else if (withCode) {
        _error.apierror.code = withCode;
      }
    }
    return _error;
  }
  
  export default {
    overrideErrorCode,
  };
  