import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Menu from '../../../../components/Menu';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import useForm from '../../../../common/hooks/form';
import ToogleSelect from '../../../../components/ToggleSelect';
import Input from '../../../../components/Input';
import { validateRequire, validateNumber } from '../../../../common/helpers/validators';

const fieldNames = {
  AUTO_REFRESH: 'autoRefresh',
  REFRESH_INTERVAL: 'refreshInterval',
};
function getInitialValues(values = {}) {
  const _values = { ...values };
  return _values;
}
function handleChange(event, preValues) {
  const { name, value } = event.target || {};
  return { ...preValues, [name]: value };
}

function handleToggle(event, preValues) {
  const { name, value } = event || {};
  const _preValues = { ...preValues };
  delete _preValues[fieldNames.REFRESH_INTERVAL];
  return { ..._preValues, [name]: value };
}

export const fields = {
  [fieldNames.AUTO_REFRESH]: {
    handleToggle,
  },
  [fieldNames.REFRESH_INTERVAL]: {
    handleChange,
  },
};
function validate({ values = {} }) {
  const errors = {};
  if (values[fieldNames.AUTO_REFRESH] && values[fieldNames.AUTO_REFRESH].id === 'ON') {
    if (!validateRequire(values[fieldNames.REFRESH_INTERVAL])) {
      errors[fieldNames.REFRESH_INTERVAL] = 'validation.require.text.field';
    } else if (!validateNumber(values[fieldNames.REFRESH_INTERVAL])) {
      errors[fieldNames.REFRESH_INTERVAL] = 'validation.invalid.form.text.data';
    } else if (values[fieldNames.REFRESH_INTERVAL] < 20) {
      errors[fieldNames.REFRESH_INTERVAL] = 'validation.refreshInterval.minimum.text.field';
    }
  }
  return errors;
}
function handleSubmit(values) {
  this.onSettingSubmit(values);
}

function LiveTrackingAlertSetting({
  onClickCancel,
  onSettingSubmit,
  intl,
  pickListData,
  selectedSettings,
  restProps,
}) {
  const {
    values, errors, events,
  } = useForm({
    initialValues: getInitialValues(selectedSettings),
    handleSubmit: handleSubmit.bind({ onSettingSubmit }),
    fields,
    validate: validate.bind(restProps),
  });
  const {
    onBlur, onKeyUp, onChange, onSubmit, onToggle,
  } = events;

  return (
    <Menu className="TrackingAlertSettingWrap">
      <div className="ZiqitzaVTS">
        <div className="VtsSetting TrackingAlertSetting">
          <span className="Arrow-Up" style={{ position: 'absolute', top: '-10px', left: '243px' }} />
          <div className="Flex" style={{ flexWrap: 'wrap' }}>
            <div>
              <ToogleSelect
                labelText={intl.formatMessage({ id: 'label.autoRefresh' })}
                values={pickListData.AutoRefreshStatus || []}
                selected={values[fieldNames.AUTO_REFRESH]}
                onSelect={onToggle(fieldNames.AUTO_REFRESH)}
              />
            </div>
            <div className="Ml-20" style={{ position: 'relative' }}>
              <Input
                name={fieldNames.REFRESH_INTERVAL}
                labelText={intl.formatMessage({ id: 'label.refreshIntervalSessionRestricted' })}
                value={values[fieldNames.REFRESH_INTERVAL]}
                errorText={errors[fieldNames.REFRESH_INTERVAL]
                  && intl.formatMessage({ id: errors[fieldNames.REFRESH_INTERVAL] })}
                maxLength={6}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
                disabled={values[fieldNames.AUTO_REFRESH] && values[fieldNames.AUTO_REFRESH].id === 'OFF'}
              />
              <div style={{ position: 'absolute', right: '10px', top: '30px' }}>
              {intl.formatMessage({ id: 'label.sec' })}
              </div>
            </div>
          </div>
          <div className="Flex" style={{ justifyContent: 'flex-end', marginTop: '40px' }}>
            <div className="Flex">
              <Button
                type="link"
                className="Button-Width Button-Label-Cancel"
                onClick={() => onClickCancel()}
              >
                <span style={{ verticalAlign: 'middle', marginRight: 9 }}>
                  <Icon name="cross-red" />
                </span>
                <span className="Font--WB Font--S16" style={{ letterSpacing: '0.2px' }}>
                  {intl.formatMessage({ id: 'label.cancel' })}
                </span>
              </Button>
              <Button
                type="plain"
                className="Ml-18 Button-Width"
                onClick={onSubmit}
              >
                <span style={{ verticalAlign: 'middle', marginRight: '9px' }}>
                  <Icon name="check" />
                </span>
                <span
                  className="Font--WB Font--S16 Matterhorn-Text"
                  style={{ letterSpacing: '0.2px' }}
                >
                  {intl.formatMessage({ id: 'label.apply' })}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Menu>
  );
}

LiveTrackingAlertSetting.defaultProps = {
  restProps: {},
}

LiveTrackingAlertSetting.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  onSettingSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  selectedSettings: PropTypes.object.isRequired,
  pickListData: PropTypes.object.isRequired,
  restProps: PropTypes.object,
};

export default injectIntl(LiveTrackingAlertSetting);
