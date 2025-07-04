import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import Cluster from './Cluster';
import ContentWrap from '../../../../components/ContentWrap';
import ReasonModal from '../../../../components/ReasonModal';
import Form from './Form';
import withClusterProvider from './withClusterProvider';
import { createClusterPayload, getInitialValues } from './util';

const styles = {
  formActionIcon: {
    marginRight: 12,
    verticalAlign: 'middle',
  },
};

let formOnSubmitRef = null;

function Edit({
  id, cluster, userConfig, intl, ...restProps
}) {
  const [isReasonModalOpen, setReasonModalState] = useState(false);
  const [payload, setPayload] = useState(null);
  const clusterData = (cluster.info
    && cluster.info.data) || {};
  function handleFormRenderProps({ onSubmit }) {
    formOnSubmitRef = onSubmit;
  }

  function handleSaveClick() {
    formOnSubmitRef();
  }

  function handleCancelClick() {
    restProps.setClusterView({ type: 'list', id: null })
  }
  function getFormValues(values) {
    setPayload(values);
    setReasonModalState(true);
  }

  function onReasonModalCancelClick() {
    setReasonModalState(false);
  }
  function onReasonModalSaveClick(values) {
    setReasonModalState(false);
    const _payload = createClusterPayload(payload);
    _payload.reason = values.reason;
    _payload.id = clusterData.id;
    restProps.updateCluster(_payload, userConfig, handleCancelClick);
  }


  return (
    <Cluster>
      <div
        className="Box--Shadow Width-Full Height-Full Flex-Direction-Column"
        style={{ padding: '10px 20px 20px 20px' }}
      >
        <ContentWrap
          isFetching={
            cluster.isProcessing
            || !cluster.info
            || !cluster.info.data
          }
        >
          <>
            <div style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="Font--S20 Font--WB" style={{ letterSpacing: '0.3px' }}>
                {clusterData.name}
              </div>
              <div>
                <Button
                  type="link"
                  style={{ width: '116px' }}
                  onClick={handleCancelClick}
                >
                  <span style={{ ...styles.formActionIcon, marginRight: 9 }}>
                    <Icon name="cross-red" />
                  </span>
                  <span className="Font--WB Font--S16" style={{ letterSpacing: '0.2px' }}>
                    {intl.formatMessage({ id: 'label.cancel' })}
                  </span>
                </Button>
                <Button
                  type="plain"
                  className="Ml-15"
                  onClick={handleSaveClick}
                  style={{ minWidth: '108px' }}
                >
                  <span style={styles.formActionIcon}>
                    <Icon name="check" />
                  </span>
                  <span className="Font--WB Font--S16 Matterhorn-Text" style={{ letterSpacing: '0.2px' }}>
                    {intl.formatMessage({ id: 'label.save' })}
                  </span>
                </Button>
              </div>
            </div>
            <div className="Divider-Bottom-Gray90" style={{ marginTop: '14px' }} />
            <div style={{ marginTop: '20px', flex: '1 1 auto' }}>
              <Form
                onSubmit={getFormValues}
                renderProps={handleFormRenderProps}
                initialValues={payload || getInitialValues(clusterData)}
                mode="edit"
              />
            </div>
          </>
        </ContentWrap>
        <ReasonModal
          onCancel={onReasonModalCancelClick}
          isVisible={isReasonModalOpen}
          onSubmit={onReasonModalSaveClick}
          contentTitle={intl.formatMessage({ id: 'common.components.reasonModal.title.text.edit' })}
          inputLabel={intl.formatMessage({ id: 'common.components.reasonModal.input.label.edit' })}
          requireText={intl.formatMessage({ id: 'common.components.reasonModal.validation.input.text.edit' })}
        />
      </div>
    </Cluster>
  );
}

Edit.defaultProps = {
  restProps: {},
};

Edit.propTypes = {
  cluster: PropTypes.object.isRequired,
  userConfig: PropTypes.object.isRequired,
  restProps: PropTypes.object,
  id: PropTypes.number.isRequired,
  updateCluster: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default withClusterProvider(injectIntl(Edit));
