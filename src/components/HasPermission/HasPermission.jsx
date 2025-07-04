import React from 'react';
import PropTypes from 'prop-types';
import { checkPermission } from '../../common/helpers/resource';
import { cloneDeep } from '../../common/helpers/collectionUtils';

function HasPermission({
  resourceKey,
  permissions,
  forSome,
  children,
  user,
  ...restProps
}) {
  const userData = (user.info && user.info.data) || {};
  const userResources = cloneDeep(userData.resources);
  const hasPermission = checkPermission({
    resources: userResources, resourceKey, permissions, forSome,
  });
  if (!hasPermission && restProps.disableLink) {
    return (
      <div className="HasPermission_DisableLink">
        {children}
      </div>
    );
  }
  if (!hasPermission) {
    return null;
  }
  return (
    children
  );
}

HasPermission.defaultProps = {
  resourceKey: '',
  permissions: [],
  forSome: false,
};

HasPermission.PropTypes = {
  resourceKey: PropTypes.string,
  permissions: PropTypes.array,
  forSome: PropTypes.bool,
  children: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};


export default HasPermission;
