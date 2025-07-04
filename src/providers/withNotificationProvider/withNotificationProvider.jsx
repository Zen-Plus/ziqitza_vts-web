import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';

// inital context state
const initialState = {
  messages: {},
  isReset: false,
};

// Context
const NotificationContext = React.createContext({ ...initialState });

// Hook
const useNotification = (initialNotifications = { messages: {}, isReset: false }) => {
  const [notifications, setNotifications] = useCustomState(initialNotifications);

  const pushNotification = (apiState) => {
    const message = (apiState && (apiState.apierror || apiState.apisuccess)) || {};
    const messageKey = message.code || 'default';
    const spanIdKey = message.spanId;
    const updatedState = {
      messages: { ...notifications.messages, [messageKey]: { message, spanIdKey } }, isReset: false,
    };
    setNotifications(updatedState);
  }

  const removeNotification = (notificationKey) => {
    const messages = { ...notifications.messages };
    delete messages[notificationKey];
    setNotifications({ messages: { ...messages }, isReset: false });
  }

  const resetNotifications = () => {
    setNotifications({ messages: {}, isReset: true });
  }

  return {
    notifications,
    setNotifications,
    pushNotification,
    removeNotification,
    resetNotifications,
  };
};

// Provider
function withNotificationProvider(Component) {
  function NotificationProviderComponent(props) {
    const notifications = useNotification();

    return (
      <NotificationContext.Provider value={notifications}>
        <Component
          {...props}
        />
      </NotificationContext.Provider>
    );
  }

  return NotificationProviderComponent;
};

export { NotificationContext, withNotificationProvider };