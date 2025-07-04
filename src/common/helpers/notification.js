export function prepareSuccessMessage({ code, type = 'apisuccess' }) {
  return {
    [type]: {
      code,
    },
  };
}

export function prepareErrorMessage({ code, type = 'apierror' }) {
  return {
    [type]: {
      code,
    },
  };
}

export default {
  prepareSuccessMessage,
  prepareErrorMessage,
};
