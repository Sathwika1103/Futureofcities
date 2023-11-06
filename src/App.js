// src/App.js
import React, { useState } from 'react';
import './App.css';
import Node from './Node';
import MainPage from './MainPage';

function App() {
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeCount, setNodeCount] = useState(0);
  const [dragMode, setDragMode] = useState(false); // Track drag mode

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

  const toggleDragMode = () => {
    setDragMode(!dragMode); // Toggle drag mode
  };

  return (
    <div className="App">
      <MainPage />
      <div className="buttons">
        <button onClick={addNode}>Add New Node</button>
        <button onClick={toggleDragMode}>
          {dragMode ? 'Disable Move Node' : 'Move Node'}
        </button>
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
            
          />
        ))}
      </div>
    </div>
  );
}

export default App;
