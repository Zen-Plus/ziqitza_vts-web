import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Settings from './ServiceStatusSettings';
import HeaderRow from './HeaderRow';
import ListRow from './ListRow';
import Icon from '../../../components/Icon';
import ListItemIterator from '../../../components/ListUtils/ListItemIterator';
import Scrollbars from '../../../components/Scrollbar';
import ClusterDetails from '../ClusterDetails';
import ContentWrap from '../../../components/ContentWrap';
import ListActions from '../../../components/ListUtils/ListActions/ListActions';
import useList from '../../../common/hooks/useList';
import { ServiceStatusContext } from '../../../providers/withServiceStatusProvider';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import { withPickListProvider } from '../../../providers/withPickListProvider';

function List({
  intl,
  pickListData,
}) {
  const { listState, setListStateValues } = useList({
    initialState: {
      pageSize: 25,
      pageNo: 0,
      sortBy: '',
      sortDirection: '',
      searchText: '',
    },
  });
  const [selectedSettings, setSettings] = useState(
    {
      displayTime: { id: 'SEC', name: 'Seconds' },
      fetchStats: { id: 'LAST_FIFTEEN_MINS', name: 'Last 15 mins' },
    },
  );
  const [clusterToView, setClusterToView] = useState({});
  const serviceStatusInfo = React.useContext(ServiceStatusContext);
  const userConfig = React.useContext(UserConfigContext);

  const {
    isFetching = false,
    displayServices = {},
    services,
  } = serviceStatusInfo.serviceStatus;

  const listDetails = (displayServices
    && displayServices.data && displayServices.data.content) || [];

  function changePageSizeHandle(value) {
    setListStateValues({ pageSize: value, pageNo: 0 });
  }

  function pageBackward() {
    setListStateValues({ pageNo: listState.pageNo - 1 });
  }

  function pageForward() {
    setListStateValues({ pageNo: listState.pageNo + 1 });
  }

  function handleSearchText(val) {
    if (val.trim() !== listState.searchText.trim()) {
      setListStateValues({ searchText: val, pageNo: 0 });
    }
  }

  function handleSorting({ key, sortDirection }) {
    setListStateValues({ sortBy: key, sortDirection });
  }
  function handleSubmitSettings(settings) {
    setSettings(settings);
    setListStateValues({ pageNo: 0 });
  }

  const handleClusterClick = (value) => {
    setClusterToView(value);
  };
  const handleClusterCancel = () => {
    setClusterToView({});
  };

  useEffect(() => {
    if (services) {
      serviceStatusInfo.getDisplayServicesList({ ...listState, setting: { ...selectedSettings } }, false);
    }
  }, [listState, services, selectedSettings.displayTime]);

  useEffect(() => {
    serviceStatusInfo.getDisplayServicesList(
      { ...listState, setting: { ...selectedSettings } },
      true,
      userConfig,
    );
  }, [selectedSettings.fetchStats]);

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
    }}
    >
      <div
        className="Flex Font--S24 Font--WB"
        style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: '28px' }}
      >
        <div style={{ flex: '0 1 179px' }}>
          {intl.formatMessage({ id: 'view.serviceStatus.title.serviceStatus' })}
        </div>
      </div>
      <div
        style={{
          backgroundColor: 'white',
          maxWidth: '1200px',
          height: 'calc(100% - 80px)',
          marginTop: '28px',
        }}
        className="BorderRadius--Base"
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div style={{ padding: '20px', height: '100%', position: 'relative' }}>
            <ListActions
              listDetails={(displayServices && displayServices.data) || {}}
              listState={listState}
              changePageSize={changePageSizeHandle}
              pageBackward={pageBackward}
              pageForward={pageForward}
              isFetching={isFetching}
              searchBoxPlaceholder="label.searchByCluster"
              handleSearchText={handleSearchText}
              components={{ Filter: Settings }}
              selectedFilters={selectedSettings}
              filterRestProps={{
                selectedFilterIconName: 'settings',
                filterIconName: 'settings'
              }}
              handleSubmitFilter={handleSubmitSettings}
              pickListData={pickListData}
            />

            <ContentWrap isFetching={isFetching}>
              <div style={{
                width: '100%', overflowX: 'auto', height: 'calc(100% - 65px)', overflowY: 'hidden',
              }}
              >
                <div style={{ minWidth: '1160px', height: '100%' }}>
                  <table className="ListMaster Width-Full">
                    <HeaderRow
                      changeSort={handleSorting}
                      listState={listState}
                    />
                  </table>
                  {!listDetails.length
                    ? (
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
                    ) : (
                      <Scrollbars style={{ height: 'calc(100% - 50px)' }}>
                        <table className="ListMaster">
                          <ListItemIterator
                            listDetails={listDetails}
                            ListItem={ListRow}
                            handleClusterClick={handleClusterClick}
                          />
                        </table>
                      </Scrollbars>
                    )}
                </div>
              </div>
            </ContentWrap>
            {!!Object.keys(clusterToView).length
                && (
                <ClusterDetails
                  selectedCluster={clusterToView}
                  onCancel={handleClusterCancel}
                />
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

List.defaultProps = {
  pickListData: {},
};

List.propTypes = {
  intl: PropTypes.object.isRequired,
  pickListData: PropTypes.object,
};

export default injectIntl(withPickListProvider(List, { version: 'v2' }));
