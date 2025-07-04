import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Input from '../../../../components/Input';
import Icon from '../../../../components/Icon';
import Button from '../../../../components/Button';
import useForm from '../../../../common/hooks/form';
import SelectDrop from '../../../../components/SelectDrop';
import withProvider from '../../../../common/hocs/withProvider/withProvider';
import { ProtocolsContext, withProtocolsProvider } from '../../../../providers/withProtocolsProvider';
import { fieldNames, fields } from './formConfig';
import { validateClusterName, validateReceiverPort, validateRequire } from '../../../../common/helpers/validators';

const SelectProtocalUsed = withProvider({
  getResourcesActionKey: 'getProtocolsList',
  loadMoreActionKey: 'getProtocolsListLoadMore',
  context: ProtocolsContext,
  contextProvider: withProtocolsProvider,
  stateKey: 'protocols'
}, SelectDrop);

function handleSubmit(values) {
  this.onSubmit(values);
}

function getInitialValues(values = {}) {
  const _values = { ...values };
  return _values;
}

function validate({ values = {} }) {
  const errors = {};

  if (!validateRequire(values[fieldNames.CLUSTER_NAME])) {
    errors[fieldNames.CLUSTER_NAME] = 'validation.require.text.field';
  } else if (!validateClusterName(values[fieldNames.CLUSTER_NAME])) {
    errors[fieldNames.CLUSTER_NAME] = 'validation.invalid.form.text.data';
  }
  if (!values[fieldNames.RECEIVER_PORT]) {
    errors[fieldNames.RECEIVER_PORT] = 'validation.require.text.field';
  } else if (!validateReceiverPort(values[fieldNames.RECEIVER_PORT])) {
    errors[fieldNames.RECEIVER_PORT] = 'validation.invalid.form.text.data';
  }
  if (!values[fieldNames.PROTOCOLS] || (values[fieldNames.PROTOCOLS] && !values[fieldNames.PROTOCOLS].length)) {
    errors[fieldNames.PROTOCOLS] = 'validation.require.text.field';
  }
  return errors;
}

function Form({
  initialValues, pickListData, isReadonly, ...restProps
}) {

  const {
    values, errors, events,
  } = useForm({
    initialValues: getInitialValues(initialValues),
    handleSubmit: handleSubmit.bind(restProps),
    fields,
    validate: validate.bind(restProps),
  });

  const {
    intl, mode,
  } = restProps;
  const {
    onBlur, onKeyUp, onChange, onSubmit, onSelect,
  } = events;

  return (
    <div
      className="Flex-Direction-Column Vts-Form-Master Cluster__Form Height-Full"
      style={{ height: '100%', justifyContent: 'space-between' }}
    >
      <div className="Flex-Direction-Column" style={{ flexWrap: 'wrap', padding: 0 }}>
        <div>
          <div className="Field">
            <Input
              name={fieldNames.CLUSTER_NAME}
              labelText={intl.formatMessage({ id: 'label.clusterName*' })}
              placeholder={intl.formatMessage({ id: 'label.clusterName' })}
              value={values[fieldNames.CLUSTER_NAME]}
              errorText={errors[fieldNames.CLUSTER_NAME]
                && intl.formatMessage({ id: errors[fieldNames.CLUSTER_NAME] })}
              maxLength={20}
              onBlur={onBlur}
              onKeyUp={onKeyUp}
              onChange={onChange}
              isReadonly={mode === "edit" ? true : isReadonly}
            />
          </div>
          <div className="Field">
            <Input
              name={fieldNames.RECEIVER_PORT}
              labelText={intl.formatMessage({ id: 'label.receiverPort*' })}
              placeholder={intl.formatMessage({ id: 'label.receiverPort' })}
              value={values[fieldNames.RECEIVER_PORT]}
              errorText={errors[fieldNames.RECEIVER_PORT]
                && intl.formatMessage({ id: errors[fieldNames.RECEIVER_PORT] })}
              maxLength={5}
              onBlur={onBlur}
              onKeyUp={onKeyUp}
              onChange={onChange}
              isReadonly={mode === "edit" ? true : isReadonly}
            />
          </div>
        </div>
        <div className="Field ProtocolUsed">
          <SelectProtocalUsed
            multi
            id="selectProtocolUsed"
            onChangeSelect={onSelect(fieldNames.PROTOCOLS)}
            selectedItems={values[fieldNames.PROTOCOLS]}
            labelText={intl.formatMessage({ id: 'label.protocols*' })}
            isReadonly={isReadonly}
            errorText={errors[fieldNames.PROTOCOLS]
              && intl.formatMessage({ id: errors[fieldNames.PROTOCOLS] })}
          />
        </div>
      </div>
      {
        restProps.renderProps({ onSubmit })
      }
      {
        ['add'].includes(mode)
        && (
          <div className="FormAction">
            <Button
              type="link"
              className="Cancel"
              onClick={restProps.onCancel}
            >
              <span className="Icon">
                <Icon name="cross-red" />
              </span>
              <span className="Font--WB">{intl.formatMessage({ id: 'label.cancel' })}</span>
            </Button>
            <Button
              type="plain"
              className="Ml-12 Save"
              onClick={onSubmit}
            >
              <span className="Icon">
                <Icon name="check" />
              </span>
              {intl.formatMessage({ id: 'label.save' })}
            </Button>
          </div>
        )
      }
    </div>
  );
}

Form.defaultProps = {
  isProcessing: false,
  mode: 'add',
  renderProps: () => { },
  onCancel: () => { },
  isReadonly: false,
  initialValues: {},
};

Form.propTypes = {
  intl: PropTypes.object.isRequired,
  onCancel: PropTypes.func,
  isProcessing: PropTypes.bool,
  initialValues: PropTypes.object,
  mode: PropTypes.string,
  renderProps: PropTypes.func,
  isReadonly: PropTypes.bool,
};

export default injectIntl(Form);
