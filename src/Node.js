// src/Node.js
import React, { useState } from 'react';
import Subnode from './Subnode';

const Node = ({
  node,
  selectedNode,
  onNodeClick,
  onDelete,
  onEdit,
  onAddSubnode,
  onDeleteSubnode,
  //onAddSupersubnode,
  //onMoveNode,
}) => {
  const [editing, setEditing] = useState(false);
  const [nodeDetails, setNodeDetails] = useState(node.details);
  //const nodeRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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

  /*const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', node.name);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedNodeName = e.dataTransfer.getData('text/plain');
    onMoveNode(draggedNodeName, node.name);
  }; */

  const handleMouseDown = (e) => {
    setDragging(true);
    // Calculate the offset between the mouse and the current position of the node
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;
    setOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      // Update the position of the node based on mouse movement
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="node"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
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
