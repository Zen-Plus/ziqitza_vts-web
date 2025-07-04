import React from 'react';
import TotalFeedbackTakenWrap from './TotalFeedbackTakenWrap';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';

function TotalFeedbackTaken(props) {
  const notifications = React.useContext(NotificationContext);
  return (
    <div className="Box--Shadow Width-Full ZiqitzaVTS">
      <Notification
        components={{ Icon }}
        notifications={notifications.notifications}
        removeNotification={notifications.removeNotification}
      />
      <TotalFeedbackTakenWrap 
        {...props}
      />
    </div>
  );
}

export default withIntlProvider(withNotificationProvider(TotalFeedbackTaken));
