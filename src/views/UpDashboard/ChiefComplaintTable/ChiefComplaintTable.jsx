import React from 'react';
import PropTypes from 'prop-types';
// import './chiefComplaintTable.less';

function ChiefComplaintTable({
  title, rowData, wrapClassName, titleBgColor,
}) {
  return (
    <div className={`ChiefComplaintTableWrapper ${wrapClassName}`}>
      <div className="ChiefComplaintTable">
        <div className="ChiefComplaintTable__Title text-center" style={{ backgroundColor: titleBgColor }}>
          {title}
        </div>
        <div className="ChiefComplaintTableWrapper">
          <table className="table ChiefComplaintTable Break-All">
            <thead className="text-center" style={{ backgroundColor: titleBgColor, color: '#131313', padding: '9.5px 16px' }}>
              <tr>
                <td>
                  S No.
                </td>
                <td> Top 15 Chief Complaints</td>
                <td>
                  Cases
                </td>
              </tr>
            </thead>
            <tbody>
              {
              rowData && rowData.map((item) => (
                <tr>
                  <td className="text-center">{item.id || 'NA'}</td>
                  <td>{item.name || 'NA'}</td>
                  <td className="text-center">{item.value || 'NA'}</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

ChiefComplaintTable.defaultProps = {
  wrapClassName: '',
  titleBgColor: '#00A65A',
  rowData: [],
};

ChiefComplaintTable.propTypes = {
  title: PropTypes.string.isRequired,
  wrapClassName: PropTypes.string,
  rowData: PropTypes.array,
  titleBgColor: PropTypes.string,
};

export default ChiefComplaintTable;

