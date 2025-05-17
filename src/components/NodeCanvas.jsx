import React from 'react';
import Node from './Node';

const NodeCanvas = ({ nodes }) => {
  return (
    <div className="relative w-full h-full border border-dashed border-gray-400 rounded bg-white">
      {nodes.map((node) => (
        <Node key={node.id} node={node} />
      ))}
    </div>
  );
};

export default NodeCanvas;
