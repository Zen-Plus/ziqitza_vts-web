import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import Button from '../../Button';
import Dropdown from '../../Dropdown';

function SettingWrap({
  isFetching,
  components,
  selectedSettings,
  handleSubmitSetting,
  wrapperClassName,
  pickListData,
  isScrollIntoView,
  placement,
  settingRestProps,
}) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const SettingRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (SettingRef.current && !SettingRef.current.contains(event.target)) {
        setIsDropDownVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [SettingRef]);


  function handleSettingSubmit(data) {
    setIsDropDownVisible(false);
    handleSubmitSetting(data);
  }
  return (
    <div className="VtsSettingWrap">
      <div className={isDropDownVisible ? 'overlay' : ''} />
      <Dropdown
        overlay={(
          isDropDownVisible
            ? (
              <components.Setting
                onClickCancel={() => setIsDropDownVisible(false)}
                selectedSettings={selectedSettings}
                pickListData={pickListData}
                onSettingSubmit={handleSettingSubmit}
                settingRef={SettingRef}
                {...settingRestProps}
              />
            ) : <> </>
        )}
        visible={isDropDownVisible}
        placement={placement}
        overlayClassName={`${placement === 'bottomRight' ? 'VtsListSetting-Position-right' : 'VtsListSetting-Position-left'} ${wrapperClassName}`}
      >
        <Button
          style={{ background: 'transparent', width: '40px', padding: '10px' }}
          onClick={() => {
            if (isScrollIntoView) {
              const element = document.querySelector('.VtsSettingWrap');
              element.scrollIntoView();
            }
            setIsDropDownVisible(!isDropDownVisible);
          }}
          disabled={isFetching}
        >
          <Icon name={settingRestProps.settingIconName} />
        </Button>
      </Dropdown>
    </div>
  );
}

SettingWrap.defaultProps = {
  components: {},
  handleSubmitSetting: () => { },
  isFetching: false,
  pickListData: {},
  wrapperClassName: '',
  isScrollIntoView: false,
  placement: 'bottomCenter',
  settingRestProps: {
    settingIconName: 'settings',
  },
};

SettingWrap.propTypes = {
  components: PropTypes.object,
  handleSubmitSetting: PropTypes.func,
  isFetching: PropTypes.bool,
  selectedSettings: PropTypes.object.isRequired,
  pickListData: PropTypes.object,
  wrapperClassName: PropTypes.string,
  handleNavSwitch: PropTypes.func,
  isScrollIntoView: PropTypes.bool,
  placement: PropTypes.string,
  settingRestProps: PropTypes.object,
};

export default SettingWrap;
