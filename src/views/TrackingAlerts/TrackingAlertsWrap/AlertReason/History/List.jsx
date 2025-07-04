import React from 'react'
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import HeaderRow from './HeaderRow';
import ListRow from './ListRow';
import Icon from '../../../../../components/Icon';
import ListItemIterator from '../../../../../components/ListUtils/ListItemIterator';
import ScrollBar from '../../../../../components/Scrollbar';

function List({
  data,
  intl,
}) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="List-Wrap Ml-10"
    >
      <div style={{ position: 'relative' }}>
        <div className="Font--WB Mt-20 Font--S20" style={{ textTransform: 'uppercase' }}>
          <span>
            {intl.formatMessage({ id: 'label.history' })}
          </span>
        </div>
        <div className="Divider-Bottom-Gray90 Mt-10" style={{ marginRight: '20px' }} />
        <div style={{
          width: '100%', overflowX: 'auto', overflowY: 'hidden',
        }}
        >
          <div style={{ marginTop: '20px', minWidth: '1160px' }}>
            <table className="ListMaster Width-Full">
              <HeaderRow />
              {!data.length
                ? (
                  <div
                    style={{
                      width: '25%',
                      margin: '50px auto',
                    }}
                  >
                    <div style={{
                      textAlign: 'center',
                    }}
                    >
                      <Icon name="search-not-found" />
                    </div>

                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                      {intl.formatMessage({ id: 'label.noRecordsFound' })}
                    </div>
                  </div>
                ) : (

                  <ScrollBar id="scroll-bar" style={{ height: '200px', zIndex: 2 }}>
                    <ListItemIterator
                      listDetails={data}
                      ListItem={ListRow}
                    />
                  </ScrollBar>
                )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

List.defaultProps = {
  data: [],
};

List.propTypes = {
  data: PropTypes.array,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(List);
