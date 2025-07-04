import React from 'react';
import PropTypes from 'prop-types';
import Print from '../Print';
import Export from '../Export';
import styles from './style';

function ActionsFooter({
  dataToPrint,
  Components,
  printStatus,
  completePrintAction,
  resetPrintAllData,
  exportAllAction,
  exportAction,
  rootStyle,
  printTitleHeading,
}) {
  return (
    <div
      className="Box--Shadow"
      style={{ ...styles.actionFooterContainer, ...rootStyle }}
    >
      <div style={styles.btnContainer}>
        <Print
          listItems={dataToPrint || []}
          printTitleHeading={printTitleHeading}
          Components={Components}
          completePrintAction={completePrintAction}
          resetPrintAllData={resetPrintAllData}
          printStatus={printStatus}
          buttonStyle={{ width: '79px', height: '36px' }}
          className="Ml-10 Font--S14 Box--Shadow"
        />
        <Export
          type="PDF"
          exportAllAction={exportAllAction('PDF')}
          exportAction={exportAction('PDF')}
          listItemsCount={dataToPrint.length}
          buttonStyle={{ width: '79px', height: '36px' }}
          className="Ml-10 Font--S14 Box--Shadow"
        />
        <Export
          type="EXCEL"
          exportAllAction={exportAllAction('EXCEL')}
          exportAction={exportAction('EXCEL')}
          listItemsCount={dataToPrint.length}
          buttonStyle={{ width: '79px', height: '36px' }}
          className="Ml-10 Font--S14 Box--Shadow"
        />
        <Export
          type="CSV"
          exportAllAction={exportAllAction('CSV')}
          exportAction={exportAction('CSV')}
          listItemsCount={dataToPrint.length}
          buttonStyle={{ width: '79px', height: '36px' }}
          className="Ml-10 Font--S14 Box--Shadow"
        />
      </div>
    </div>
  );
}

ActionsFooter.defaultProps = {
  dataToPrint: [],
  printStatus: false,
  rootStyle: {},
  printTitleHeading: '',
};

ActionsFooter.propTypes = {
  dataToPrint: PropTypes.array,
  Components: PropTypes.object.isRequired,
  printStatus: PropTypes.bool,
  completePrintAction: PropTypes.func.isRequired,
  resetPrintAllData: PropTypes.func.isRequired,
  exportAction: PropTypes.func.isRequired,
  exportAllAction: PropTypes.func.isRequired,
  rootStyle: PropTypes.object,
  printTitleHeading: PropTypes.string,
};

export default ActionsFooter;
