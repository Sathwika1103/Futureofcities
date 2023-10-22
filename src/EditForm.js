// src/EditForm.js
import React, { useState } from 'react';

const EditForm = ({ node, onSave }) => {
  const [nodeName, setNodeName] = useState(node.name);
  const [nodeDetails, setNodeDetails] = useState(node.details);

  const handleSaveClick = () => {
    onSave(nodeName, nodeDetails);
  };

  return (
    <div className="edit-form">
      <h2>Edit Node</h2>
      <div>
        <label htmlFor="nodeName">Node Name:</label>
        <input
          type="text"
          id="nodeName"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="nodeDetails">Node Details:</label>
        <textarea
          id="nodeDetails"
          rows="4"
          value={nodeDetails}
          onChange={(e) => setNodeDetails(e.target.value)}
          placeholder="Node details..."
        />
      </div>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default EditForm;