import React from 'react';
import JobWiseEquipmentWrap from './JobWiseEquipmentWrap';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';

function JobWiseEquipment() {
  const notifications = React.useContext(NotificationContext);
  return (
    <div className="Box--Shadow Width-Full ZiqitzaVTS">
      <Notification
        components={{ Icon }}
        notifications={notifications.notifications}
        removeNotification={notifications.removeNotification}
      />
      <JobWiseEquipmentWrap />
    </div>
  );
}

export default withUserConfigProvider(
  withIntlProvider(
    withNotificationProvider(
      JobWiseEquipment,
    ),
  ),
);
