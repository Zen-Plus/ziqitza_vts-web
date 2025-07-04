import React, { useContext } from 'react';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import {
  NotificationContext,
  withNotificationProvider,
} from '../../providers/withNotificationProvider';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import TotalCasesServedSummaryWrap from './TotalCasesServedSummaryWrap';

function TotalCasesServedSummary(props) {
  const notifications = useContext(NotificationContext);
  return (
    <div className="Width-Full ZiqitzaVTS">
      <Notification
        components={{ Icon }}
        notifications={notifications.notifications}
        removeNotification={notifications.removeNotification}
      />
      <TotalCasesServedSummaryWrap
        {...props}
      />
    </div>
  );
}

export default withUserConfigProvider(withIntlProvider(withNotificationProvider(TotalCasesServedSummary)));
