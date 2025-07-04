import { useState } from 'react';
import { cloneDeep } from '../helpers/collectionUtils';

const useList = ({
  initialState = {
    pageSize: 25,
    pageNo: 0,
    selectedRows: [],
    sortBy: '',
    sortDirection: '',
    searchText: '',
  },
}) => {
  const [listState, setListState] = useState(initialState || {});


  const setListStateValues = (newState) => {
    let updatedValues = cloneDeep(listState);
    updatedValues = { ...updatedValues, ...newState };
    setListState(updatedValues);
    return updatedValues;
  };

  return {
    listState,
    setListStateValues,
  };
};

export default useList;
