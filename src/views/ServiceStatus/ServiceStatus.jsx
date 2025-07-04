import React from 'react';
import ServiceStatusList from './List';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withServiceStatusProvider } from '../../providers/withServiceStatusProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';

function ServiceStatus() {
  const notifications = React.useContext(NotificationContext);
  return (
    <div className="View-Bg-Default Box--Shadow Width-Full ServiceStatus ZiqitzaVTS">
      <Notification
        components={{ Icon }}
        notifications={notifications.notifications}
        removeNotification={notifications.removeNotification}
      />
      <ServiceStatusList />
    </div>
  );
}

export default withUserConfigProvider(
  withIntlProvider(
    withNotificationProvider(
      withServiceStatusProvider(
        ServiceStatus,
      ),
    ),
  ),
);
