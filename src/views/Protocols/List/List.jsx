import React, { useEffect, useContext } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import ContentWrap from '../../../components/ContentWrap';
import ListActions from '../../../components/ListUtils/ListActions/ListActions';
import useList from '../../../common/hooks/useList';
import { ProtocolsContext } from '../../../providers/withProtocolsProvider';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import { NotificationContext } from '../../../providers/withNotificationProvider';
import HeaderRow from './HeaderRow';
import Icon from '../../../components/Icon';
import Scrollbars from '../../../components/Scrollbar';
import ListItemIterator from '../../../components/ListUtils/ListItemIterator';
import ListRow from './ListRow';
import { downloadFile as downloadFileApi } from '../../../api/files';


function List({
  intl,
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
  const protocolsInfo = useContext(ProtocolsContext);
  const userConfig = useContext(UserConfigContext);
  const { pushNotification } = useContext(NotificationContext);
  const {
    isFetching = false,
    info = {},
  } = protocolsInfo.protocols;

  const listDetails = (info && info.data && info.data.content) || [];

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

  function handleClickSupportingDocument(value) {
    downloadFileApi(value.uuid, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const file = new File([data], value.name);
        FileSaver.saveAs(file, value.name);
      }).catch((error) => {
        pushNotification(error);
      });
  }

  useEffect(() => {
    protocolsInfo.getProtocolsMasterList({ ...listState }, userConfig);
  }, [listState]);

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
    }}
    >
      <div
        className="Flex Font--S24 Font--WB"
        style={{ alignItems: 'center', marginTop: '28px' }}
      >
        {intl.formatMessage({ id: 'view.protocols.title.protocols' })}
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
              listDetails={(info && info.data) || {}}
              listState={listState}
              changePageSize={changePageSizeHandle}
              pageBackward={pageBackward}
              pageForward={pageForward}
              isFetching={isFetching}
              searchBoxPlaceholder="label.searchByProtocols"
              handleSearchText={handleSearchText}
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
                            onSupportingDocumentClick={handleClickSupportingDocument}
                          />
                        </table>
                      </Scrollbars>
                    )}
                </div>
              </div>
            </ContentWrap>
          </div>
        </div>
      </div>
    </div>
  );
}

List.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(List);
