import superagent from 'superagent';
import version from './apiVersion';

export default function request({
  method = 'get',
  url,
  endpoint,
  payload,
  query,
  token,
  responseType,
  traceId,
  webApiKey,
  apiVersion = version.v1,
  publicRuntimeConfig = {},
  type = 'application/json',
  handleVtsInvalidToken,
  authToken,
}) {
  const { api } = publicRuntimeConfig;
  const _url = url || `${api.baseUrl}${apiVersion}/${endpoint}`;
  const _token = token;

  const apiRequest = superagent(method, _url);

  if (_token) {
    apiRequest.set('Authorization', `bearer ${_token}`);
  }
  if(authToken) {
    apiRequest.set('Authorization', `${authToken}`);
  }
  if (traceId) {
    apiRequest.set('X-Correlation-ID', traceId);
  }
  if (responseType === 'blob') {
    apiRequest.responseType('blob');
  }
  if (webApiKey) {
    apiRequest.set('ziqitza-api-key', webApiKey);
  }
  return (
    new Promise((resolve, reject) => {
      apiRequest
        .set('Content-Type', type)
        .send(payload)
        .query(query)
        .then(resolve)
        .catch((error) => {
          const errorBody = (error.response && error.response.body) || {};
          if (errorBody.apierror && errorBody.apierror.code === 'ZQTZA0005') {
            handleVtsInvalidToken(errorBody);
          } else {
            reject(errorBody);
          }
          reject(errorBody);
        });
    })
  );
}

