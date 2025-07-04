import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';

function withProvider(providerInfo = {}, Component) {
  const { getResourcesActionKey, stateKey, context, contextProvider, loadMoreActionKey } = providerInfo;

  function ComponentWithProvider({
    isReadonly,
    formatValues, 
    isPicklist,
    ...restProps
  }) {
    const userConfig = useContext(UserConfigContext);
    const resources = useContext(context);

    const [text, setText] = useState('');
    const pageSize = 50;

    const { isFetching, info } = resources[stateKey];
    const { data = {} } = info || {};
    let dropListValues = data.content || [];
    const totalItems = data.totalElements;
    function fetchResources(query = {}) {
      const _query = { ...query };
      _query.isPicklist = isPicklist;
      resources[getResourcesActionKey](_query, userConfig);
    }
    useEffect(() => {
      if (!isReadonly && !restProps.disabled) {
        fetchResources({ ...restProps.query, pageSize, searchText: text });
      }
    }, []);

    useEffect(() => {
      if (restProps.query && !restProps.disabled) {
        setText('');
        fetchResources({ ...restProps.query, pageSize, pageNo: 0 });
      }
    }, [restProps.query, restProps.disabled]);

    function handleTextChange(event) {
      const { value } = event.target;
      setText(value);
      let _query = { searchText: value, pageSize, pageNo: 0 };

      if (restProps.query) {
        _query = { ..._query, ...restProps.query };
      }
      fetchResources(_query);
    }

    function handleScrollBottom() {
      if (!isFetching && (dropListValues.length < totalItems)) {
        const pageNo = dropListValues.length / pageSize;
        let _query = { searchText: text, pageSize, pageNo };
        if (restProps.query) {
          _query = { ..._query, ...restProps.query };
        }
        resources[loadMoreActionKey](_query, userConfig);
      }
    }
    if (formatValues) {
      dropListValues = formatValues(dropListValues);
    }
    return (
      <Component
        isSearchEnable
        isReadonly={isReadonly}
        onTextChange={handleTextChange}
        isFetching={isFetching}
        dropListValues={dropListValues}
        setText={setText}
        {...restProps}
        text={text}
        onScrollBottom={handleScrollBottom}
      />
    );
  }
  ComponentWithProvider.defaultProps = {
    query: false,
    isReadonly: false,
    formatValues: false,
    isPicklist: true,
  };
  ComponentWithProvider.propTypes = {
    isReadonly: PropTypes.bool,
    query: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    formatValues: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    isPicklist: PropTypes.bool,
  };

  return contextProvider(ComponentWithProvider);
}

export default withProvider;
