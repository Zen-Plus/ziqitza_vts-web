import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ContentWrap from '../../../../components/ContentWrap';
import ListActions from '../../../../components/ListUtils/ListActions/ListActions';
import useList from '../../../../common/hooks/useList';
import { ClustersContext } from '../../../../providers/withClustersProvider';
import { ClusterContext } from '../../../../providers/withClusterProvider';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';
import HeaderRow from './HeaderRow';
import Icon from '../../../../components/Icon';
import Scrollbars from '../../../../components/Scrollbar';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import ListRow from './ListRow';
import Button from '../../../../components/Button';
import ReasonModal from '../../../../components/ReasonModal';


function Clusters({
  intl,
  setClusterView,
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
  const clustersInfo = React.useContext(ClustersContext);
  const clusterInfo = React.useContext(ClusterContext);
  const userConfig = React.useContext(UserConfigContext);
  const [isReasonModalOpen, setReasonModal] = useState(false);
  const [clusterToDelete, setClusterToDelete] = useState({});
  const {
    isFetching = false,
    info = {},
  } = clustersInfo.clusters;

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

  function handleDeleteClusterClick(details = {}) {
    setReasonModal(true);
    setClusterToDelete(details);
  }
  function onReasonModalCancelClick() {
    setReasonModal(false);
  }

  function handleEditClick (detail) {
    setClusterView({type: 'edit', id: detail.id});
  }
  function onReasonModalSaveClick(values) {
    setReasonModal(false);
    const payload = {};
    payload.reason = values.reason;
    payload.id = clusterToDelete.id;
    clusterInfo.deleteCluster(payload, userConfig, () => {
      setListStateValues({});
    });
  }

  useEffect(() => {
    clustersInfo.getClustersList({ ...listState }, userConfig);
  }, [listState]);

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
    }}
    >
      <div
        className="Flex Font--S24 Font--WB Mt-20"
        style={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ flex: '0 1 142px' }}>
          {intl.formatMessage({ id: 'view.clusters.title.vtsClusters' })}
        </div>
        <Button style={{ borderRadius: '4px', marginLeft: '20px' }} type="default" onClick={() => { setClusterView({ type: 'add', id: null }) }}> {intl.formatMessage({ id: 'view.clusters.title.text.add' })}</Button>
      </div>
      <div
        style={{
          backgroundColor: 'white',
          maxWidth: '1200px',
          height: 'calc(100% - 80px)',
        }}
        className="Mt-20 BorderRadius--Base"
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
              searchBoxPlaceholder="label.searchByCluster"
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
                            onDeleteClick={handleDeleteClusterClick}
                            handleEditClick={handleEditClick}
                          />
                        </table>
                      </Scrollbars>
                    )
                  }
                </div>
              </div>
            </ContentWrap>
          </div>
        </div>
      </div>
      <ReasonModal
        onCancel={onReasonModalCancelClick}
        isVisible={isReasonModalOpen}
        onSubmit={onReasonModalSaveClick}
        contentTitle={(
          <div>
            {intl.formatMessage({ id: 'delete.text.confirmationMessage' })}
            <span className="Font--WB">
              {` "${clusterToDelete.name}"?`}
            </span>
          </div>
        )}
        inputLabel={intl.formatMessage({ id: 'common.components.reasonModal.input.label.delete' })}
        requireText={intl.formatMessage({ id: 'common.components.reasonModal.validation.input.text.delete' })}
      />
    </div>
  );
}

Clusters.propTypes = {
  intl: PropTypes.object.isRequired,
  setClusterView: PropTypes.func.isRequired,
};

export default injectIntl(Clusters);
