// src/Subnode.js
import React from 'react';

const Subnode = ({ name, onDelete }) => {
  return (
    <div className="subnode">
      <div className="subnode-header">
        <span>{name}</span>
        <div className="subnode-buttons">
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Subnode;
