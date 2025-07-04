import React, { useRef, useEffect, useState, useContext } from 'react';
import FileSaver from 'file-saver';
import PropTypes from 'prop-types';
import Modal from '../../../../components/Modal';
import { downloadFile } from '../../../../api/files';
import LoaderWithOverLay from '../../../../components/Loader';
import Icon from '../../../../components/Icon';
import Scrollbars from '../../../../components/Scrollbar';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';

function ImagePreview({
  itemUuid, isVisible, onCancel, fileName,
}) {
  const userConfig = useContext(UserConfigContext);
  const imgref = useRef(null);
  const [isLoader, setIsLoader] = useState(false);
  const [fileToDownload, setFileToDownload] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setIsLoader(true);
      downloadFile(itemUuid, userConfig.userConfig).then((res) => {
        const data = res.body;
        const objectURL = URL.createObjectURL(data);
        imgref.current.src = objectURL;
        const file = new File([data], fileName);
        setFileToDownload(file);
        setIsLoader(false);
      }).catch(() => {
        setIsLoader(false);
      });
    }
  }, [isVisible]);

  function handleDownloadClick() {
    if (fileToDownload) {
      FileSaver.saveAs(fileToDownload, fileName);
    }
  }

  function handleCloseModal() {
    onCancel();
    setFileToDownload(null);
    imgref.current.src = null;
  }

  return (
    <Modal
      wrapClassName="ImagePreviewModal"
      visible={isVisible}
      centered
      width={1100}
      onCancel={handleCloseModal}
      maskClosable={false}
      footer={false}
    >
      {isLoader && (<LoaderWithOverLay />)}
      <div
        className="Cursor-Pointer DownloadIcon BorderRadius--Base"
        onClick={handleDownloadClick}
        onKeyPress={() => {}}
        tabIndex={0}
        role="button"
      >
        <Icon name="download" />
      </div>
      <Scrollbars className="Mt-20" style={{ height: 400 }}>
        <div>
          <img
            style={{ width: '100%', height: '100%' }}
            alt="pcf"
            ref={imgref}
          />
        </div>
      </Scrollbars>
    </Modal>
  );
}

ImagePreview.propTypes = {
  itemUuid: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default ImagePreview;
