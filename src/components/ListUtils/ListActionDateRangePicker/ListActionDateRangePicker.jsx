import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import DateRangePicker from '../../DateRangePicker';

function ListActionDateRangePicker({
  value, restProps, intl, isDateRangeLabel,
}) {
  return (
    <div className="ListActionDateRangePicker Flex">
      <DateRangePicker
        value={value}
        {...restProps}
      />
      { isDateRangeLabel ? (
        <span className="Mt-15 Ml-5 Font--S12">
          {intl.formatMessage({ id: 'label.dateRange' })}
        </span>
      ) : null}
    </div>
  );
}

ListActionDateRangePicker.defaultProps = {
  isDateRangeLabel: true,
};

ListActionDateRangePicker.propTypes = {
  intl: PropTypes.object.isRequired,
  value: PropTypes.array.isRequired,
  restProps: PropTypes.object.isRequired,
  isDateRangeLabel: PropTypes.bool,
};

export default injectIntl(ListActionDateRangePicker);
