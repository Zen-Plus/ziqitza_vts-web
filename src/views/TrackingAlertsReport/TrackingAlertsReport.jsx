import React from 'react';
import TrackingAlertsReportWrap from './TrackingAlertsReportWrap';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withTrackingAlertsReportProvider } from '../../providers/withTrackingAlertsReportProvider';
import { withTrackingAlertReportTimeStatsProvider } from '../../providers/withTrackingAlertReportTimeStats';
import { withTrackingAlertReportAlertStatsProvider } from '../../providers/withTrackingAlertReportAlertStats';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';

function TrackingAlertsReport() {
  const notifications = React.useContext(NotificationContext);
  return (
    <>
      <div className="View-Bg-Default Box--Shadow Width-Full ZiqitzaVTS">
        <Notification
          components={{ Icon }}
          notifications={notifications.notifications}
          removeNotification={notifications.removeNotification}
        />
        <TrackingAlertsReportWrap />
      </div>
    </>
  );
}

export default withUserConfigProvider(
  withIntlProvider(
    withNotificationProvider(
      withTrackingAlertsReportProvider(
        withTrackingAlertReportTimeStatsProvider(
          withTrackingAlertReportAlertStatsProvider(
            TrackingAlertsReport
          )
        )
      )
    )
  )
);
