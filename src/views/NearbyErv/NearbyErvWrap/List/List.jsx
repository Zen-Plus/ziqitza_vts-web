import React, { useState, useEffect, useContext } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import HeaderRow from './HeaderRow';
import ListRow from './ListRow';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import Scrollbars from '../../../../components/Scrollbar';
import ContentWrap from '../../../../components/ContentWrap';
import Icon from '../../../../components/Icon';
import useList from '../../../../common/hooks/useList';
import { NearbyEvrsListContext } from '../../../../providers/withNearbyErvListProvider';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';
import { createNearbyErvListPayload } from '../util';

function List(props) {
  const {
    listDetails, intl, searchPoints, onVehicleRegistrationNumberClick
  } = props;
  const { listState, setListStateValues } = useList({
    initialState: {
      sortBy: '',
      sortDirection: ''
    },
  });
  const [isListShow, setListShow] = useState(false);
  const NearbyErvsListInfo = useContext(NearbyEvrsListContext);
  const userConfig = React.useContext(UserConfigContext);

  const {
    isFetching,
    nearbyErvsList,
    displayNearbyErvsList,
  } = NearbyErvsListInfo.nearbyEvrsList;

  function handleSorting({ key, sortDirection }) {
    setListStateValues({ sortBy: key, sortDirection });
  }

  function handlePlusClick() {
    setListShow((listShow) => !listShow);
    setListStateValues({ sortBy: '', sortDirection: '' })
  };

  useEffect(() => {
    NearbyErvsListInfo.getDisplayNearbyErvLists({ ...listState }, false);
  }, [listState]);

  useEffect(() => {
    NearbyErvsListInfo.getDisplayNearbyErvLists({ ...listState }, false);
  }, [nearbyErvsList]);

  useEffect(() => {
    if (isListShow) {
      const _payload = createNearbyErvListPayload(listDetails);
      NearbyErvsListInfo.getDisplayNearbyErvLists({ payload: _payload }, true, userConfig);
    }
  }, [isListShow, listDetails]);

  return (
    <>
      <div className="NearbyErvList BorderRadius--Base Box--Shadow Font--S14" style={{ background: 'white', padding: '10px 15px' }}>
        <div className="Font--WB Flex Align-Items-Center Flex-Space-Between">
          <div>
            {intl.formatMessage({ id: 'label.nearestErvWithNumber' }, { number: listDetails.length })}
            {' | '}
            {intl.formatMessage({ id: 'label.searchPointsWithLatLon' }, { lat: searchPoints[0], lon: searchPoints[1] })}
          </div>
          <div className="Cursor-Pointer" onClick={handlePlusClick}>
            <Icon name={isListShow ? 'minus' : 'plus'} />
          </div>
        </div>
        {isListShow
          && (
            <ContentWrap isFetching={isFetching}>
              <div className="Flex Form-Wrap Mt-10">
                <table className="ListMaster Width-Full">
                  <HeaderRow
                    changeSort={handleSorting}
                    listState={listState}
                  />
                </table>
                <Scrollbars style={{ height: '150px' }}>
                  <table className="ListMaster">
                    <ListItemIterator
                      listDetails={(displayNearbyErvsList && displayNearbyErvsList.data) || []}
                      ListItem={ListRow}
                      onVehicleRegistrationNumberClick={onVehicleRegistrationNumberClick}
                    />
                  </table>
                </Scrollbars>
              </div>
            </ContentWrap>
          )}
      </div>
    </>
  );
}

List.propTypes = {
  intl: PropTypes.object.isRequired,
  listDetails: PropTypes.array.isRequired,
  searchPoints: PropTypes.array.isRequired,
  onVehicleRegistrationNumberClick: PropTypes.func.isRequired,
};

export default injectIntl(List);
