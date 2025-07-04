import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import getTranslations from '../../../locales'

function withIntlProvider(Component) {
  function ComponentWithIntlProvider(props) {
    const locale = props.userConfig ? props.userConfig.config.locale.toLowerCase() : 'en';
    const translations = getTranslations(locale);
    return (
      <IntlProvider locale={props.locale} messages={translations} textComponent={React.Fragment}>
        <Component
          {...props}
        />
      </IntlProvider>
    );
  }

  ComponentWithIntlProvider.defaultProps = {
    locale: 'en',
  };

  ComponentWithIntlProvider.propTypes = {
    locale: PropTypes.string,
  };

  return ComponentWithIntlProvider;
}

export default withIntlProvider;
