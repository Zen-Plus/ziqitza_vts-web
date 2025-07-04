import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import styles from './style';
import Icon from '../Icon';
import Button from '../Button';
import Modal from '../Modal';

const types = {
  EXCEL: {
    titleLabelId: 'label.excelExport',
    buttonLabelId: 'label.excel',
  },
  CSV: {
    titleLabelId: 'label.csvExport',
    buttonLabelId: 'label.csv',
  },
  PDF: {
    titleLabelId: 'label.pdfExport',
    buttonLabelId: 'label.pdf',
  },
};

function Export({
  type,
  exportAction,
  exportAllAction,
  className,
  listItemsCount,
  buttonStyle,
  intl,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHover, setHover] = useState(false);
  const [isActive, setActive] = useState(false);

  function handleClick(event) {
    event.preventDefault();
    setIsModalOpen(true);
  }

  function handleCompleteExport(event) {
    event.preventDefault();
    exportAllAction();
    setIsModalOpen(false);
  }

  function onSubmit() {
    exportAction();
    setIsModalOpen(false);
  }

  function handleClose(event) {
    event.preventDefault();
    setIsModalOpen(false);
  }

  function handleKeyPress(event) {
    // event.which returns the keyCode for firefox
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      setIsModalOpen(false);
    }
  }

  function toggleHover() {
    setHover(!isHover);
  }

  function handleFocus() {
    setActive(true);
  }
  function handleBlur() {
    setActive(false);
  }
  return (
    <>
      <Modal
        centered
        closable={Boolean(false)}
        width={440}
        visible={isModalOpen}
        footer={null}
        className="ZiqitzaVTS"
      >
        <div style={styles.modalDataContainer}>
          <div
            className="Font--WB Font--S24"
            style={styles.heading}
          >
            {intl.formatMessage({ id: types[type].titleLabelId })}
            <span
              onClick={handleClose}
              onKeyPress={handleKeyPress}
              tabIndex={0}
              role="button"
              style={styles.closeBtn}
              className="Cursor-Pointer Outline--None"
            >
              <Icon name="cross" />
            </span>
          </div>
          <div className="Mt-15">
            {intl.formatMessage({ id: 'common.components.export.text.confirmation' })}
            <span className="Font--WB">
              {` "${listItemsCount} items" `}
            </span>
            ?
          </div>
          <div style={styles.actionContainer} className="Mt-30">
            <Button
              className="Ml-15"
              style={styles.yesBtn}
              key="yes"
              type="default"
              onClick={onSubmit}
            >
              {intl.formatMessage({ id: 'label.yes' })}
            </Button>
            <Button
              className="Matterhorn-Text MatterHorn-Border"
              style={styles.completeBtn}
              key="complete"
              type="plain"
              onClick={handleCompleteExport}
            >
              {intl.formatMessage({ id: 'label.exportCompleteList' })}
            </Button>
          </div>
        </div>
      </Modal>
      <Button
        type="change"
        className={className}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          ...styles.btn,
          ...buttonStyle,
        }}
        onClick={handleClick}
      >
        {(!isHover && !isActive) ? <Icon name="dark-export" /> : <Icon name="light-export" />}
        <span style={{ marginLeft: '8px' }}>
          {intl.formatMessage({ id: types[type].buttonLabelId })}
        </span>
      </Button>
    </>
  );
}

Export.defaultProps = {
  listItemsCount: 0,
  buttonStyle: {},
  className: '',
};

Export.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  exportAction: PropTypes.func.isRequired,
  exportAllAction: PropTypes.func.isRequired,
  listItemsCount: PropTypes.number,
  buttonStyle: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Export);
