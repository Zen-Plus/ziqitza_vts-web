import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import HeaderRow from './HeaderRow';
import BodyRow from './BodyRow';
import Icon from '../../../../components/Icon';

function List({
  intl,
  headerData,
  bodyData,
}) {
  return (
    <div className="ListDashboardMaster" style={{ overflowX: 'auto' }}>
      <table className="table">
        <HeaderRow headerData={headerData} />
        {bodyData.length ? (
          <ListItemIterator
            listDetails={bodyData}
            ListItem={BodyRow}
          />
        ) : (
          <div
            style={{
              width: '25%',
              margin: '91px auto',
            }}
          >
            <div style={{
              textAlign: 'center',
            }}
            >
              <Icon name="search-not-found" />
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              {intl.formatMessage({ id: 'label.noRecordsFound' })}
            </div>
          </div>
        )}
      </table>
    </div>
  );
}

List.defaultProps = {
  headerData: [],
  bodyData: [],
};

List.propTypes = {
  intl: PropTypes.object.isRequired,
  headerData: PropTypes.array,
  bodyData: PropTypes.array,
};

export default injectIntl(List);
