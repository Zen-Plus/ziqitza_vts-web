import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function ListHeaderRow({ intl }) {
  return (
    <thead>
      <tr className="ListMaster__Header Font--S16 text-white">
        <th className="ListMaster__Header__Item" colSpan={1} style={{ minWidth: 40 }} />
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.sNo' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.beneficiaryDistrict' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.date' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.callLandedAtArc' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.totalAmbulanceOnRoad' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.totalAmbulanceOffRoad' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.tripTypeRuralUrban' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.totalTripGenerated' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.dryRunUnAvailed' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.totalTripCompleted' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.totalBeneficiary' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.totalKilometer' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.averageKilometerTrip' })}
        </th>
        <th className="ListMaster__Header__Item">
          {intl.formatMessage({ id: 'label.averageResponseTimeTrip' })}
        </th>
      </tr>
    </thead>
  );
}

ListHeaderRow.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ListHeaderRow);
