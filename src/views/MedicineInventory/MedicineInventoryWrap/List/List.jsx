import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ContentWrap from '../../../../components/ContentWrap';
import HeaderRow from './HeaderRow';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import ListRow from './ListRow';
import Pagination from '../../../../components/Pagination';
import Icon from '../../../../components/Icon';
import { ButtonCustom } from '../../../../components/Button';


function List({
  intl,
  isFetching,
  vehicleMedicine,
  pageBackward,
  pageForward,
  onExportClick,
}) {
  const listDetails = (vehicleMedicine && vehicleMedicine.data && vehicleMedicine.data.content) || [];
  return (
    <div className="ListDashboardMaster">
      <div className="Flex justify-content-between ">
        <ButtonCustom className="ExcelButton" onClick={onExportClick} labelText={intl.formatMessage({ id: 'label.excel' })} />
        <Pagination
          listDetails={(vehicleMedicine && vehicleMedicine.data) || {}}
          isFetching={false}
          pageBackward={pageBackward}
          pageForward={pageForward}
        />
      </div>
      <div style={{ overflowX: 'auto' }}>
        <ContentWrap isFetching={isFetching}>
          <table className="table Mt-10" style={{ minWidth: '1000px' }}>
            <HeaderRow />
            <ListItemIterator
              listDetails={listDetails}
              ListItem={ListRow}
            />
          </table>
          {!listDetails.length &&
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

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                {intl.formatMessage({ id: 'label.noRecordsFound' })}
              </div>
            </div>
          }
        </ContentWrap>
      </div>
    </div>
  );
}

List.defaultProps = {
  isFetching: false,
  vehicleMedicine: {},
  onExportClick: () => { },
};

List.propTypes = {
  intl: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  vehicleMedicine: PropTypes.object,
  onExportClick: PropTypes.func,
};

export default injectIntl(List);
