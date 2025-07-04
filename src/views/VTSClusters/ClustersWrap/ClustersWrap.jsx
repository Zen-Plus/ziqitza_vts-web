import React from 'react';
import ClustersList from './List';
import ClusterAdd from './Cluster/Add';
import ClusterEdit from './Cluster/Edit';
import useCustomState from '../../../common/hooks/useCustomState'

function ClusterWrap(){
  const [viewState, setViewState] = useCustomState({ type: '', id: null });

  const handleViewStateKey = (key) => {
    const { type, id } = key;
    setViewState({ type, id });
  }

  if (viewState.type === 'edit') {
    return <ClusterEdit id={viewState.id} setClusterView={handleViewStateKey}/>
  }

  if (viewState.type === 'add') {
    return <ClusterAdd setClusterView={handleViewStateKey} />;
  }

  return <ClustersList setClusterView={handleViewStateKey} />;
}


export default ClusterWrap;
