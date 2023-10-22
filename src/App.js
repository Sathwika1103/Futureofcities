// src/App.js
import React, { useState } from 'react';
import './App.css';
import Node from './Node';

function App() {
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeCount, setNodeCount] = useState(0);
  const [draggedNode, setDraggedNode] = useState(null);

  const addNode = () => {
    const newNodeName = `NODE${nodeCount + 1}`;
    setNodeCount(nodeCount + 1);
    setNodes([...nodes, { name: newNodeName, details: '', subnodes: [] }]);
  };

  const deleteNode = (nodeName) => {
    const updatedNodes = nodes.filter((node) => node.name !== nodeName);
    setNodes(updatedNodes);
  };

  const addSubnode = (nodeName) => {
    const updatedNodes = nodes.map((node) => {
      if (node.name === nodeName) {
        const newSubnodeName = `SUBNODE${node.subnodes.length + 1}`;
        return { ...node, subnodes: [...node.subnodes, newSubnodeName] };
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  const deleteSubnode = (nodeName, subnodeName) => {
    const updatedNodes = nodes.map((node) => {
      if (node.name === nodeName) {
        const updatedSubnodes = node.subnodes.filter((name) => name !== subnodeName);
        return { ...node, subnodes: updatedSubnodes };
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  const onMoveNode = (draggedNodeName, targetNodeName) => {
    const updatedNodes = [...nodes];
    const draggedNodeIndex = nodes.findIndex((node) => node.name === draggedNodeName);
    const targetNodeIndex = nodes.findIndex((node) => node.name === targetNodeName);

    if (draggedNodeIndex !== -1 && targetNodeIndex !== -1) {
      updatedNodes.splice(draggedNodeIndex, 1);
      updatedNodes.splice(targetNodeIndex, 0, nodes[draggedNodeIndex]);
      setNodes(updatedNodes);
      setDraggedNode(null);
    }
  };

  const editNode = (nodeName, nodeDetails) => {
    const updatedNodes = nodes.map((node) =>
      node.name === nodeName ? { ...node, details: nodeDetails } : node
    );
    setNodes(updatedNodes);
    setSelectedNode(null);
  };

  const handleNodeClick = (nodeName) => {
    setSelectedNode(nodeName);
  };

  return (
    <div className="App">
      <div className="buttons">
        <button onClick={addNode}>Add New Node</button>
      </div>
      <div className="nodes">
        {nodes.map((node) => (
          <Node
            key={node.name}
            node={node}
            selectedNode={selectedNode}
            onNodeClick={handleNodeClick}
            onDelete={deleteNode}
            onEdit={editNode}
            onAddSubnode={addSubnode}
            onDeleteSubnode={deleteSubnode}
            onMoveNode={onMoveNode}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
