import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ContentWrap from '../../../../components/ContentWrap';
import HeaderRow from './HeaderRow';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import ListRow from './ListRow';
import Icon from '../../../../components/Icon';

function List({
  intl,
  isFetching,
  nonAvailabilityOfMedicinesData,
  pageNo,
}) {
  const listDetails = nonAvailabilityOfMedicinesData && nonAvailabilityOfMedicinesData.data && nonAvailabilityOfMedicinesData.data.content || [];

  return (
    <div className="ListDashboardMaster">
      <div style={{ overflowX: 'auto' }}>
        <ContentWrap isFetching={isFetching}>
          <table className="table Mt-10">
            <HeaderRow />
            <ListItemIterator
              listDetails={listDetails}
              ListItem={ListRow}
              pageNo={pageNo}
            />
          </table>
          {!listDetails.length
            && (
            <div
              style={{
                width: '25%',
                margin: '90px auto',
              }}
            >
              <div style={{
                textAlign: 'center',
              }}
              >
                <Icon name="search-not-found" />
              </div>

              <div style={{ marginTop: '25px', textAlign: 'center' }}>
                {intl.formatMessage({ id: 'label.noRecordsFound' })}
              </div>
            </div>
            )}
        </ContentWrap>
      </div>
    </div>
  );
}

List.defaultProps = {
  isFetching: false,
  nonAvailabilityOfMedicinesData: {},
};

List.propTypes = {
  intl: PropTypes.object.isRequired,
  pageNo: PropTypes.number.isRequired,
  isFetching: PropTypes.bool,
  nonAvailabilityOfMedicinesData: PropTypes.object,
};

export default injectIntl(List);
