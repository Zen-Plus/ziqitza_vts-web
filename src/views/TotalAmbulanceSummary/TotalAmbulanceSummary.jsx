import React, { useContext } from 'react';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import {
  NotificationContext,
  withNotificationProvider,
} from '../../providers/withNotificationProvider';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import TotalAmbulanceSummaryWrap from './TotalAmbulanceSummaryWrap';

function TotalAmbulanceSummary(props) {
  const notifications = useContext(NotificationContext);
  return (
    <div className="Width-Full ZiqitzaVTS">
      <Notification
        components={{ Icon }}
        notifications={notifications.notifications}
        removeNotification={notifications.removeNotification}
      />
      <TotalAmbulanceSummaryWrap
        {...props}
      />
    </div>
  );
}

export default withUserConfigProvider(withIntlProvider(withNotificationProvider(TotalAmbulanceSummary)));
