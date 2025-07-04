import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function ListHeaderRow({ intl }) {
  return (
    <thead>
      <tr className="ListHeaderRowWrapper Font--S16 NeutralDark Border">
        <th className="ListHeaderRowText Bg-Head-Gray Border-Gray">
          {' '}
        </th>
        <th className="ListHeaderRowText Bg-Head-Gray Border-Gray">
          {intl.formatMessage({ id: 'label.district' })}
        </th>
        <th className="ListHeaderRowText Bg-Head-Gray Border-Gray">
          {intl.formatMessage({ id: 'label.totalAmbulanceLive' })}
        </th>
        <th className="ListHeaderRowText Bg-Head-Gray Border-Gray">
          {intl.formatMessage({ id: 'label.totalOnRoadLive' })}
        </th>
        <th className="ListHeaderRowText Bg-Head-Gray Border-Gray">
          {intl.formatMessage({ id: 'label.totaloffRoadLive' })}
        </th>
        <th className="ListHeaderRowText Bg-Head-Gray Border-Gray">
          {intl.formatMessage({ id: 'label.totalEquipments' })}
        </th>
        <th className="ListHeaderRowText Bg-Head-Gray Border-Gray">
          {intl.formatMessage({ id: 'label.equipmentsWorking' })}
        </th>
        <th className="ListHeaderRowText Bg-Head-Gray Border-Gray">
          {intl.formatMessage({ id: 'label.equipmentsNotWorking' })}
        </th>
      </tr>
    </thead>
  );
}

ListHeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ListHeaderRow);
