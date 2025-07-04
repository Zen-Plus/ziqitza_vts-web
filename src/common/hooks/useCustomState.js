import { useState } from 'react';

function useCustomState(initialState) {
  const [state, setState] = useState(initialState);
  function updateState(nextState = {}) {
    setState({ ...state, ...nextState });
  }
  return [state, updateState];
}

export default useCustomState;