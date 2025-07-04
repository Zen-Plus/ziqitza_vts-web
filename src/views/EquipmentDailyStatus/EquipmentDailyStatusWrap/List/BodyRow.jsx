import React from 'react';
import PropTypes from 'prop-types';

function TableBody({ text }) {
  return (
    <td className="ListMaster__Row__Item">
      {text}
    </td>
  );
}

function BodyRow({
  details,
  index,
}) {
  const backGroundClass = (index % 2) !== 0 ? 'BG--Orange' : '';

  return (
    <tr className={`ListMaster__Row ${backGroundClass}`}>
      {details.map((item) => <TableBody text={item} />)}
    </tr>
  );
}

BodyRow.defaultProps = {
  details: [],
};

BodyRow.propTypes = {
  index: PropTypes.number.isRequired,
  details: PropTypes.array,
};

export default BodyRow;
