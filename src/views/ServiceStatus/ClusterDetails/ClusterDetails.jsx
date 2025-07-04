import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../components/Modal';
import HeaderRow from './HeaderRow';
import ListRow from './ListRow';
import ListItemIterator from '../../../components/ListUtils/ListItemIterator';
import Scrollbars from '../../../components/Scrollbar';

function ClusterDetails(props) {
  const { onCancel, selectedCluster } = props;

  return (
    <Modal
      width={1200}
      visible={!!selectedCluster}
      footer={false}
      maskClosable={false}
      centered
      onCancel={onCancel}
      wrapClassName="Cluster-Details-Modal"
    >
      <div className="ZiqitzaVTS">
        <div className="Font--WB Font--S20 Flex Align-Items-Center Flex-Space-Between Ml-10" style={{ textTransform: 'capitalize' }}>
          {selectedCluster.clusterName}
        </div>
        <div className="Divider-Bottom-Gray90" style={{ marginTop: '10px' }} />
        <div className="Flex Mt-20 Form-Wrap">
          <table className="ListMaster Width-Full">
            <HeaderRow />
          </table>
          <Scrollbars style={{ height: '240px' }}>
            <table className="ListMaster">
              <ListItemIterator
                listDetails={selectedCluster.protocolList || []}
                ListItem={ListRow}
              />
            </table>
          </Scrollbars>
        </div>
      </div>
    </Modal>
  );
}

ClusterDetails.propTypes = {
  selectedCluster: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ClusterDetails;
