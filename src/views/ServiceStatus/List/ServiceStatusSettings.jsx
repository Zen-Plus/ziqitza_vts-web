import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Menu from '../../../components/Menu';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';
import SelectDrop from '../../../components/SelectDrop';

const fieldNames = {
  DISPALY_TIME: 'displayTime',
  FETCH_STATS: 'fetchStats',
};

function ServiceStatusSettings({
  onClickCancel,
  onFilterSubmit: onSettingsSubmit,
  intl,
  selectedFilters: selectedSettings,
  pickListData,
}) {
  const [settings, setSettings] = useState(selectedSettings);

  const onSelect = (data, key) => {
    const _settings = { ...settings };
    _settings[key] = data;
    setSettings({
      ..._settings,
    });
  };

  const onResetPressed = () => {
    setSettings(
      {
        displayTime: {
          id: 'SEC',
          name: 'Seconds',
        },
        fetchStats:
         {
          id: 'LAST_FIFTEEN_MINS',
          name: 'Last 15 mins',
         },
      },
    );
  };

  const onApply = () => {
    if (Object.keys(settings).length) {
      onSettingsSubmit(settings, true);
    } else {
      onSettingsSubmit(settings, false);
    }
  };
  return (
    <Menu className="ServiceStatusSettingWrap">
      <div className="ZiqitzaVTS">
        <div className="VtsFilter ServiceStatusSettings">
          <span className="Arrow-Up" style={{ position: 'absolute', top: '-10px', left: '243px' }} />
          <div className="Flex" style={{ flexWrap: 'wrap' }}>
            <div>
              <SelectDrop
                labelText={intl.formatMessage({ id: 'label.displayTimeIn' })}
                id="DisplayTimeSelect"
                dropListValues={pickListData.ServiceStatusDisplayTimeFormat}
                onChangeSelect={(data) => onSelect(data, fieldNames.DISPALY_TIME)}
                selectedItem={settings.displayTime}
              />
            </div>
            <div className="Ml-20">
              <SelectDrop
                labelText={intl.formatMessage({ id: 'label.fetchStatsFor' })}
                id="FetchStatsSelect"
                dropListValues={pickListData.ServiceStatusTimeInterval}
                onChangeSelect={(data) => onSelect(data, fieldNames.FETCH_STATS)}
                selectedItem={settings.fetchStats}
              />
            </div>
          </div>

          <div className="Flex" style={{ justifyContent: 'space-between', marginTop: '50px' }}>
            <div className="Flex">
              <Button
                type="plain"
                onClick={onResetPressed}
                className="Button-Width"
              >
                <span style={{ verticalAlign: 'middle', marginRight: '9px' }}>
                  <Icon name="rotate-counterClockWise" />
                </span>
                <span
                  className="Font--WB Font--S16 Matterhorn-Text"
                  style={{ letterSpacing: '0.2px' }}
                >
                  {intl.formatMessage({ id: 'label.reset' })}
                </span>
              </Button>
            </div>
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
                onClick={onApply}
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

ServiceStatusSettings.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  pickListData: PropTypes.object.isRequired,
};

export default injectIntl(ServiceStatusSettings);
