import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import HeaderRow from './HeaderRow';
import ListRow from './ListRow';
import Icon from '../../../../components/Icon';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import Scrollbars from '../../../../components/Scrollbar';
import {
  checkForSelectedAll,
} from '../../../../common/helpers/listUtils';

function Vehicles({
  intl,
  handleCheckBoxClick,
  handleSorting,
  listState,
  listDetails,
  selectVehicle,
  deSelectVehicle,
  selectedVehicles,
  setVehicleConfig,
  handleClickJobNumber,
}) {
  return (
    <div style={{ minWidth: '1160px', height: '100%' }}>
      <table className="ListMaster Width-Full">
        <HeaderRow
          handleCheckBoxClick={handleCheckBoxClick}
          changeSort={handleSorting}
          listState={listState}
          isSelectedAll={checkForSelectedAll({
            listDetails,
            selectedRowsIds: selectedVehicles,
          })}
        />
      </table>
      {!listDetails.length
        ? (
          <div
            style={{
              width: '25%',
              margin: '91px auto',
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
          <Scrollbars style={{ height: 'calc(100% - 65px)' }}>
            <table className="ListMaster">
              <ListItemIterator
                listDetails={listDetails}
                ListItem={ListRow}
                selectVehicle={selectVehicle}
                deSelectVehicle={deSelectVehicle}
                selectedItems={selectedVehicles}
                setVehicleConfig={setVehicleConfig}
                handleClickJobNumber={handleClickJobNumber}
              />
            </table>
          </Scrollbars>
        )}
    </div>
  );
}

Vehicles.propTypes = {
  intl: PropTypes.object.isRequired,
  handleCheckBoxClick: PropTypes.func.isRequired,
  handleSorting: PropTypes.func.isRequired,
  listState: PropTypes.object.isRequired,
  listDetails: PropTypes.array.isRequired,
  selectVehicle: PropTypes.func.isRequired,
  deSelectVehicle: PropTypes.func.isRequired,
  selectedVehicles: PropTypes.array.isRequired,
  setVehicleConfig: PropTypes.func.isRequired,
};

export default injectIntl(Vehicles);
