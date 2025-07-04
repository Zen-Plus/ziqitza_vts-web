import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon/Icon';
import { isNullOrUndefined } from '../../../../common/helpers/collectionUtils';
import { Tooltip } from 'antd';

function DataCard({
  title, iconName, value, wrapClassName, iconBgColor, component, tooltip, toolTipComponent
}) {
  return (
    <div className={`DataCardWrapper ${wrapClassName}`} style={{ width: 'auto' }}>
      <div className="DataCard Flex Flex-Direction-Column" style={{ width: 'auto' }}>
        <div className="Flex AlignItems--Center Icon" style={{ backgroundColor: iconBgColor, padding: '16px' }}>
          <div className="DataCard__Title text-white Font--S16 Break-All">
            {title}
          </div>
        </div>
        <div className="Flex Align-Items-Center Text-Decoration-UpperCase" style={{ justifyContent: 'space-between', padding: '16px', color: '#131313' }}>
          {component && component.OffRoadCountDetail && (
            <component.OffRoadCountDetail />
          )}
          {tooltip ? (
            <Tooltip title={toolTipComponent} placement='bottom'>
              {value && (
                <div className="DataCard__Value Font--WB Break-All">
                  {!isNullOrUndefined(value) ? value : 'NA'}
                </div>
              )}
            </Tooltip>
          ) : (
            value && (
              <div className="DataCard__Value Font--WB Break-All">
                {!isNullOrUndefined(value) ? value : 'NA'}
              </div>
            )
          )}
          <Icon name={iconName} />
        </div>
      </div>
    </div>
  );
}

DataCard.defaultProps = {
  value: null,
  component: {},
  tooltip: false,
  toolTipComponent: () => {},
};

DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  value: PropTypes.string,
  wrapClassName: PropTypes.string.isRequired,
  iconBgColor: PropTypes.string.isRequired,
  component: PropTypes.object,
  tooltip: PropTypes.bool,
  toolTipComponent: PropTypes.func,
};

export default DataCard;

