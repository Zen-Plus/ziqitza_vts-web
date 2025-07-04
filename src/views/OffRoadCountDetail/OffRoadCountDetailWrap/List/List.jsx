import React, { useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ContentWrap from '../../../../components/ContentWrap';
import HeaderRow from './HeaderRow';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import ListRow from './ListRow';
import Icon from '../../../../components/Icon';
import Filter from '../OffRoadCountDetail/Filter';
import ListActions from '../../../../components/ListUtils/ListActions/ListActions';
import { withPickListProvider } from '../../../../providers/withPickListProvider';
import useService from '../../../../common/hooks/useService';
import {
  fetchOffRoadCountDetail as fetchOffRoadCountDetailApi,
 } from '../../../../api/nhmDashboard';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';
import { ButtonCustom } from '../../../../components/Button';

function List({
  intl,
  pickListData,
  exportAction,
}) {
  const userConfig = useContext(UserConfigContext);

  const {
    data: offRoadData,
    request: offRoadRequest,
    loading: offRoadloading,
  } = useService({
    method: fetchOffRoadCountDetailApi,
    context: userConfig.userConfig,
    initialValues: {},
  });

  const listDetails = offRoadData && offRoadData.data || [];
  const [selectedFilters, setFilters] = useState({
    "baseLocationName": [],
    "districtName": [],
    "vehicleTypes": [],
    "vehicleRegistrationNumber": []
  });

  function handleSubmitFilter(filters) {
    setFilters(filters);
  }
  
  useEffect(() => {
    const payload = {
        ...selectedFilters,
    };
    offRoadRequest(payload);
  }, [selectedFilters]);

  function handleExportButtonClick(fileType = 'EXCEL') {
    exportAction({
      fileType,
    }, { ...selectedFilters });
  }

  return (
    <div className="ListDashboardMaster">
      <div style={{ overflowX: 'auto' }}>
        <ContentWrap isFetching={offRoadloading}>
          <div className="d-flex Flex-Space-Between" style={{
            position: 'sticky',
            left: '0',
            padding: '0 6px',
          }}>
            <div style={{ width: '100%' }} className="Mr-16">
              <ListActions
                isSearchEnable={false}
                listDetails={listDetails}
                // listState={listState}
                // changePageSize={changePageSizeHandle}
                // pageBackward={pageBackward}
                // pageForward={pageForward}
                isFetching={offRoadloading}
                components={{ Filter }}
                selectedFilters={selectedFilters}
                handleSubmitFilter={handleSubmitFilter}
                pickListData={pickListData}
                isDropSizeVisible={false}
                isPaginationVisible={false}
              />
            </div>
            <div>
              <ButtonCustom
                className="Box--Shadow Font--S18 ExcelButton"
                onClick={handleExportButtonClick}
                labelText={intl.formatMessage({ id: 'label.excel' })}
                type="link"
                style={{ background: '#F0F0F0' ,border: '1px solid #DDDDDD', color: '#131313', alignSelf: 'baseline' }}
              />
            </div>
          </div>
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
  offRoadData: {},
  exportAction: () => {},
};

List.propTypes = {
  intl: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  offRoadData: PropTypes.object,
  pickListData: PropTypes.object,
  exportAction: PropTypes.func,
};

export default injectIntl(withPickListProvider(List, { version: 'v2' }));