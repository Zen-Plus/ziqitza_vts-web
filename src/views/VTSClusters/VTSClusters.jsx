import React from 'react';
import ClusterWrap from './ClustersWrap';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withClustersProvider } from '../../providers/withClustersProvider';
import { withClusterProvider } from '../../providers/withClusterProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';

function VTSCluster() {
  const notifications = React.useContext(NotificationContext);
  return (
    <div className="View-Bg-Default Box--Shadow Width-Full ZiqitzaVTS">
      <Notification
        components={{ Icon }}
        notifications={notifications.notifications}
        removeNotification={notifications.removeNotification}
      />
      <ClusterWrap />
    </div>
  );
}

export default withUserConfigProvider(
  withIntlProvider(
    withNotificationProvider(
      withClustersProvider(
        withClusterProvider(
          VTSCluster
        )
      )
    )
  )
);
