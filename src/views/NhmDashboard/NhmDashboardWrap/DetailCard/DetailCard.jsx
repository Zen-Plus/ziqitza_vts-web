import React from 'react';
import PropTypes from 'prop-types';
import { isNullOrUndefined } from '../../../../common/helpers/collectionUtils';
import Icon from '../../../../components/Icon/Icon';

function DetailTile({
  headerText,
  keyOne,
  keyTwo,
  keyThree,
  totalTaken,
  callerFeedback,
  callCenterFeedback,
  isViewChart,
}) {
  return (
    <div className="DetailTileWrapper">
      <div className="Head" style={{ backgroundColor: '#F0F0F0', color: '#1E1E1E' }}>
        {headerText}
      </div>
      <div className="P-16">
        <div className="Flex Flex-Direction-Column Align-Items-Start">
          <div className="KeyStyle">{keyOne}</div>
          <div className="ValueStyleOne">
            {!isNullOrUndefined(totalTaken) ? totalTaken : 'NA'}
          </div>
        </div>
        <div style={{ marginTop: '106px' }}>
          <div style={{ borderBottom: '1px solid #DDDDDD' }} className="keyStyleTwo Flex Flex-Space-Between">
            <div>
              <Icon style={{ marginRight: '4px' }} name="dot" />
              {keyTwo}
            </div>
            <div className="NeutralDark">
              {callerFeedback}
            </div>
          </div>
          <div className="keyStyleTwo Flex Flex-Space-Between">
            <div>
              <Icon style={{ marginRight: '4px' }} name="dot" />
              {keyThree}
            </div>
            <div className="NeutralDark">
              {callCenterFeedback}
            </div>
          </div>
        </div>
      </div>
      {isViewChart && <div className="ViewChartText ViewChart">
        View Chart
        <Icon style={{ marginLeft: '4px' }} name="dot" />
        {/* <Icon style={{ marginLeft: '4px' }} name="arrow-right" /> */}
      </div>}
    </div>
  );
}

DetailTile.propTypes = {
  headerText: PropTypes.string.isRequired,
  keyOne: PropTypes.string.isRequired,
  keyTwo: PropTypes.string.isRequired,
  keyThree: PropTypes.string.isRequired,
  totalTaken: PropTypes.string.isRequired,
  callerFeedback: PropTypes.string.isRequired,
  callCenterFeedback: PropTypes.string.isRequired,
  isViewChart: PropTypes.bool.isRequired,
};

export default DetailTile;
