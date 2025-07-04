import React,{ useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ClusterContext } from '../../../../providers/withClusterProvider';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';

function getClusterId(district = {}) {
  return (district
  && district.info
  && district.info.data
  && district.info.data.id) || '';
}
function withClusterProvider(Component) {
  function ComponentWithClusterProvider(props) {
    const clusterInfo = useContext(ClusterContext);
    const userConfig = useContext(UserConfigContext);
    const { id } = props;

    useEffect(() => {
      const clusterId = getClusterId(clusterInfo.cluster);
      if (id !== `${clusterId}`) {
        clusterInfo.getCluster({ id }, userConfig);
      }
    }, []);
    return (
      <Component
        {...props}
        id={id}
        cluster={clusterInfo.cluster}
        updateCluster={clusterInfo.updateCluster}
        userConfig={userConfig}
      />
    );
  }
  ComponentWithClusterProvider.propTypes = {
    id: PropTypes.number.isRequired,
  }

  return (ComponentWithClusterProvider);
}

export default withClusterProvider;
