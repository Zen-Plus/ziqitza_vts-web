import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './styles';
import Icon from '../Icon';

function Pagination({
  listDetails, isFetching, pageBackward, pageForward,
}) {
  let initialItemNumber = 0;
  let finalItemNumber = 0;
  let totalItemNumber = 0;
  if (listDetails.totalElements !== 0) {
    initialItemNumber = (listDetails.number + 1) * listDetails.size - listDetails.size + 1;
    finalItemNumber = (listDetails.number + 1)
        * listDetails.size - listDetails.size + listDetails.numberOfElements;
    totalItemNumber = listDetails.totalElements;
  }
  return (
    <div className="VtsPaginationWrap Flex">
      <div className="Font--S14 Matterhorn Ml-20" style={{ textAlign: 'right', alignSelf: 'center', paddingBottom: '0px' }}>
        {initialItemNumber || 0}
        {' - '}
        {finalItemNumber || 0}
        {' of '}
        {totalItemNumber || 0}
      </div>
      <div className="Flex" style={styles.navigationBtnContainer}>
        <Button className="Border-None" disabled={listDetails.first || isFetching} onClick={pageBackward} style={{ ...styles.navigationAction, ...styles.paginationButton }}><Icon name="backward" /></Button>
        <Button className="Border-None" disabled={listDetails.last || isFetching} onClick={pageForward} style={{ ...styles.navigationAction, ...styles.paginationButton }}><Icon name="forward" /></Button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

export default Pagination;

