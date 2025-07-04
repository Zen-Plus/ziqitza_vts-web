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
  jobWiseEquipmentData,
  pageBackward,
  pageForward,
  onExportClick,
}) {
  const listDetails = (jobWiseEquipmentData && jobWiseEquipmentData.data && jobWiseEquipmentData.data.content) || [];
  return (
    <div className="ListDashboardMaster">
      <div className="Flex justify-content-between ">
        <ButtonCustom className="ExcelButton HeaderBackground BorderButton" onClick={onExportClick} labelText={intl.formatMessage({ id: 'label.excel' })} disabled={!listDetails.length} labelClassName="NeutralDark" />
        <Pagination
          listDetails={(jobWiseEquipmentData && jobWiseEquipmentData.data) || {}}
          isFetching={isFetching}
          pageBackward={pageBackward}
          pageForward={pageForward}
        />
      </div>
      <div style={{ overflowX: 'auto', minHeight: 300, border: '1px solid #DDDDDD', }}>
        <ContentWrap isFetching={isFetching}>
          <table className="table" style={{ minWidth: '1000px' }}>
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
  jobWiseEquipmentData: {},
  onExportClick: () => { },
  pageBackward: () => { },
  pageForward: () => { },
};

List.propTypes = {
  intl: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  jobWiseEquipmentData: PropTypes.object,
  onExportClick: PropTypes.func,
  pageBackward: PropTypes.func,
  pageForward: PropTypes.func,
};

export default injectIntl(List);
