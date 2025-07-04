import React from 'react';
import TripsReportList from './List';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withTripsReportProvider } from '../../providers/withTripsReportsProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';

function VTSTripsReport(props) {
  const notifications = React.useContext(NotificationContext);
  return (
    <>

      <div className="View-Bg-Default Box--Shadow Width-Full ZiqitzaVTS">
        <Notification
          components={{ Icon }}
          notifications={notifications.notifications}
          removeNotification={notifications.removeNotification}
        />
        <TripsReportList { ...props }/>
      </div>
    </>
  );
}

export default withUserConfigProvider(
  withIntlProvider(
    withNotificationProvider(
      withTripsReportProvider(
        VTSTripsReport
      )
    )
  )
);
