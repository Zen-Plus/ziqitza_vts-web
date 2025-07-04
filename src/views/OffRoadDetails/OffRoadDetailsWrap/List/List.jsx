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
  offRoadData,
}) {
  const listDetails = offRoadData && offRoadData.data || [];

  return (
    <div className="ListDashboardMaster">
      <div style={{ overflowX: 'auto' }}>
        <ContentWrap isFetching={isFetching}>
          <table className="table Mt-10">
            <HeaderRow />
            <ListItemIterator
              listDetails={listDetails}
              ListItem={ListRow}
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
  offRoadData: {},
};

List.propTypes = {
  intl: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  offRoadData: PropTypes.object,
};

export default injectIntl(List);
