import React from 'react';
import ProtocolsList from './List';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withProtocolsProvider } from '../../providers/withProtocolsProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';

function ProtoCols() {
  const notifications = React.useContext(NotificationContext);
  return (
    <div className="View-Bg-Default Box--Shadow Width-Full ZiqitzaVTS">
      <Notification
        components={{ Icon }}
        notifications={notifications.notifications}
        removeNotification={notifications.removeNotification}
      />
      <ProtocolsList />
    </div>
  );
}

export default withUserConfigProvider(
  withIntlProvider(
    withNotificationProvider(
      withProtocolsProvider(
        ProtoCols
      )
    )
  )
);
