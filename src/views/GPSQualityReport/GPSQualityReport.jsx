import React from 'react';
import GPSQualityReportWrap from './GPSQualityReportWrap';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withGPSQualityReportProvider } from '../../providers/withGPSQualityReportsProvider';
import { withGPSQualityReportStatsProvider } from '../../providers/withGPSQualityReportStatsProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';

function GPSQualityReport() {
  const notifications = React.useContext(NotificationContext);
  return (
    <>

      <div className="View-Bg-Default Box--Shadow Width-Full ZiqitzaVTS">
        <Notification
          components={{ Icon }}
          notifications={notifications.notifications}
          removeNotification={notifications.removeNotification}
        />
        <GPSQualityReportWrap />
      </div>
    </>
  );
}

export default withUserConfigProvider(
  withIntlProvider(
    withNotificationProvider(
      withGPSQualityReportProvider(
        withGPSQualityReportStatsProvider(
          GPSQualityReport
        )
      )
    )
  )
);
