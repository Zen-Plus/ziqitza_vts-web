import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Modal from '../../../components/Modal';
import HeaderRow from './HeaderRow';
import ListRow from './ListRow';
import ListItemIterator from '../../../components/ListUtils/ListItemIterator';
import ButtonWithIcon from '../../../components/Button/ButtonWithIcon';
import Scrollbars from '../../../components/Scrollbar';
import ContentWrap from '../../../components/ContentWrap';

function TripDetails(props) {
  const { onCancel, tripDetails, selectedTrip, intl } = props;

  return (
    <Modal
      width={1200}
      visible={!!selectedTrip}
      footer={false}
      maskClosable={false}
      centered
      onCancel={onCancel}
      wrapClassName="Alert-Details-Modal"
    >
      <div className="ZiqitzaVTS">
        <div className="Font--WB Font--S20 Flex Align-Items-Center Flex-Space-Between Ml-10" style={{ textTransform: 'uppercase' }}>
          <span>
            {intl.formatMessage({ id: 'label.vtsTripDetails' })}
            {` (${intl.formatMessage({ id: 'label.trip/jobId' })}${': '}${selectedTrip.jobNumber})`}
          </span>
        </div>
        <div className="Divider-Bottom-Gray90" style={{ marginTop: '10px' }} />
        <ContentWrap isFetching={tripDetails.isFetching}>
          <div className="Flex Mt-20 Form-Wrap">
            <table className="ListMaster Width-Full">
              <HeaderRow />
            </table>
            <Scrollbars style={{ height: '240px' }}>
              <table className="ListMaster">
                <ListItemIterator
                  listDetails={(tripDetails && tripDetails.info) || []}
                  ListItem={ListRow}
                />
              </table>
            </Scrollbars>
          </div>
        </ContentWrap>
      </div>
    </Modal>
  );
}

TripDetails.propTypes = {
  selectedTrip: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  tripDetails: PropTypes.object.isRequired,
};

export default injectIntl(TripDetails);
