import { useState } from 'react';

const useService = ({
  method,
  context,
  initialValuesMethod = null,
  initialValues = false,
}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialValues);
    const [error, setError] = useState(false);
  
    const request = async (query, payload = {}) => {
      setLoading(true);
      try {
        const response = await method(query, context, payload);
        const { body } = response;
        
        if (initialValuesMethod) {
          let _result;
          if(body?.data) {
            let { body: { data: _data } } = response;
            _result = initialValuesMethod(_data);
          } else {
            _result = initialValuesMethod(body);
          }
          setData(_result);
        } else {
          setData(body);
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
  
    return {
      request,
      loading,
      data,
      error,
    };
  };

  export default useService;