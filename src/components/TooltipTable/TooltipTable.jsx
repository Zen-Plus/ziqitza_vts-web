import React from 'react';
import PropTypes from 'prop-types';

export default function TooltipTable({ title = "", data = []}) {
  return (
    <div className="TooltipTable" style={{ width: '200px', background: 'white', color: 'black', margin: '-10px', border: '1px solid', borderRadius: '4px' }}>
      <div style={{ padding: '4px 16px', borderBottom: '1px solid', textAlign: 'center' }}>{title}</div>
      {
        data.map((item, index) => (            
          <div key={index} className="rowToolTip" style={{ borderBottom: index === data.length - 1 ? '' : '1px solid' }}>
            <div className="rowKey">{item.key}</div>
            <div className="rowValue" style={{ borderLeft: '1px solid', width: '50px' }}>{item.value}</div>
          </div>
        ))
      }
    </div>
  )
}

TooltipTable.prototype = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}