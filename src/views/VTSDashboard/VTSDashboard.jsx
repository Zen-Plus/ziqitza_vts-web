import React from 'react';
import DashboardWrap from './DashboardWrap';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withVehiclesProvider } from '../../providers/withVehiclesProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';

function VTSDashboard() {
  const notifications = React.useContext(NotificationContext);
  return (
    <div className="View-Bg-Default Box--Shadow Width-Full VTSDashboard ZiqitzaVTS">
      <Notification
        components={{ Icon }}
        notifications={notifications.notifications}
        removeNotification={notifications.removeNotification}
      />
      <DashboardWrap />
    </div>
  );
}

export default withUserConfigProvider(
  withIntlProvider(
    withNotificationProvider(
      withVehiclesProvider(
        VTSDashboard
      )
    )
  )
);
