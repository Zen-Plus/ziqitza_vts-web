import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function Cluster({ children, intl }) {
  return (
    <div className="Cluster View-Bg-Default Width-Full Flex-Direction-Column">
      <div
        className="Flex-Direction-Column Height-Full"
        style={{ zIndex: 1, position: 'relative', flexGrow: 1 }}
      >
        <div
          className="Font--S24 Font--WB"
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 28,
          }}
        >
          <span>
            {intl.formatMessage({ id: 'view.clusters.title.vtsClusters' })}
          </span>
        </div>
        <div
          style={{
            backgroundColor: 'white',
            marginTop: '28px',
          }}
          className="BorderRadius--Base Height-Full"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

Cluster.propTypes = {
  children: PropTypes.element.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Cluster);
