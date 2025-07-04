import React, { useState, useRef, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Modal from '../../../../components/Modal';
import useForm from '../../../../common/hooks/form';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { ExceptionReasonsContext, withExceptionReasonsProvider } from '../../../../providers/withExceptionReasonsProvider';
import withProvider from '../../../../common/hocs/withProvider/withProvider';
import SelectDrop from '../../../../components/SelectDrop';
import Copy from '../../../../components/Copy';
import HistoryList from './History';
import { fetchAlertDetails } from '../../../../api/trackingAlerts';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';
import { validateNote, validateNumber } from '../../../../common/helpers/validators';
import { prepareErrorMessage } from '../../../../common/helpers/notification';

const REQIURED_EXTENSION_TIME = prepareErrorMessage({ code: 'REQIURED_EXTENSION_TIME' });

const SelectExceptionReason = withProvider({
  getResourcesActionKey: 'getExceptionReasonsList',
  loadMoreActionKey: 'getExceptionReasonsListLoadMore',
  context: ExceptionReasonsContext,
  contextProvider: withExceptionReasonsProvider,
  stateKey: 'exceptionReasons',
}, SelectDrop);


export const fieldNames = {
  VEHICLE_REGISTRATION_NO: 'vehicleRegNo',
  PILOT_CONTACT_NUMBER_1: 'pilotContact1',
  PILOT_CONTACT_NUMBER_2: 'pilotContact2',
  EXCEPTION_REASON: 'exceptionReason',
  GRANT_EXTENSION_TIME: 'grantExtensionTime',
  NOTE: 'note',
};

function handleChange(event, preValues) {
  const { name, value } = event.target || {};
  return { ...preValues, [name]: value };
}

function handleSelect(event, preValues) {
  const { name, value } = event || {};
  return { ...preValues, [name]: value };
}

export const fields = {
  [fieldNames.GRANT_EXTENSION_TIME]: {
    handleChange,
  },
  [fieldNames.NOTE]: {
    handleChange,
  },
  [fieldNames.EXCEPTION_REASON]: {
    handleSelect,
  },
};

function handleSubmit(values, name) {
  if (name === 'close' && !values[fieldNames.GRANT_EXTENSION_TIME]) {
    this.pushNotification(REQIURED_EXTENSION_TIME);
  } else if (name === 'close' && values[fieldNames.GRANT_EXTENSION_TIME]) {
    this.onSubmit(values, name);
  } else if (name === 'closeException') {
    this.onSubmit(values, name);
  }
}

function getInitialValues(values = {}) {
  const _values = { ...values };
  if (!_values.exceptionReason) {
    _values.exceptionReason = '';
  }
  return _values;
}

function validate({ values = {} }) {
  const errors = {};
  if (!values[fieldNames.EXCEPTION_REASON]) {
    errors[fieldNames.EXCEPTION_REASON] = 'validation.require.text.field';
  }
  if (values[fieldNames.EXCEPTION_REASON] && values[fieldNames.EXCEPTION_REASON].code
    && values[fieldNames.EXCEPTION_REASON].code / (60 * 1000) < values[fieldNames.GRANT_EXTENSION_TIME]) {
    errors[fieldNames.GRANT_EXTENSION_TIME] = 'validation.minimumTime.text.field';
  }
  if (values[fieldNames.GRANT_EXTENSION_TIME] && !validateNumber(values[fieldNames.GRANT_EXTENSION_TIME])) {
    errors[fieldNames.GRANT_EXTENSION_TIME] = 'validation.invalid.form.text.data';
  }
  if (!values[fieldNames.NOTE]) {
    errors[fieldNames.NOTE] = 'validation.require.text.field';
  } else if (!validateNote(values[fieldNames.NOTE])) {
    errors[fieldNames.NOTE] = 'validation.invalid.form.text.data';
  }

  return errors;
}
function AlertReason({
  details, visible, intl, handleAlertReasonModalClose, onVehicleRegistrationViewClick, ...restProps
}) {
  const [historyDetails, setHistoryDetails] = useState({});
  const userConfig = React.useContext(UserConfigContext);
  const intervalRef = useRef(null);

  const {
    values, errors, events,
  } = useForm({
    initialValues: getInitialValues(details.info[0]),
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: validate.bind(restProps),
  });

  const {
    onBlur, onKeyUp, onChange, onSubmit, onSelect,
  } = events;

  const exceptionReasonQueryRef = useRef({ ruleId: values.ruleId });

  const handleVehicleRegistrationViewOnClick = () => {
    onVehicleRegistrationViewClick(values.vehicleId);
  };
  const handleVehicleRegistrationViewOnKeyPress = (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      onVehicleRegistrationViewClick(values.vehicleId);
    }
  };

  useEffect(() => {
    fetchAlertDetails({
      vehicleId: details.info[0].vehicleId,
      jobId: details.info[0].jobId,
      isHistory: true
    }, userConfig.userConfig)
      .then((res) => {
        const { data } = res.body;
        setHistoryDetails(data);
      })
      .catch((error) => {
        restProps.pushNotification(error);
      });

    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    intervalRef.current = setTimeout(handleAlertReasonModalClose, 5 * 60 * 1000);

    return () => {
      clearTimeout(intervalRef.current);
    }

  }, []);
  return (
    <Modal
      width={1200}
      visible={!!visible}
      footer={false}
      maskClosable={false}
      centered
      onCancel={() => handleAlertReasonModalClose() }
      wrapClassName="Alert-Reason-Modal"
    >
      <div className="ZiqitzaVTS">
        <div className="Font--WB Font--S20 Flex Align-Items-Center Flex-Space-Between Ml-10" style={{ textTransform: 'uppercase' }}>
          <div>
            {values.ruleName}
            {' | '}
            {
              intl.formatMessage({ id: 'label.jobIdWithId' }, { id: values.jobNumber || 'NA' })
            }
          </div>
          <div style={{ marginRight: '40px' }}>
            {values.ruleCode}
            {' | '}
            {values.readOn && dayjs(values.readOn).format('DD MMM YYYY hh:mm:ss A')}
          </div>
        </div>
        <div className="Divider-Bottom-Gray90 Mt-20 Ml-10" style={{ marginRight: '10px' }} />
        <div className="Flex-Direction-Column Mt-20">
          <div className="Flex Form-Wrap">
            <div className="Field" style={{ position: 'relative' }}>
              <Input
                name={fieldNames.VEHICLE_REGISTRATION_NO}
                labelText={intl.formatMessage({ id: 'label.vehicleRegistrationNo' })}
                value={values[fieldNames.VEHICLE_REGISTRATION_NO]}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
                isReadonly
              />
              <span
                className="Text-Decoration-Underline Warmblue-Text Font--WB"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '30px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
                onClick={handleVehicleRegistrationViewOnClick}
                onKeyPress={handleVehicleRegistrationViewOnKeyPress}
                role="button"
                tabIndex={0}
              >
                {intl.formatMessage({ id: 'label.view' })}
              </span>
            </div>
            <div className="Field Phone-Number">
              <div className="Label-Text">
                {intl.formatMessage({ id: 'label.pilotContactNumber1' })}
              </div>
              <div className="Value-Text Flex">
                <div id={values[fieldNames.PILOT_CONTACT_NUMBER_1]}>
                  {values[fieldNames.PILOT_CONTACT_NUMBER_1]}
                </div>
                <Copy className="Ml-5" id={values[fieldNames.PILOT_CONTACT_NUMBER_1]} pushNotification={restProps.pushNotification} />
              </div>
            </div>
            <div className="Field Phone-Number">
              <div className="Label-Text">
                {intl.formatMessage({ id: 'label.pilotContactNumber2' })}
              </div>
              <div className="Value-Text Flex">
                <div id={values[fieldNames.PILOT_CONTACT_NUMBER_2]}>
                  {values[fieldNames.PILOT_CONTACT_NUMBER_2]}
                </div>
                <Copy className="Ml-5" id={values[fieldNames.PILOT_CONTACT_NUMBER_2]} pushNotification={restProps.pushNotification} />
              </div>
            </div>
            <div className="Field">
              <SelectExceptionReason
                id="ExceptionReasonsSlect"
                onChangeSelect={onSelect(fieldNames.EXCEPTION_REASON)}
                selectedItem={values[fieldNames.EXCEPTION_REASON]}
                labelText={intl.formatMessage({ id: 'label.exceptionReason*' })}
                errorText={errors[fieldNames.EXCEPTION_REASON]
                  && intl.formatMessage({ id: errors[fieldNames.EXCEPTION_REASON] })}
                query={exceptionReasonQueryRef && exceptionReasonQueryRef.current}
              />
            </div>
            <div className="Field" style={{ position: 'relative' }}>
              <Input
                name={fieldNames.GRANT_EXTENSION_TIME}
                labelText={intl.formatMessage({ id: 'label.grantExtensionTime' })}
                placeholder={intl.formatMessage({ id: 'label.grantExtensionTime' })}
                value={values[fieldNames.GRANT_EXTENSION_TIME]}
                errorText={errors[fieldNames.GRANT_EXTENSION_TIME]
                  && intl.formatMessage({
                    id: errors[fieldNames.GRANT_EXTENSION_TIME]
                  },
                    {
                      min: values[fieldNames.EXCEPTION_REASON]
                        ? values[fieldNames.EXCEPTION_REASON].code / (60 * 1000) : 'NA',
                    })}
                disabled={!values[fieldNames.EXCEPTION_REASON]}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
              />
              <span
                className="Font--WB"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '30px',
                  outline: 'none',
                }}
              >
                {intl.formatMessage({ id: 'label.min' })}
              </span>
            </div>
            <div className="Field NoteField">
              <Input
                name={fieldNames.NOTE}
                labelText={intl.formatMessage({ id: 'label.note*' })}
                placeholder={intl.formatMessage({ id: 'label.note' })}
                value={values[fieldNames.NOTE]}
                errorText={errors[fieldNames.NOTE]
                  && intl.formatMessage({ id: errors[fieldNames.NOTE] })}
                maxLength={300}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="Flex" style={{ justifyContent: 'flex-end' }}>
          <div className="Flex" style={{ marginRight: '10px' }}>
            <Button
              type="link"
              className="Button-Width Button"
              onClick={(event) => onSubmit(event, 'closeException')}
            >
              <span
                className="Button-Label"
              >
                {intl.formatMessage({ id: 'label.closeException' })}
              </span>
            </Button>
            <Button
              type="plain"
              className="Button-Width Button"
              onClick={(event) => onSubmit(event, 'close')}
              style={{ marginLeft: '18px', width: '115px' }}
            >
              <span className="Button-Label">
                {intl.formatMessage({ id: 'label.close' })}
              </span>
            </Button>
          </div>
        </div>
        <HistoryList intl={intl} data={(historyDetails && historyDetails.content) || []} />
      </div>
    </Modal>
  );
}

AlertReason.propTypes = {
  intl: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  handleAlertReasonModalClose: PropTypes.func.isRequired,
  onVehicleRegistrationViewClick: PropTypes.func.isRequired,
};

export default injectIntl(AlertReason);
