import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Button } from 'antd';
import Notification from '../../components/Notification';
import Icon from '../../components/Icon';
import { prepareSuccessMessage, prepareErrorMessage } from '../../common/helpers/notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';

const successMessage = prepareSuccessMessage({ code: 'COPIED_TO_CLIPBOARD' });
const errorMessage = prepareErrorMessage({ code: 'ZQTZA0001' });

function App(props) {
  const notificationContext = useContext(NotificationContext);
  return (
    <div className='ZiqitzaVTS'>
      <div className="App">
        <Notification
          components={{ Icon }}
          notifications={notificationContext.notifications}
          removeNotification={notificationContext.removeNotification}
        />
        <h1>
          <FormattedMessage
            id='label.welcome'
            defaultMessage='Welcome'
          />
          {' '}
          {props.intl.formatMessage({ id: 'label.to' })}
          {' '}
      Ziqitza(VTS)
      </h1>
        <Button
          type="primary"
          onClick={() => notificationContext.pushNotification(successMessage)}
        >
          Click me to get success message
        </Button>
        <Button
          type="primary"
          onClick={() => notificationContext.pushNotification(errorMessage)}
        >
          Click me to get error message
        </Button>
      </div>
    </div>
  );
}

App.propTypes = {
  intl: PropTypes.object.isRequired,
  userConfig: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

export default withIntlProvider(
  injectIntl(
    withUserConfigProvider(
      withNotificationProvider(App)
    )
  )
);
