import React from 'react';
import PropTypes from 'prop-types';

function Legends({ data }) {
  return (
    <div className="DistanceReport__Legends">
      {data.map((key) => (
        <div className="Flex Mt-10" style={{ lineHeight: 1 }} key={key.label}>
          <div style={{ height: 14, width: 14, backgroundColor: `${key.color}` }} />
          <div className="Ml-10 Font--WB">
            {key.label}
          </div>
        </div>
      ))}
    </div>
  );
}

Legends.defaultProps = {
  data: [],
};

Legends.propTypes = {
  data: PropTypes.array,
};

export default Legends;
