function getResource(resources = [], resourceKeys = []) {
  const keyToCheck = resourceKeys.shift();
  const resource = resources.find((item) => item.code === keyToCheck) || {};
  if (!resourceKeys.length) {
    return resource;
  }
  return getResource(resource.childResources, resourceKeys);
}

export function checkPermission({
  resources = [], resourceKey = '', permissions = [], forSome = false,
}) {
  const splittedResourceKey = resourceKey.split('.');
  const resource = getResource(resources, splittedResourceKey) || {};
  const resourcePermissions = resource.permissions || [];

  if (forSome) {
    return !!permissions
      && permissions.some((permission) => resourcePermissions.includes(permission));
  }
  return !!permissions
    && !!permissions.length
    && permissions.every((permission) => resourcePermissions.includes(permission));
}

export default {
  checkPermission,
};
