import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { notification as notificationUtil } from 'antd';
import { getNotificationMessage } from '../../common/constants';

const iconNameMap = {
  error: 'error-info',
  success: 'success-info',
};

function handleClose() {
  // remove from store to keep messages consistent
  this.closeNotification(this.messageKey);
}

function getDescription(restMessage, messageInfo, intl) {
  const { spanIdKey } = messageInfo;
  const { description, placeholder = {} } = restMessage;
  if (spanIdKey) {
    return (
      <div>
        <span>{intl.formatMessage({ id: description }, { ...placeholder })}</span>
        <br />
        <span className="Vts__Components__Notification__SpanId">{spanIdKey}</span>
      </div>
    );
  }
  return intl.formatMessage({ id: description });
}

function Notification({
  duration, components, notifications, removeNotification, intl,
}) {
  useEffect(() => {
    if (notifications.isReset) {
      notificationUtil.destroy();
    }
  }, [notifications.isReset]);

  useEffect(() => {
    Object.keys(notifications.messages).forEach((messageKey) => {
      const messageInfo = notifications.messages[messageKey];
      const { type, message, ...restMessage } = getNotificationMessage(messageKey, messageInfo);
      const description = getDescription(restMessage, messageInfo, intl);
      const _restMessage = { ...restMessage, description };
      const icon = (<components.Icon name={iconNameMap[type]} />);
      const closeIcon = (<components.Icon name="cross" />);
      const className = `Vts-Notification ${type}`;
      notificationUtil[type]({
        ..._restMessage,
        message: intl.formatMessage({ id: message }),
        duration,
        icon,
        closeIcon,
        className,
        key: messageKey,
        onClose: handleClose.bind({ messageKey, closeNotification: removeNotification }),
      });
    });
  }, [notifications.messages, duration, removeNotification]);
  return null;
}

Notification.defaultProps = {
  duration: 3, // open until close
};

Notification.propTypes = {
  duration: PropTypes.number,
  components: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired,
  removeNotification: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Notification);
