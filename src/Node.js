// src/Node.js
import React, { useState, useRef } from 'react';
import Subnode from './Subnode';

const Node = ({
  node,
  selectedNode,
  onNodeClick,
  onDelete,
  onEdit,
  onAddSubnode,
  onDeleteSubnode,
  onMoveNode,
}) => {
  const [editing, setEditing] = useState(false);
  const [nodeDetails, setNodeDetails] = useState(node.details);
  const nodeRef = useRef(null);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(node.name, nodeDetails);
    setEditing(false);
  };

  const handleNodeClick = () => {
    onNodeClick(node.name);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', node.name);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedNodeName = e.dataTransfer.getData('text/plain');
    onMoveNode(draggedNodeName, node.name);
  };

  return (
    <div
      ref={nodeRef}
      className={`node ${node.name === selectedNode ? 'selected' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="node-header" onClick={handleNodeClick}>
        <span>{node.name}</span>
        <div className="node-buttons">
          <button onClick={handleEditClick}>Edit Node</button>
          <button onClick={() => onDelete(node.name)}>Delete</button>
          <button onClick={() => onAddSubnode(node.name)}>Add Subnode</button>
        </div>
      </div>
      {editing ? (
        <div className="edit-form">
          <textarea
            rows="4"
            value={nodeDetails}
            onChange={(e) => setNodeDetails(e.target.value)}
            placeholder="Node details..."
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <p>{node.details}</p>
      )}
      {node.subnodes.map((subnodeName) => (
        <Subnode
          key={subnodeName}
          name={subnodeName}
          onDelete={() => onDeleteSubnode(node.name, subnodeName)}
        />
      ))}
    </div>
  );
};

export default Node;
