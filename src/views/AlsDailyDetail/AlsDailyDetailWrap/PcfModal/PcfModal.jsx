import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Modal from '../../../../components/Modal';
import ImagePreview from '../ImagePreview';

function PcfListItem({ item, handlePcfItemData, handleIsPcfImageVisible }) {
  return (
    <div className="Flex">
      <div
        className="Mt-20 Flex"
        style={{ alignItems: 'center' }}
      >
        {item.documentType}
      </div>
      <div
        className="Ml-10 Mt-20 Cursor-Pointer Box--Shadow"
        style={{ padding: 10 }}
        onClick={() => {
          handlePcfItemData(item);
          handleIsPcfImageVisible(true);
        }}
        onKeyPress={() => {}}
        role="button"
        tabIndex={0}
      >
        {item.documentName}
      </div>
    </div>
  );
}

PcfListItem.propTypes = {
  item: PropTypes.object.isRequired,
  handlePcfItemData: PropTypes.func.isRequired,
  handleIsPcfImageVisible: PropTypes.func.isRequired,
};

function PcfModal({
  intl, pcfList, handleModalCloseClick,
}) {
  const [pcfItemData, setPcfItemData] = useState({});
  const [isPcfImageVisible, setIsPcfImageVisible] = useState(false);

  function handlePcfItemData(val) {
    setPcfItemData(val);
  }

  function handleIsPcfImageVisible(val) {
    setIsPcfImageVisible(val);
  }

  function handleImagePreviewModalClose() {
    setIsPcfImageVisible(false);
  }

  return (
    <div>
      <Modal
        visible={pcfList.length}
        centered
        width={400}
        onCancel={handleModalCloseClick}
        maskClosable={false}
        footer={false}
      >
        <div>
          <div className="Font--WB Font--S20" style={{ marginBottom: '35px' }}>
            {intl.formatMessage({ id: 'label.selectAnyToView' })}
          </div>
          {pcfList.map((item) => (
            <PcfListItem
              item={item}
              handlePcfItemData={handlePcfItemData}
              handleIsPcfImageVisible={handleIsPcfImageVisible}
            />
          ))}
        </div>
      </Modal>
      <ImagePreview
        itemUuid={pcfItemData.documentUuid}
        isVisible={isPcfImageVisible}
        onCancel={handleImagePreviewModalClose}
        fileName={pcfItemData.documentName}
      />
    </div>
  );
}

PcfModal.propTypes = {
  intl: PropTypes.object.isRequired,
  pcfList: PropTypes.array.isRequired,
  handleModalCloseClick: PropTypes.func.isRequired,
};

export default injectIntl(PcfModal);
