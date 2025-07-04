import React from 'react';
import TrackingAlertsWrap from './TrackingAlertsWrap';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withTrackingAlertsProvider } from '../../providers/withTrakingAlertsProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';

function TrackingAlerts() {
  const notifications = React.useContext(NotificationContext);
  return (
    <div className="View-Bg-Default Box--Shadow Width-Full ZiqitzaVTS">
      <Notification
        components={{ Icon }}
        notifications={notifications.notifications}
        removeNotification={notifications.removeNotification}
      />
      <TrackingAlertsWrap />
    </div>
  );
}

export default withUserConfigProvider(
  withIntlProvider(
    withNotificationProvider(
      withTrackingAlertsProvider(
        TrackingAlerts,
      ),
    ),
  ),
);
