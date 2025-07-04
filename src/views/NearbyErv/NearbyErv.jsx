import React from 'react';
import ProtocolsList from './NearbyErvWrap';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withNearbyErvProvider } from '../../providers/withNearbyErvProvider';
import { withNearbyEvrsListProvider } from '../../providers/withNearbyErvListProvider';
import { withParkingBaysProvider } from '../../providers/withParkingBaysProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';

function NearbyErv() {
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
      withParkingBaysProvider(
        withNearbyEvrsListProvider(
          withNearbyErvProvider(
            NearbyErv
          )
        )
      )
    )
  )
);
