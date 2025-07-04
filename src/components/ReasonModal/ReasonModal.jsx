import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { injectIntl } from 'react-intl';
import Input from '../Input';
import Button from '../Button';
import useForm from '../../common/hooks/form';
import { validateRequire, validateConsecutiveSpaces } from '../../common/helpers/validators';

const fieldNames = {
  REASON: 'reason',
};

function handleChange(event, preValues) {
  const { name, value } = event.target || {};
  return { ...preValues, [name]: value };
}

const fields = {
  [fieldNames.REASON]: {
    handleChange,
  },
};

function validate({ values = {} }) {
  const errors = {};
  if (!validateRequire(values[fieldNames.REASON])) {
    errors[fieldNames.REASON] = this.requireText || 'Required';
  } else if (validateConsecutiveSpaces(values[fieldNames.REASON])) {
    errors[fieldNames.REASON] = 'Enter valid data';
  }
  return errors;
}

function ReasonModal({
  closable,
  title,
  isVisible,
  contentTitle,
  onCancel,
  onSubmit,
  inputLabel,
  classWrapper,
  intl,
  ...restProps
}) {
  const {
    values, errors, events, reset,
  } = useForm({
    initialValues: {}, handleSubmit: onSubmit, fields, validate: validate.bind(restProps),
  });

  useEffect(() => {
    if (!isVisible) {
      reset();
    }
  }, [isVisible]);

  function handleCancel() {
    reset();
    onCancel();
  }

  const {
    onChange, onBlur, onKeyUp,
  } = events;
  return (
    <Modal
      closable={closable}
      title={title}
      className="VtsReasonModal ZiqitzaVTS"
      footer={[
        <Button key="cancel" type="link" onClick={handleCancel}>
          {intl.formatMessage({ id: 'label.cancel' })}
        </Button>,
        <Button style={{ width: '91px' }} key="save" type="default" onClick={events.onSubmit}>
          {intl.formatMessage({ id: 'label.yes' })}
        </Button>,
      ]}
      visible={isVisible}
      wrapClassName={classWrapper}
    >
      {
        contentTitle
        && <span>{contentTitle}</span>
      }
      <>
        <Input
          name={fieldNames.REASON}
          type="text"
          labelText={inputLabel}
          placeholder={intl.formatMessage({ id: 'label.typeHere' })}
          value={values[fieldNames.REASON]}
          onChange={onChange}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          maxLength={300}
          errorText={errors[fieldNames.REASON]}
        />
      </>
    </Modal>
  );
}

ReasonModal.defaultProps = {
  closable: false,
  title: '',
  restProps: {},
  classWrapper: '',
};

ReasonModal.propTypes = {
  closable: PropTypes.bool,
  title: PropTypes.string,
  inputLabel: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  contentTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  restProps: PropTypes.object,
  classWrapper: PropTypes.string,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ReasonModal);
