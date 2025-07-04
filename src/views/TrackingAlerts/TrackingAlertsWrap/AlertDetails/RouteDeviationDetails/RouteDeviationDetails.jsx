import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../../components/Input';
import Modal from '../../../../../components/Modal';
import dayjs from 'dayjs';
import { convertMilliseconds } from '../../../../../common/helpers/commonUtils.js'

function RouteDeviationDetails({ intl, onCancel, details }) {
  return (
    <Modal
      width={1200}
      visible={!!details}
      footer={false}
      maskClosable={false}
      centered
      onCancel={onCancel}
      wrapClassName="Route-Deviation-Modal"
    >
      <div className='ZiqitzaVTS'>
        <div className="Font--WB Font--S20 Flex Mr-35 Align-Items-Center Flex-Space-Between Ml-10" style={{ textTransform: 'uppercase' }}>
          {intl.formatMessage({ id: 'label.routeDeviationDetails' })}
        </div>
        <div className="Mt-20 Ml-10 Divider-Bottom-Gray90" style={{ marginRight: '10px' }} />
        <div className="Flex Mt-20 Form-Wrap">
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.readBy' })}
              value={(details && details.readBy) || 'NA'}
              isReadonly
            />
          </div>
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.readOn' })}
              value={(details && details.readOn && dayjs(details.readOn).format('DD MMM YYYY | hh:mm a')) || 'NA'}
              isReadonly
            />
          </div>
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.exceptionReason' })}
              value={(details && details.exceptionReason) || 'NA'}
              isReadonly
            />
          </div>
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.grantedExceptionTime' })}
              value={(details && details.extensionPeriod && convertMilliseconds(details.extensionPeriod, 'MIN', 0)) || 'NA'}
              isReadonly
            />
          </div>
          <div className="Field">
            <Input
              labelText={intl.formatMessage({ id: 'label.closedOn' })}
              value={(details && details.closedOn && dayjs(details.closedOn).format('DD MMM YYYY | hh:mm a')) || 'NA'}
              isReadonly
            />
          </div>
          <div className="Field Remark">
            <Input
              labelText={intl.formatMessage({ id: 'label.remark' })}
              value={(details && details.note) || 'NA'}
              isReadonly
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

RouteDeviationDetails.propTypes = {
  onCancel: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
}

export default RouteDeviationDetails;