import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import style from './rowStyle';

function HeaderRow({
  intl,
}) {
  return (
    <thead>
      <tr className="ListMaster__Header" style={style.root}>
        <th className="ListMaster__Header__Item" style={style.milestone}>
          {intl.formatMessage({ id: 'label.milestone' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.startTime}>
          {intl.formatMessage({ id: 'label.startTime' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.endTime}>
          {intl.formatMessage({ id: 'label.endTime' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.totalTime}>
          {intl.formatMessage({ id: 'label.totalTimeTaken' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.distance}>
          {intl.formatMessage({ id: 'label.distance' })}
        </th>
        <th className="ListMaster__Header__Item Ml-20" style={style.excessTime}>
          <span style={{ width: '95px', display: 'flex' }}>
            {intl.formatMessage({ id: 'label.excessTime' })}
          </span>
        </th>
      </tr>
    </thead>
  );
}

HeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HeaderRow);
