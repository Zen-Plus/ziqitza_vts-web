import moment from 'moment';

function getFiltersData(filter) {
  const _filter = {};
  _filter.vendorName = filter.vendor && filter.vendor.name ? filter.vendor.name : null;
  _filter.stateName = filter.state && filter.state.id ? filter.state.name : null;
  _filter.districtName = filter.district && filter.district.id ? filter.district.name : null;
  _filter.parkingName = filter.parking && filter.parking.id ? filter.parking.name : null;
  _filter.fromDate = filter.dateRange
    ? moment(filter.dateRange[0]).format('DD MMM YYYY hh:mm a')
    : moment().subtract(3, 'months').format('DD MMM YYYY hh:mm a');
  _filter.toDate = filter.dateRange
    ? moment(filter.dateRange[1]).format('DD MMM YYYY hh:mm a')
    : moment().format('DD MMM YYYY hh:mm a');
  _filter.generatedTime = moment(filter.generatedOn).format('DD/MM/YYYY hh:mm A');
  return _filter;
}

export const getPrintTitleHeading = (filter) => {
  const {
    vendorName,
    stateName,
    districtName,
    parkingName,
    fromDate,
    toDate,
    generatedTime,
  } = getFiltersData(filter);

  return `This report has been generated on ${generatedTime || 'NA'}
   with these filter criteria: Vendor: ${vendorName || 'NA'}, 
   State: ${stateName || 'NA'}, 
   District: ${districtName || 'NA'}, 
   Parking Bay: ${parkingName || 'NA'},
   Date-Time Interval: ${fromDate || 'NA'} - ${toDate || 'NA'} `;
};

export default {
  getPrintTitleHeading,
};
