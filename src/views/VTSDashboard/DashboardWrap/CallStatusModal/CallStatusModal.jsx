import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Modal from '../../../../components/Modal';
import Input from '../../../../components/Input';
import SelectDrop from '../../../../components/SelectDrop';
import useForm from '../../../../common/hooks/form';
import { fieldNames, fields } from './formConfig';
import TrackIcons from './TrackLocations/TrackIcons';
import ContentWrap from '../../../../components/ContentWrap';
import { withPickListProvider } from '../../../../providers/withPickListProvider';

function getInitialValues(data, values = {}) {
  const _values = { ...data, milestoneReportedType: values };
  return _values;
}

function CallStatusModal({
  intl, onSubmit, onCancel, details, isVisible, pickListData, ...restProps
}) {
  const { isProcessing } = details;
  let { data } = (details && details.info) || [];
  const {
    values, events, reset,
  } = useForm({
    initialValues: getInitialValues(data, { id: 'CREW', name: 'Crew' }),
    handleSubmit: onSubmit,
    fields,
  });
  useEffect(() => {
    if (!isVisible) {
      reset();
    }
  }, [isVisible]);
  const {
    onChange, onBlur, onKeyUp, onSelect,
  } = events;

  useEffect(() => {
    if (!isProcessing) {
      if (values[fieldNames.MILESTONE_TYPE] || Object.keys(data).length) {
        onSubmit(values[fieldNames.MILESTONE_TYPE]);
      }
    }
  }, [values[fieldNames.MILESTONE_TYPE]]);

  return (
    <Modal
      width={1000}
      visible={isVisible}
      footer={false}
      maskClosable={false}
      centered
      onCancel={onCancel}
      wrapClassName="DashboardCallStatusModal"
    >
      <div className="Call-Status-Modal ZiqitzaVTS">
        <div className="Font--WB Ml-10 Mt-10 Font--S20">
          <span>
            {intl.formatMessage({ id: 'view.callerPage.callStatus.text.title' })}
            {` : ${values[fieldNames.SERVICE_REQUEST_NUMBER] || 'NA'}`}
          </span>
        </div>
        <div className="Mt-8 Ml-10 Divider-Bottom-Gray90" />
        <ContentWrap isFetching={isProcessing}>
          <div className="Flex Mt-20 Form-Wrap">
            <div className="Field">
              <Input
                name={fieldNames.SERVICE_REQUEST_NUMBER}
                labelText={intl.formatMessage({ id: 'label.serviceRequestNumber' })}
                placeholder={intl.formatMessage({ id: 'label.serviceRequestNumber' })}
                value={values[fieldNames.SERVICE_REQUEST_NUMBER] || 'NA'}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
                isReadonly
              />
            </div>
            <div className="Field">
              <Input
                name={fieldNames.SERVICE_REQUEST_STATUS}
                labelText={intl.formatMessage({ id: 'label.serviceRequestStatus' })}
                placeholder={intl.formatMessage({ id: 'label.serviceRequestStatus' })}
                value={values[fieldNames.SERVICE_REQUEST_STATUS] || 'NA'}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
                isReadonly
              />
            </div>
            <div className="Field">
              <Input
                name={fieldNames.JOB_NUMBER}
                labelText={intl.formatMessage({ id: 'label.jobNumber' })}
                placeholder={intl.formatMessage({ id: 'label.jobNumber' })}
                value={values[fieldNames.JOB_NUMBER] || 'NA'}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
                isReadonly
              />
            </div>
            <div className="Field">
              <Input
                name={fieldNames.JOB_STATUS}
                labelText={intl.formatMessage({ id: 'label.jobStatus' })}
                placeholder={intl.formatMessage({ id: 'label.jobStatus' })}
                value={values[fieldNames.JOB_STATUS] || 'NA'}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
                isReadonly
              />
            </div>
            <div className="Field">
              <Input
                name={fieldNames.VEHICLE_REGISTRATION_NUMBER}
                labelText={intl.formatMessage({ id: 'label.vehicleRegistrationNumber' })}
                placeholder={intl.formatMessage({ id: 'label.vehicleRegistrationNumber' })}
                value={values[fieldNames.VEHICLE_REGISTRATION_NUMBER] || 'NA'}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
                isReadonly
              />
            </div>
            <div className="Field">
              <Input
                name={fieldNames.JOB_CLOSURE_RESOLUTION}
                labelText={intl.formatMessage({ id: 'label.jobClosureStatus' })}
                value={values[fieldNames.JOB_CLOSURE_RESOLUTION] || 'NA'}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
                isReadonly
              />
            </div>
            <div className="Field">
              <Input
                name={fieldNames.JOB_CLOSURE_RESOLUTION_REASON}
                labelText={intl.formatMessage({ id: 'label.jobClosureReason' })}
                value={values[fieldNames.JOB_CLOSURE_RESOLUTION_REASON] || 'NA'}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
                isReadonly
              />
            </div>
            <div className="Field">
              <Input
                name={fieldNames.JOB_CLOSURE_RESOLUTION_REMARK}
                labelText={intl.formatMessage({ id: 'label.jobClosureRemark' })}
                value={values[fieldNames.JOB_CLOSURE_RESOLUTION_REMARK] || 'NA'}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
                isReadonly
              />
            </div>
            {!restProps.isPrivate && (
              <div className="Field">
                <Input
                  name={fieldNames.PARKING_LOCATION}
                  labelText={intl.formatMessage({ id: 'label.parkingLocation' })}
                  placeholder={intl.formatMessage({ id: 'label.parkingLocation' })}
                  value={values[fieldNames.PARKING_LOCATION] || 'NA'}
                  onBlur={onBlur}
                  onKeyUp={onKeyUp}
                  onChange={onChange}
                  isReadonly
                />
              </div>
            )}
            {restProps.isPrivate && (
            <div className="Field">
              <Input
                name={fieldNames.VENDOR_LOCATION}
                labelText={intl.formatMessage({ id: 'label.vendorLocation' })}
                placeholder={intl.formatMessage({ id: 'label.vendorLocation' })}
                value={values[fieldNames.VENDOR_LOCATION] || 'NA'}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
                isReadonly
              />
            </div>
            )}
          </div>
          {!restProps.isPrivate && (
            <>
              <div className="Field">
                <SelectDrop
                  id="milestoneType"
                  dropListValues={pickListData.MilestoneReportedType}
                  selectedItem={values[fieldNames.MILESTONE_TYPE]}
                  onChangeSelect={onSelect(fieldNames.MILESTONE_TYPE)}
                  labelText={intl.formatMessage({ id: 'label.reportedBy' })}
                  disabled={isProcessing}
                />
              </div>
              <div className="Tracking-Status">
                <TrackIcons details={data && data.jobStatusResources} />
              </div>
            </>
          )}
        </ContentWrap>
      </div>
    </Modal>
  );
}
CallStatusModal.defaultProps = {
  isVisible: false,
  onSubmit: () => {},
};
CallStatusModal.propTypes = {
  intl: PropTypes.object.isRequired,
  isVisible: PropTypes.bool,
  details: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  pickListData: PropTypes.object.isRequired,
};
export default injectIntl(withPickListProvider(CallStatusModal, { version: 'v2' }));