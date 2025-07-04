import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import React, { useState, useEffect, useContext } from 'react';
import Cluster from './Cluster';
import ContentWrap from '../../../../components/ContentWrap';
import ReasonModal from '../../../../components/ReasonModal';
import Form from './Form';
import { createClusterPayload } from './util';
import { ClusterContext } from '../../../../providers/withClusterProvider';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';

const initialValue = {};

let payload = { ...initialValue };

function Add(props) {
  const [isReasonModalOpen, setReasonModalState] = useState(false);
  const { intl } = props;
  const clusterInfo = useContext(ClusterContext);
  const userConfig = useContext(UserConfigContext);

  useEffect(() => {
    const resetPayload = () => {
      payload = { ...initialValue };
    };
    return resetPayload;
  }, []);
  
  function handleFormCancel() {
    props.setClusterView({ type: 'list', id: null });
  }

  function handleFormSubmit(values) {
    payload = values;
    setReasonModalState(true);
  }

  function onReasonModalCancelClick() {
    setReasonModalState(false);
  }

  function onReasonModalSaveClick(values) {
    setReasonModalState(false);
    const _payload = createClusterPayload(payload);
    _payload.note = values.reason;
    clusterInfo.saveCluster(_payload, userConfig, () => { props.setClusterView({ type: 'list', id: null }); });
  }
  return (
    <Cluster>
      <>
        <div
          className="Box--Shadow Width-Full Height-Full Flex-Direction-Column"
          style={{ padding: '24px 20px 20px 20px' }}
        >
          <div className="Font--S20 Font--WB" style={{ letterSpacing: '0.3px' }}>
            {intl.formatMessage({ id: 'view.clusters.title.text.add' })}
          </div>
          <div className="Mt-20 Divider-Bottom-Gray90" />
          <div style={{ marginTop: '20px', flex: '1 1 auto', display: 'block' }}>
            <ContentWrap isFetching={false}>
              <Form
                onCancel={handleFormCancel}
                onSubmit={handleFormSubmit}
                initialValues={payload}
              />
            </ContentWrap>
          </div>
        </div>
        <ReasonModal
          onCancel={onReasonModalCancelClick}
          isVisible={isReasonModalOpen}
          onSubmit={onReasonModalSaveClick}
          contentTitle={intl.formatMessage({ id: 'common.components.reasonModal.title.text.add' })}
          inputLabel={intl.formatMessage({ id: 'common.components.reasonModal.input.label.add' })}
          requireText={intl.formatMessage({ id: 'common.components.reasonModal.validation.input.text.add' })}
        />
      </>
    </Cluster>
  );
}

Add.propTypes = {
  intl: PropTypes.object.isRequired,
  setClusterView: PropTypes.func.isRequired,
};

export default injectIntl(Add);
