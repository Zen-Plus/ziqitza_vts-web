export function getCheckedRows({ listDetails = [], selectedRowsIds = [], keyToMatch = 'id' }) {
  const selectedNewRows = listDetails.filter((listItem) => (
    (!selectedRowsIds.includes(listItem[keyToMatch]))
    && listItem[keyToMatch]));
  const selectedNewRowsIds = selectedNewRows.map((item) => (
    item[keyToMatch]));
  const _selectedRows = [...selectedRowsIds,
    ...selectedNewRowsIds];
  return {
    _selectedRows,
    selectedNewRowsDetail: selectedNewRows,
  };
}

export function getRemainingCheckedRows({
  listDetails = [],
  selectedRowsIds = [],
  selectedRowsDetails = [],
  keyToMatch = 'id',
}) {
  const _selectedRows = [...selectedRowsIds];
  const _selectedRowsDetails = [...selectedRowsDetails];
  if (listDetails) {
    for (let listIndex = 0; listIndex < listDetails.length; listIndex += 1) {
      const index = _selectedRows.indexOf(listDetails[listIndex][keyToMatch]);
      const rowDetailIndex = _selectedRowsDetails.findIndex((element) => (
        element[keyToMatch] === listDetails[listIndex][keyToMatch]));
      _selectedRows.splice(index, 1);
      _selectedRowsDetails.splice(rowDetailIndex, 1);
    }
  }
  return {
    _selectedRows,
    _selectedRowsDetails,
  };
}

export function checkForSelectedAll({ listDetails = [], selectedRowsIds = [], keyToMatch = 'id' }) {
  let isCheckedAll = false;
  const filtered = listDetails.filter((listItem) => selectedRowsIds.includes(listItem[keyToMatch]));
  if (listDetails.length && filtered.length === listDetails.length) {
    isCheckedAll = true;
  }
  return isCheckedAll;
}

export default {
  getCheckedRows,
  getRemainingCheckedRows,
  checkForSelectedAll,
};
