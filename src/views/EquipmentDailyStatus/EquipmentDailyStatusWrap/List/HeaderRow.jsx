import React from 'react';
import PropTypes from 'prop-types';

function TableHead({ text }) {
  return (
    <th className="ListMaster__Header__Item">
      {text}
    </th>
  );
}

function HeaderRow({
  headerData,
}) {
  return (
    <thead>
      <tr className="ListMaster__Header Font--S16 text-white">
        {headerData.map((item) => <TableHead text={item}  />)}
      </tr>
    </thead>
  );
}

HeaderRow.defaultProps = {
  headerData: [],
};

HeaderRow.propTypes = {
  headerData: PropTypes.array,
};

export default HeaderRow;
