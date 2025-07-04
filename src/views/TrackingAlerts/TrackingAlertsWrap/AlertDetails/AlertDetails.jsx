import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Modal from '../../../../components/Modal';
import HeaderRow from './HeaderRow';
import ListRow from './ListRow';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import Scrollbars from '../../../../components/Scrollbar';
import ContentWrap from '../../../../components/ContentWrap';
import RouteDeviationDetailsModal from './RouteDeviationDetails';

function AlertDetails(props) {
  const { onCancel, alertDetails, selectedAlert, intl } = props;
  const [isRouteDeviationModalDetails, setRouteDeviationModalDetails] = useState(false);
  const handleViewClick = (value) => {
    setRouteDeviationModalDetails(value);
  }

  const handleRouteDetailModalCancel = () => {
    setRouteDeviationModalDetails(false)
  }
  return (
    <Modal
      width={1200}
      visible={!!selectedAlert}
      footer={false}
      maskClosable={false}
      centered
      onCancel={onCancel}
      wrapClassName="Alert-Details-Modal"
    >
      <div className="ZiqitzaVTS">
        <div className="Font--WB Font--S20 Flex Align-Items-Center Flex-Space-Between Ml-10" style={{ textTransform: 'uppercase' }}>
          {intl.formatMessage({ id: 'label.alertDetails' })}
          {`(${selectedAlert.jobNumber ? selectedAlert.jobNumber : 'NA'} | ${selectedAlert.vehicleRegistrationNumber ? selectedAlert.vehicleRegistrationNumber : 'NA'})`}
        </div>
        <div className="Divider-Bottom-Gray90" style={{ marginTop: '10px' }} />
        <ContentWrap isFetching={alertDetails.isFetching}>
          <div className="Flex Mt-20 Form-Wrap">
            <table className="ListMaster Width-Full">
              <HeaderRow />
            </table>
            <Scrollbars style={{ height: '240px' }}>
              <table className="ListMaster">
                <ListItemIterator
                  listDetails={(alertDetails && alertDetails.info) || []}
                  ListItem={ListRow}
                  onViewClick={handleViewClick}
                />
              </table>
            </Scrollbars>
          </div>
        </ContentWrap>
      </div>
      {!!Object.keys(isRouteDeviationModalDetails).length
        &&
        <RouteDeviationDetailsModal
          details={isRouteDeviationModalDetails}
          onCancel={handleRouteDetailModalCancel}
          intl={intl}
        />
      }
    </Modal>
  );
}

AlertDetails.propTypes = {
  selectedAlert: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  alertDetails: PropTypes.object.isRequired,
};

export default injectIntl(AlertDetails);
