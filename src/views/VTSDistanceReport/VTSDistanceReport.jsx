import React from 'react';
import DistanceReportWrap from './DistanceReportWrap';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withDistanceReportProvider } from '../../providers/withDistanceReportsProvider';
import { withDistanceReportStatsProvider } from '../../providers/withDistanceReportStatsPrivder';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';

function VTSDistanceReport() {
  const notifications = React.useContext(NotificationContext);
  return (
    <>

      <div className="View-Bg-Default Box--Shadow Width-Full ZiqitzaVTS">
        <Notification
          components={{ Icon }}
          notifications={notifications.notifications}
          removeNotification={notifications.removeNotification}
        />
        <DistanceReportWrap />
      </div>
    </>
  );
}

export default withUserConfigProvider(
  withIntlProvider(
    withNotificationProvider(
      withDistanceReportProvider(
        withDistanceReportStatsProvider(
          VTSDistanceReport
        )
      )
    )
  )
);
