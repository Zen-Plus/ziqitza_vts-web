function formatBlockedUserDuration(ms) {
  const dateObj = new Date(ms);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}


const errorDefault = {
  type: 'error',
  message: 'notification.message.errorOccured',
  description: 'notification.message.somethingWentWrong',
};

const successDefault = {
  type: 'success',
  message: 'notification.message.success',
};

const messagesMap = {
  COPIED_TO_CLIPBOARD: {
    ...successDefault,
    description: 'notification.message.copiedToClipboard',
  },
  ZQTZA0001: {
    ...errorDefault,
    description: 'notification.message.invalidCredentials',
  },
  ZQTZA0002: {
    ...errorDefault,
    description: 'notification.message.invalidInput',
  },
  ZQTZA0003: {
    ...errorDefault,
    description: 'notification.message.inputRequired',
  },
  ZQTZA0004: {
    ...errorDefault,
    description: 'notification.message.notFound',
  },
  ZQTZA0004_JobNotFound: {
    ...errorDefault,
    description: 'notification.message.pleaseEnterValidJobId',
  },
  ZQTZA0004_JobMedical: {
    ...errorDefault,
    description: 'notification.message.pleaseSearchAJobWithEmergencyServiceMedical',
  },
  ZQTZA0004_JobCancelled: {
    ...errorDefault,
    description: 'notification.message.thisJobIsCancelled',
  },
  ZQTZA0004_JobNotClose: {
    ...errorDefault,
    description: 'notification.message.thisJobIsNotClosed',
  },
  ZQTZA0004_JobTimeExceed: {
    ...errorDefault,
    description: 'notification.message.cannotSearchTheJobIdTicketIdCreatedBeyondLast3Months',
  },
  ZQTZA0004_DistanceInProgress: {
    ...errorDefault,
    description: 'notification.message.tripDistanceCalculationIsWorkInProgress',
  },
  ZQTZA0004_SupportTicketNotFound: {
    ...errorDefault,
    description: 'notification.message.pleaseEnterValidTicketId',
  },
  ZQTZA0004_DistanceInProgress: {
    ...errorDefault,
    description: 'notification.message.tripDistanceCalculationIsWorkInProgress',
  },
  ZQTZA0004_SupportTicketNotClosed: {
    ...errorDefault,
    description: 'notification.message.thisTicketIsNotClosedYet',
  },
  ZQTZA0004_SupportTicketTimeExceed: {
    ...errorDefault,
    description: 'notification.message.cannotSearchTheJobIdTicketIDCreatedBeyondLast3Months',
  },
  ZQTZA0004_VehicleRegistrationNumber: {
    ...errorDefault,
    description: 'notification.message.pleaseEnterValidVehicleRegistrationNo',
  },
  ZQTZA0004_ServiceNotAvailable: {
    ...errorDefault,
    description: 'notification.message.serviceNotAvailable',
  },
  ZQTZA0005: {
    ...errorDefault,
    description: 'notification.message.invalidToken',
  },
  ZQTZA0006: (info) => {
    let description = 'Account is blocked';
    if (info && info.data && info.data.for) {
      description = `${description} till ${formatBlockedUserDuration(info.data.for)}`;
    }
    description = `${description}, Please contact support`;
    return ({
      ...errorDefault,
      description,
    });
  },
  ZQTZA0009: {
    ...errorDefault,
    description: 'notification.message.alreadyExists',
  },
  ZQTZA0009_ClusterName: {
    ...errorDefault,
    description: 'notification.message.clusterNameAlreadyExists',
  },
  ZQTZA0009_ClusterReceiverPort: {
    ...errorDefault,
    description: 'notification.message.clusterReceiverPortAlreadyExists',
  },
  INVALID_LAT_LONG: {
    ...errorDefault,
    description: 'notification.message.invalidLatitudeLongitude',
  },
  CLUSTER_ADDED: {
    ...successDefault,
    description: 'notification.message.clusterAddedSuccessfully',
  },
  CLUSTER_UPDATED: {
    ...successDefault,
    description: 'notification.message.clusterUpdatedSuccessfully',
  },
  CLUSTER_DELETED: {
    ...successDefault,
    description: 'notification.message.clusterDeletedSuccessfully',
  },
  ALERT_ALREADY_PICKED: {
    ...errorDefault,
    description: 'notification.message.alreadyPicked',
  },
  REQIURED_EXTENSION_TIME: {
    ...errorDefault,
    description: 'notification.message.requiredExtensionTime',
  },
  SERVICE_NOT_AVAILABLE: {
    ...errorDefault,
    description: 'notification.message.serviceNotAvailable',
  }
};

export const getNotificationMessage = (key, info = {}) => {
  const value = (messagesMap[key] || errorDefault);
  if (value instanceof Function) {
    return value(info);
  }
  return value;
};

export default {
  getNotificationMessage,
};
