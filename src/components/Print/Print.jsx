import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import ListItemIterator from '../ListUtils/ListItemIterator';
import styles from './style';
import Icon from '../Icon';
import Button from '../Button';
import Modal from '../Modal';


function Print({
  Components,
  completePrintAction,
  resetPrintAllData,
  className,
  listItems,
  buttonStyle,
  printStatus,
  intl,
  printTitleHeading,
}) {
  const [isHover, setHover] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrint, handlePrint] = useState(false);

  useEffect(() => {
    handlePrint(printStatus);
  },[printStatus]);

  useEffect(() => {
    if (isPrint) {
      setIsModalOpen(false);
      const content = document.getElementById('Print_Content');
      const printContainer = document.getElementById('Hidden-Screen-Print');
      printContainer.innerHTML = content.innerHTML;
      document.getElementById('Layout__ProtectedPages').classList.add('No_Print');
      document.getElementsByClassName('ant-modal-wrap')[0].classList.add('No_Print');
      window.print();
      document.getElementsByClassName('ant-modal-wrap')[0].classList.remove('No_Print');
      document.getElementById('Layout__ProtectedPages').classList.remove('No_Print');
      printContainer.innerHTML = '';
      resetPrintAllData();
      handlePrint(false);
    }
  }, [isPrint]);

  function handleClick(event) {
    event.preventDefault();
    setIsModalOpen(true);
  }

  function handleCompletePrint(event) {
    event.preventDefault();
    completePrintAction();
  }

  function onSubmit() {
    setIsModalOpen(false);
    handlePrint(true);
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

  const { TableHead, TableBody, TableClass } = Components;
  return (
    <>
      <div id="Print_Content" className="Print_Content" style={{ display: 'none' }}>
        <div className="ZiqitzaVTS">
          {printTitleHeading && <div> {printTitleHeading} </div>}
          <table className={TableClass} >
            <TableHead mode="Print" />
            <ListItemIterator
              listDetails={listItems}
              ListItem={TableBody}
              mode="Print"
            />
          </table>
        </div>
      </div>
      <Modal
        wrapClassName="No_Print ZiqitzaVTS"
        centered
        closable={Boolean(false)}
        width={440}
        visible={isModalOpen}
        footer={null}
      >
        <div style={styles.modalDataContainer}>
          <div
            className="Font--WB Font--S24"
            style={styles.heading}
          >
            {intl.formatMessage({ id: 'label.print' })}
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
            {intl.formatMessage({ id: 'print.text.confirmationMessage' })}
            <span className="Font--WB">
              {` "${listItems.length} items" `}
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
              onClick={handleCompletePrint}
            >
              {intl.formatMessage({ id: 'label.printCompleteList' })}
            </Button>
          </div>
        </div>
      </Modal>
      <Button
        type="change"
        className={className}
        style={{
          ...styles.btn,
          ...buttonStyle,
        }}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {!isHover && !isActive ? <Icon name="dark-print" /> : <Icon name="light-print" />}
        <span style={{ marginLeft: '8px' }}>
          {intl.formatMessage({ id: 'label.print' })}
        </span>
      </Button>
    </>
  );
}

Print.defaultProps = {
  listItems: [],
  buttonStyle: {},
  printStatus: false,
  className: '',
  printTitleHeading: '',
};

Print.propTypes = {
  Components: PropTypes.object.isRequired,
  className: PropTypes.string,
  completePrintAction: PropTypes.func.isRequired,
  resetPrintAllData: PropTypes.func.isRequired,
  printStatus: PropTypes.bool,
  listItems: PropTypes.array,
  buttonStyle: PropTypes.object,
  intl: PropTypes.object.isRequired,
  printTitleHeading: PropTypes.string,
};

export default injectIntl(Print);
