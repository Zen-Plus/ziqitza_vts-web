import React from "react";
import TripReplayWrap from "./TripReplayWrap";
import Icon from "../../components/Icon";
import Notification from "../../components/Notification";
import withIntlProvider from "../../common/hocs/withIntlProvider";
import { withTripsReplayPacketProvider } from "../../providers/withTripReplayPacketProvider";
import { withUserConfigProvider } from "../../providers/withUserConfigProvider";
import {
  NotificationContext,
  withNotificationProvider,
} from "../../providers/withNotificationProvider";

function TripReplay() {
  const notifications = React.useContext(NotificationContext);
  return (
    <>
      <div className="View-Bg-Default Box--Shadow Width-Full ZiqitzaVTS">
        <Notification
          components={{ Icon }}
          notifications={notifications.notifications}
          removeNotification={notifications.removeNotification}
        />
        <TripReplayWrap />
      </div>
    </>
  );
}

export default withUserConfigProvider(
  withIntlProvider(
    withNotificationProvider(withTripsReplayPacketProvider(TripReplay))
  )
);
