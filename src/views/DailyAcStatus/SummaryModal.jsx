import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import Modal from '../../components/Modal';
import DatePicker from '../../components/DatePicker';
import useForm from '../../common/hooks/form';
import { fieldNames, fields } from './summaryModalFormConfig';
import { ButtonCustom } from '../../components/Button';
import { minDate } from '../NhmDashboard/utils';
// import {
//   getTotalCasesServedSummaryDocument as getTotalCasesServedSummaryDocumentApi,
// } from '../../api/nhmDashboard';
import { UserConfigContext } from '../../providers/withUserConfigProvider';
import { NotificationContext } from '../../providers/withNotificationProvider';
import { downloadFile } from '../../api/files';
import Icon from '../../components/Icon';

function getInitialValues(values = {}) {
  const _values = { ...values };
  _values[fieldNames.MONTH] = moment();
  return _values;
}

function handleSubmit(values) {
  this.onSubmit(values);
}

function SummaryModal({ intl, isVisible, onCancelClick, setLoader }) {
  const userConfig = useContext(UserConfigContext);
  const { pushNotification } = useContext(NotificationContext);

  const {
    values, events,
  } = useForm({
    initialValues: getInitialValues(),
    handleSubmit: handleSubmit.bind({ onSubmit: getTotalCasesServedSummaryDocument }),
    fields,
    validate: () => {},
  });

  const { onSubmit, onSelect } = events;

  function disabledDate(current) {
    return (moment().isBefore(current, 'day') || moment(minDate).isAfter(current, 'day'));
  }

  function getTotalCasesServedSummaryDocument(values) {
    // setLoader(true);
    // getTotalCasesServedSummaryDocumentApi({
    //   month: moment(values[fieldNames.MONTH]).month(),
    //   year: moment(values[fieldNames.MONTH]).year(),
    // }, userConfig.userConfig)
    //   .then((res) => {
    //     const data = res && res.body && res.body.data;
    //     onSelect(fieldNames.FILE_DATA)(data);
    //     setLoader(false);
    //   })
    //   .catch((err) => {
    //     setLoader(false);
    //     pushNotification(err);
    //   });
  }

  function handleFileClick() {
    // setLoader(true);
    // downloadFile(values[fieldNames.FILE_DATA].documentUuid, userConfig.userConfig)
    //   .then((res) => {
    //     const data = res.body;
    //     const file = new Blob([data], { type: 'application/pdf' });
    //     const fileURL = URL.createObjectURL(file);
    //     const pdfWindow = window.open();
    //     pdfWindow.location.href = fileURL;
    //     setLoader(false);
    //   })
    //   .catch((err) => {
    //     setLoader(false);
    //     pushNotification(err);
    //   });
  }

  return (
    <Modal
      visible={isVisible}
      centered
      width={350}
      onCancel={onCancelClick}
      maskClosable={false}
      footer={false}
      wrapClassName="Summary-Modal"
    >
      <div className="ZiqitzaVTS">
        <div className="Font--WB Font--S18">
          {intl.formatMessage({ id: 'label.summary' })}
        </div>
        <div className="Mt-20 Divider-Bottom-Gray90" style={{ marginBottom: '20px' }} />
        <div>
          <div>
            <DatePicker
              placeholder={intl.formatMessage({ id: 'label.selectMonth' })}
              labelText={intl.formatMessage({ id: 'label.month' })}
              value={values[fieldNames.MONTH]}
              onChange={onSelect(fieldNames.MONTH)}
              disabledDate={disabledDate}
              allowClear={false}
              picker="month"
              format="MMM YYYY"
            />
          </div>
          {values[fieldNames.FILE_DATA] && Object.keys(values[fieldNames.FILE_DATA]).length && (
            <div
              style={{marginTop: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
              <span
                style={{textAlign: 'center'}}
                className="Cursor-Pointer Warmblue-Text Text-Decoration-Underline"
                onClick={handleFileClick}
              >
                {values[fieldNames.FILE_DATA].documentName}
              </span>
              <span
                className="Ml-15 Cursor-Pointer"
                onClick={() => {
                  onSelect(fieldNames.FILE_DATA)(undefined);
                }}
              >
                <Icon name="cross-red" />
              </span>
            </div>
          )}
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '60px' }}>
            <ButtonCustom
              className="Box--Shadow"
              onClick={onSubmit}
              labelText={intl.formatMessage({ id: 'label.submit' })}
              type="link"
              style={{backgroundColor: 'orange', width: '80px'}}
              disabled={!!values[fieldNames.FILE_DATA]}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

SummaryModal.propTypes = {
  intl: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
};

export default injectIntl(SummaryModal);
